
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchOrder, fetchOrders, editOrder} from "../store";
import ReactTable from "react-table";
import history from "../history";

class SingleOrder extends Component {

  componentDidMount() {
        this.props.loadInitialData()
  }

  render() {
    const { orders, order } = this.props

    const isLoggedIn = this.props.isLoggedIn;
    const isAdmin = this.props.isAdmin;

    const statusArray = ["Created, Completed, Processing, Cancelled"]

    let initialProductData =  order.products? Object.assign( [], order.products): false

    let productData =  (order.products && initialProductData)?
        initialProductData.map((prodObj)=>{
          return Object.assign({}, prodObj, {priceAtPurchase: prodObj.orderItem.priceAtPurchase}, {quantity:prodObj.orderItem.quantity} )
        })
        : false

    const orderData = [order]
    const orderColumns= [
                {
                  Header: "Order #",
                  accessor: "id"
                },
                {
                  Header: "Status",
                  accessor: "orderStatus"
                },
                {
                  Header: "Shipping Address",
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

  const productColumns= [
                {
                  Header: "Item Name",
                  accessor: "name"
                },
                {
                  Header: "Purchase Price",
                  accessor: "priceAtPurchase"
                },
                {
                  Header: "Quantity",
                  accessor: "quantity"
                }

              ]

    return (
      <div>
        <h3>Order #: {order.id}</h3>
        {
          (order && productData) &&
              <ReactTable
                  data={orderData}
                  columns={orderColumns}
                  defaultPageSize={2}
                  minRows={2}
                  className="-striped -highlight"
                  SubComponent={ row => {
                    return (
                      <div style={{ padding: "20px" }}>
                        <em>Your order details:</em>
                        <br />
                        <ReactTable
                          data={productData}
                          columns={productColumns}
                          defaultPageSize={2}
                          minRows={2}
                          showPagination={false}
                          getTdProps={(state, rowInfo, column, instance) => {
                            return {
                              onClick: (e, handleOriginal) => {
                              window.location.href= `/products/${rowInfo.original.id}`;
                                if (handleOriginal) {
                                  handleOriginal()
                                }
                              }
                            }
                          }}
                        />

                        {
                            isAdmin?
                            <div>
                            <br/>
                            <span>Change Order Status:</span>
                              <select
                                  className="form-control"
                                  name= "status-change"
                                  onChange={ this.props.handleStatusChange }
                              >
                                <option key='1' value="Created"> Created </option>
                                <option key='2' value="Processing"> Processing </option>
                                <option key='3' value="Completed"> Completed </option>
                                <option key='4' value="Cancelled"> Cancelled </option>

                              </select>
                            </div>
                            :
                             <button  name= "status-change"  value="Cancelled" onClick={ this.props.handleStatusChange }> Cancel Order (Cannot be un done!))</button>
                        }

                      </div>
                    )
                  }}
                />
        }
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    order: state.order.order,
    orders: state.order.orders,
    orderProducts: state.order.orders.products,
    isLoggedIn: !!state.user.id,
    isAdmin: !!state.user.isAdmin
  }
};

const mapDispatch = (dispatch, ownProps) => {
  var id= +ownProps.match.params.orderId
  return {
          loadInitialData() {
              dispatch(fetchOrder(id))
              dispatch(fetchOrders())
          },
          handleStatusChange(e){
            e.preventDefault()
            const newStatus = e.target.value
            dispatch( editOrder(id, {orderStatus: newStatus} ) )
            // history.push(`orders/${id}`)
            window.location.href= ``;
          }
  }
};



const SingleOrderContainer = withRouter(connect(mapState, mapDispatch)(SingleOrder));

export default SingleOrderContainer;
