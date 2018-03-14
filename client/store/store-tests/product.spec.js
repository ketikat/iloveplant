/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {fetchProducts, fetchProduct} from '../product'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../../history'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {allProducts: [], currentProduct: {}}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('products', () => {
    it('eventually dispatches the GET PRODUCTS action', () => {
      const fakeProducts = [{name: 'test1'}, {name: 'test2'}]
      mockAxios.onGet('/api/products').replyOnce(200, fakeProducts)
      return store.dispatch(fetchProducts())
        .then(() => {
          const actions = store.getActions()
          expect(actions[0].type).to.be.equal('GET_PRODUCTS')
          expect(actions[0].products).to.be.deep.equal(fakeProducts)
        })
    })
  })

})
