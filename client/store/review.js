import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_REVIEWS = 'GET_REVIEWS';
const ADD_NEW_REVIEW = 'ADD_NEW_REVIEW';


/**
 * INITIAL STATE
 */
const initialReviewsState = {
    allReviews: [],
}

/**
 * ACTION CREATORS
 */
const getReviews = reviews => ({ type: GET_REVIEWS, reviews });
export const addNewReview = review => ({ type: ADD_NEW_REVIEW, review })


/**
 * THUNK CREATORS
 */

export function fetchReviews() {
    return function thunk(dispatch) {
        return axios.get('/api/reviews')
            .then(res => res.data)
            .then(reviews => {
                const action = getReviews(reviews);
                dispatch(action);
            })
            .catch(error => console.log(error));
    };
}

export function postReview(review, history) {
    return function thunk(dispatch) {
        return axios.post('/api/reviews', review)
            .then(res => res.data)
            .then(newReview => {
                const action = addNewReview(newReview);
                dispatch(action);
                // do we want to be taken back to that single product page to view the review?
                history.push(`/products/${newReview.productId}`);
            })
            .catch(error => console.log(error));
    };
}



/**
 * REDUCER
 */
export default function (state = initialReviewsState, action) {
    switch (action.type) {
        case GET_REVIEWS:
            return Object.assign({}, state, { allReviews: action.reviews });

        case ADD_NEW_REVIEW: {
            const newReview = [...state.allReviews, action.review];
            return Object.assign({}, state, { allReviews: newReview });
        }
             

        default:
            return state
    }
}
