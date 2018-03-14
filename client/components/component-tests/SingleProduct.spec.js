/* global describe beforeEach it */

import { expect } from "chai";
import React from "react";
import enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { SingleProduct } from "../SingleProduct";

const adapter = new Adapter();
enzyme.configure({ adapter });

describe("SingleProduct", () => {
  let singleProduct;

  beforeEach(() => {
    let prod = {
      id: 1,
      name: "Aloe Vera",
      description: "Dont eat me but rub me all over yourself.",
      image: "https://i.imgur.com/pBjJBKK.jpg",
      price: 5,
      inventory: 26,
      createdAt: "2018-01-15T02:22:20.626Z",
      updatedAt: "2018-01-15T02:22:20.626Z",
      reviews: [
        {
          id: 1,
          content: "I. LOVE. PLANT.",
          rating: 5,
          createdAt: "2018-01-15T02:22:20.684Z",
          updatedAt: "2018-01-15T02:22:20.684Z",
          userId: 1,
          productId: 1
        }
      ]
    };
    singleProduct = shallow(<SingleProduct productData={prod} />);
  });

  it("renders the title in an h1", () => {
    expect(singleProduct.find("li").text()).to.be.equal("Dont eat me but rub me all over yourself.");
  });
});
