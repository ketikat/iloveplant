/* global describe beforeEach it */

const { expect } = require("chai");
const request = require("supertest");
const db = require("../../db");
const app = require("../../index");
const Product = db.model("product");

describe("Product routes", () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe("/api/products/", () => {
    const planty = {
      name: "Mr Plant",
      description: "this is a test description",
      price: 12
    };

    beforeEach(() => {
      return Product.create(planty);
    });

    it("GET /api/products", () => {
      return request(app)
        .get("/api/products")
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an("array");
          expect(res.body[0].name).to.be.equal("Mr Plant");
        });
    });

    it("GET /api/products/1", () => {
      return request(app)
        .get("/api/products")
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an("array");
          expect(res.body[0].name).to.be.equal("Mr Plant");
        });
    });

  });
});
