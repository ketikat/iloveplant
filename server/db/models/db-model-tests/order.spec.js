/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../../index')
const Order = db.model('order')

describe('Order model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('correct data', () => {
      let myOrder

      beforeEach(() => {
      const testOrder = {
        id: 67,
        orderStatus: "Completed",
        orderTotal: 234, 
        orderEmail: "me@me.com", 
        orderAddress: "123 streeet st."
      }
      return Order.create(testOrder)
      .then(order => {
            myOrder = order
          })
      })

      it('returns the correct Order Status', () => {
        expect(myOrder.orderStatus).to.be.equal("Completed")
      })
      it('returns the correct email', () => {
       expect(myOrder.orderEmail).to.be.equal("me@me.com")
      })
    }) 
  }) 
}) 
