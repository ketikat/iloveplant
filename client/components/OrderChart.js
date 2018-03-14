import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ReactDOM from "react-dom";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryLabel } from "victory";

import { fetchOrders, fetchOrderItems} from "../store";

export class OrderChart extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {filter: 'unit'}

  }

  componentDidMount() {
    this.props.loadInitialData();
  }

  handleChange(e) {
    let val = e.target.value;
    this.setState({filter: val})
  }

  render() {
    let orderItems = this.props.orderItems;
    let products = this.props.products;

    //object that links productId to product name
    let prodIdObj = products.reduce((prev, prod) => {
      prev[prod.id] = prod.name;
      return prev;
    },{})

    //object that links productId with unit sales
    let unitSalesObj = {}
    for (let i = 0; i < orderItems.length; i++) {
      let current = orderItems[i];
      if (unitSalesObj[current.productId]) unitSalesObj[current.productId] += current.quantity;
      else unitSalesObj[current.productId] = current.quantity;
    }

    let dollarSalesObj = {};
    for (let i = 0; i < orderItems.length; i++) {
      let current = orderItems[i];
      if (dollarSalesObj[current.productId]) dollarSalesObj[current.productId] += (current.quantity*current.priceAtPurchase);
      else dollarSalesObj[current.productId] = (current.quantity*current.priceAtPurchase);
    }


    //array that combines product name and unit unitSalesObj
    let prodUnitSalesArr = []
    let prodDollarSalesArr = []
    for (var id in prodIdObj) {
      let unitSales = unitSalesObj[id] || 0;
      let dollarSales = dollarSalesObj[id] || 0;
      prodUnitSalesArr.push({name: prodIdObj[id], unitSales})
      prodDollarSalesArr.push({name: prodIdObj[id], dollarSales})
    }

    let title = this.state.filter === 'unit' ? 'Unit Sales' : 'GMS'
    let axisSymbol = this.state.filter === 'unit' ? '' : '$'
    let yAxis = this.state.filter === 'unit' ? 'unitSales' : 'dollarSales'
    let currentData = this.state.filter === 'unit' ? prodUnitSalesArr : prodDollarSalesArr;



    return (

      <div className="chart-div">
        <select className="form-control" id="chart-filter" name="filtertime" value={this.state.filter} onChange={this.handleChange}>
          <option key="unit" value="unit">Unit Sales</option>
          <option key="dollar" value="dollar">$ Sales</option>
        </select>
        <h1>{title}</h1>
        <VictoryChart theme={VictoryTheme.material} domainPadding={20}>
        <VictoryAxis style={{tickLabels: {angle: 40}}} />
        <VictoryAxis dependentAxis tickFormat={(x) => (`${axisSymbol}${x}`)}/>
          <VictoryBar data={currentData} x="name" y={yAxis} />
        </VictoryChart>
      </div>
    );
  }
}

const mapState = state => {
  return {
    orders: state.order.orders,
    orderItems: state.orderItem.orderItems,
    products: state.product.allProducts
  };
};

const mapDispatch = (dispatch, ownProps) => {
  return {
    loadInitialData() {
      dispatch(fetchOrderItems());
      dispatch(fetchOrders());
    }
  };
};

const OrderChartContainer = connect(mapState, mapDispatch)(OrderChart);

export default OrderChartContainer;
