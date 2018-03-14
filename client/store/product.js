import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_PRODUCTS = 'GET_PRODUCTS';
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT';
const GET_CATEGORIES = 'GET_CATEGORIES';
const SET_PRODUCT_CATEGORY = 'SET_PRODUCT_CATEGORY';
const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';
const APPLY_SEARCH = 'APPLY_SEARCH';
const SET_SUGGESTIONS = 'SET_SUGGESTIONS';
const DELETE_PRODUCT = 'DELETE_PRODUCT';
const EDIT_PRODUCT = 'EDIT_PRODUCT';
const ADD_NEW_PRODUCT = 'ADD_NEW_PRODUCT';

/**
 * INITIAL STATE
 */
const initialProductsState = {
    allProducts: [],
    visibleProducts: [],
    currentProduct: {},
    categories: [],
    selectedCategory: {},
    searchQuery: '',
    searchSuggestions: []
}

/**
 * ACTION CREATORS
 */
const getProducts = products => ({ type: GET_PRODUCTS, products });
const getSingleProduct = product => ({ type: GET_SINGLE_PRODUCT, product });
const getCategories = categories => ({ type: GET_CATEGORIES, categories });
export const setProductCategory = categoryId => ({ type: SET_PRODUCT_CATEGORY, categoryId });
export const setSearchQuery = query => ({ type: SET_SEARCH_QUERY, query });
export const applySearch = () => ({ type: APPLY_SEARCH }); //searchQuery is already on the state
export const setSuggestions = (suggestions) => ({ type: SET_SUGGESTIONS, suggestions });
export const deleteProduct = (productId) => ({ type: DELETE_PRODUCT, productId });
export const editProduct = (product) => ({ type: EDIT_PRODUCT, product });
export const addNewProduct = product => ({ type: ADD_NEW_PRODUCT, product })
/**
 * THUNK CREATORS
 */

//need to get all products, but also allow for getting all products via filtering through a category

export function fetchProducts() {
    return function thunk(dispatch) { // dispatches action in order to change the state
        return axios.get('/api/products')
            .then(res => res.data)
            .then(products => {
                const action = getProductsWithPromise(products); // this is the action creator function
                return dispatch(action); //this now returns a promise

            })
            .then(() => dispatch(applySearch())) // now we know for sure that applySearch will only be dispatched when allProducts are set on the state
            .catch(error => console.log(error));
    };
}

export function fetchProduct(productId) {
    return function thunk(dispatch) {
        return axios.get(`/api/products/${productId}`)
            .then(res => res.data)
            .then(product => {
                const action = getSingleProduct(product);
                dispatch(action);
            })
            .catch(error => console.log(error));
    };
}

export function fetchCategories() {
    return function thunk(dispatch) {
        return axios.get('/api/categories')
            .then(res => res.data)
            .then(categories => {
                const action = getCategories(categories);
                dispatch(action);
            })
            .catch(error => console.log(error));
    };
}

//wrapper around getProducts that will return a promise
function getProductsWithPromise(products) {
    return function thunk(dispatch) {
        dispatch(getProducts(products));
        return Promise.resolve();
    };
}

export function removeProduct(productId, history) {
    return function thunk(dispatch) {
        return axios.delete(`/api/products/${productId}`)
            .then(() => {
                const action = deleteProduct(productId);
                dispatch(action);
                history.push('/products');
            })
            .catch(error => console.log(error));
    };
}

export function updateProduct(product, history) {
    return function thunk(dispatch) {
        return axios.put(`/api/products/${product.id}`, product)
            .then(res => res.data)
            .then(resProduct => {
                const action = editProduct(resProduct);
                dispatch(action);
                history.push(`/products/${resProduct.id}`);
            })
            .catch(error => console.log(error));
    };
}

export function postProduct(product, history) {
    return function thunk(dispatch) {
        return axios.post('/api/products', product)
            .then(res => res.data)
            .then(newProduct => {
                const action = addNewProduct(newProduct);
                dispatch(action);
                history.push(`/products`);
            })
            .catch(error => console.log(error));
    };
}

// aux functions

const indexOfObject = (id, array) => {
    for (let i = 0; i < array.length; i++) {
        if (array[i].id === id) {
            return i;
        }
    }
    return -1;
};

/**
 * REDUCER
 */
export default function (state = initialProductsState, action) {
    switch (action.type) {
        case GET_PRODUCTS:
            return Object.assign({}, state, { allProducts: action.products, visibleProducts: action.products });

        case GET_SINGLE_PRODUCT: {
            return Object.assign({}, state, { currentProduct: action.product });
        }

        case GET_CATEGORIES:
            return Object.assign({}, state, { categories: action.categories });

        case SET_PRODUCT_CATEGORY: {
            // i need to see if the product im looking at, has the category id as one of its categories in its category array
            // first i need to map the array to create an array of the category ids
            // then i need to call indexOf on the array to see if > -1 is returned, if the indexOf that categoryid is greater than -1 then we know that id is in the array of categories thus we can return that product

            const selectedCategoryId = +action.categoryId;
            if (selectedCategoryId === -1) {
                return Object.assign({}, state, { selectedCategory: selectedCategoryId, visibleProducts: state.allProducts });
            }
            const filteredProducts = state.allProducts.filter(product => {
                const categoryIds = product.categories.map(category => {
                    return category.id;
                    //action.categoryId is the category the user selected
                });

                return categoryIds.indexOf(selectedCategoryId) > -1;
            });
            return Object.assign({}, state, { selectedCategory: selectedCategoryId, visibleProducts: filteredProducts });
        }

        case SET_SEARCH_QUERY:
            return Object.assign({}, state, { searchQuery: action.query });

        case APPLY_SEARCH: {
            const query = state.searchQuery.toLowerCase();
            //look in allProducts for the products that match the name of the product with the query (if the name contains what they searched)
            const filteredProducts = state.allProducts.filter(product => {
                return product.name.toLowerCase().includes(query);
            });
            return Object.assign({}, state, { visibleProducts: filteredProducts });
        }

        case SET_SUGGESTIONS:
            return Object.assign({}, state, { searchSuggestions: action.suggestions });

        case DELETE_PRODUCT: {
            const productId = action.productId;
            const remainingProductsArray = state.allProducts.filter(product => {
                return product.id !== productId;
            });
            return Object.assign({}, state, { allProducts: remainingProductsArray, visibleProducts: remainingProductsArray });
        }

        case EDIT_PRODUCT: {
            const productIndex = indexOfObject(action.product.id, state.allProducts);
            const newProductsArray = [...state.allProducts.slice(0, productIndex), action.product, ...state.allProducts.slice(productIndex + 1)];
            const newVisibleProductsArray = [...state.visibleProducts.slice(0, productIndex), action.product, ...state.visibleProducts.slice(productIndex + 1)];
            return Object.assign({}, state, { allProducts: newProductsArray, visibleProducts: newVisibleProductsArray });
        }

        case ADD_NEW_PRODUCT: {
            
            const newProduct = [...state.allProducts, action.product];
            const newVisibleProduct = [...state.allProducts, action.product];
            return Object.assign({}, state, { allProducts: newProduct, visibleProducts: newVisibleProduct });
        }

        default:
            return state
    }
}
