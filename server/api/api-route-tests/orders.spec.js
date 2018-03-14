/* global describe beforeEach it */

const { expect } = require("chai");
const request = require("supertest");
const db = require("../../db");
const app = require("../../index");
const Order = db.model("order");
// const User = db.model("user");


//let's set up the data we need to pass to the login method

describe("Order routes", () => {

    beforeEach(() => {
       return db.sync({ force: true })
    })

    beforeEach(() => {
        return const userCredentials = {
          email: 'bob@heyann.com', 
          password: 'plant', 
          isADmin: "TRUE"
      }
    })

    beforeEach(() => {
      var authenticatedUser = request.agent(app);

      return authenticatedUser
        .post('/login')
        .send(userCredentials)
        .end(function(err, response){
          expect(response.statusCode).to.equal(200);
          // expect('Location', '/home');
          done();
        })
    })


  describe('GET /api/orders', function(done){
  //addresses 1st bullet point: if the user is logged in we should get a 200 status code
    it('should return a 200 response if the user is logged in', function(done){
      authenticatedUser.get('api/orders')
      .expect(200, done);
    });
  //addresses 2nd bullet point: if the user is not logged in we should get a 302 response code and be directed to the /login page
    it('should return a 302 response and redirect to /login', function(done){
      request(app).get('api/account')
      .expect('Location', '/login')
      .expect(302, done);
    });
  });




  describe("/api/orders/", () => {
    const testOrder = {
      id: 67,
      orderStatus: "Completed",
      orderTotal: 234, 
      orderEmail: "me@me.com", 
      orderAddress: "123 streeet st."
    };

    beforeEach(() => {
      return Order.create(testOrder);
    });

    it("GET /api/orders", () => {
      return request(app)
        .get("/api/orders")
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an("array");
          expect(res.body[0].id).to.be.equal(67);
        });
    });

    it("GET /api/orders/67", () => {
      return request(app)
        .get("/api/orders/67")
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an("object");
          expect(res.body.userId).to.be.equal(3);
        });
    });

  });
});

});
