import React, { Component } from "react";import { connect } from "react-redux";
import { updateProduct, fetchProduct, postProduct, fetchProducts } from "../store/index";
import historyThing from "../history"


class SharedProductForm extends Component {

    componentDidMount() {
        if (!this.props.newProduct) {
            this.props.loadProductData();
        }
    }

    render() {
        const newProduct = this.props.newProduct;
        const categories = this.props.categories;

        let product;
        if (newProduct) {
            product = {
                name: '',
                price: '',
                description: '',
                image: 'https://i.imgur.com/pBjJBKK.jpg',
                inventory: '',
                categories: []
            }
        } else {
            product = this.props.productData;
            if (product.id === undefined) {
                return null;
                //this will prevent rendering until my current product data is there
            }
        }

        return (
            <form onSubmit={this.props.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Edit This Product</label>
                    Name<input
                        defaultValue={product.name}
                        className="form-control"
                        type="text"
                        name="productName"
                        placeholder="Enter Product Name"
                    />
                    Price ($)<input
                        defaultValue={product.price}
                        className="form-control"
                        type="text"
                        name="productPrice"
                        placeholder="Enter Product Price"
                    />
                    Description<textarea
                        defaultValue={product.description}
                        className="form-control"
                        type="text"
                        name="productDescription"
                        placeholder="Enter Product Description"
                    />
                    Image URL<input
                        defaultValue={product.image}
                        className="form-control"
                        type="text"
                        name="productImage"
                        placeholder="Enter Product Photo URL"
                    />
                    Inventory<input
                        defaultValue={product.inventory}
                        className="form-control"
                        type="text"
                        name="productInventory"
                        placeholder="Enter Number of Available Products"
                    />
                    Category<div id="category-checks">{
                        // first look at each category that exists
                        this.props.categories.map(category => {
                            // check if the current product has the category we're looking at as one of its categories
                            let checked = product.categories.filter(productCategory => {
                                return category.id === productCategory.id
                                // the length is the number of this product's categories that are equal to the category we are looking at. Either 0 or 1 (doesn't match or does)
                            }).length > 0;
                            return (
                                <div key={category.id}>
                                    <input type="checkbox" id={`category-${category.id}`} defaultChecked={checked} name="category" value={category.id} />
                                    <label htmlFor={`category-${category.id}`}>{category.name} </label>
                                </div>
                            )
                        })
                    }
                    </div>
                </div>
                <div className="form-group">
                    <button>Submit</button>
                </div>
            </form>
        );
    }
}

const mapState = (state) => {
    return {
        categories: state.product.categories,
        productData: state.product.currentProduct,
        products: state.product.allProducts
    }
}

const mapDispatch = (dispatch, ownProps) => {
    return {
        loadProductData() {
            const productThunk = fetchProduct(ownProps.match.params.productId);
            dispatch(productThunk);
        },
        handleSubmit(event) {
            event.preventDefault();
            let categoriesArray = [];
            event.target.category.forEach(category => {
                if (category.checked) {
                    categoriesArray.push(+category.value)
                }
            })
            const productData = {
                name: event.target.productName.value,
                price: event.target.productPrice.value,
                description: event.target.productDescription.value,
                image: event.target.productImage.value,
                inventory: event.target.productInventory.value,
                categories: categoriesArray
            };
            if (!ownProps.newProduct) {
                productData.id = ownProps.match.params.productId;
            }
            const history = ownProps.history;
            if (ownProps.newProduct) {
                dispatch(postProduct(productData, history));
                dispatch(fetchProducts());

            } else {
                dispatch(updateProduct(productData, history));

            }
        }

    }
}


export default connect(mapState, mapDispatch)(SharedProductForm);
