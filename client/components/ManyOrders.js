import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchOrders} from "../store";
import OrderChart from './OrderChart'
import ReactTable from "react-table";


export class ManyOrders extends Component {

  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const data = this.props.orders
    const columns= [
                {
                  Header: "Order Id",
                  accessor: "id"
                },
                {
                  Header: "Status",
                  accessor: "orderStatus"
                },
                {
                  Header: "Address",
                  accessor: "address"
                },
                {
                  Header: "Created On",
                  accessor: "createdAt"
                },
                {
                  Header: "Updated On",
                  accessor: "updatedAt"
                }
              ]
     const {isAdmin} = this.props;

    return (
      <div>
      <div>
        <h3>ORDERS</h3>
        <ReactTable
          data={data}
          columns={columns}
          defaultPageSize={10}
          minRows={1}
          getTdProps={(state, rowInfo, column, instance) => {
            return {
              onClick: (e, handleOriginal) => {

                // console.log('It was in this row:', rowInfo.original.id)

                window.location.href= `/orders/${rowInfo.original.id}`;

                if (handleOriginal) {
                  handleOriginal()
                }
              }
            }
          }}
        />
      </div>
      <br />
      {isAdmin && <OrderChart />}
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    isAdmin: !!state.user.isAdmin,
    orders: state.order.orders
  }
};


const mapDispatch = (dispatch, ownProps) => {
 return {
        loadInitialData() {
            dispatch(fetchOrders())
        }
    }
};

const ManyOrdersContainer = connect(mapState, mapDispatch)(ManyOrders);

export default ManyOrdersContainer;
