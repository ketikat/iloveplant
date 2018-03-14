const {expect} = require('chai')
const db = require('../../index')
const Product = db.model('product')

describe('Product model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('correct data', () => {
      let planty

      beforeEach(() => {
        return Product.create({
          name: 'Mr plant',
          description: 'i am a test description',
          price: 11
        })
          .then(product => {
            planty = product
          })
      })

      it('returns the correct description', () => {
        expect(planty.description).to.be.equal('i am a test description')
      })
      it('does not match incorrect description', () => {
        expect(planty.description).to.not.equal('wrong description')
      })
      it('returns the correct price', () => {
        expect(planty.price).to.be.equal(11)
      })
      it('does not match incorrect price', () => {
        expect(planty.price).to.not.equal(50)
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')
}) // end describe('User model')
