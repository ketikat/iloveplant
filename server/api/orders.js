"use strict";

const router = require("express").Router();
const { Order, User, OrderItem } = require("../db/models");
const { isAdmin } = require("../gatekeeper.js");
module.exports = router;


router.get("/", (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    Order.findAll()
      .then(orders => res.json(orders))
      .catch(next);
  } else if (req.user) {
    Order.findAll({
      where: {
        userId: req.user.id
      }
    })
      .then(orders => res.json(orders))
      .catch(next);
  } else {
    const err = new Error("Not authorized");
    err.status = 403;
    next(err);
  }
});

router.get("/:orderId", (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    Order.findById(req.params.orderId, { include: [{ all: true }] })
      .then(order => {
        if (order) {
          res.json(order);
        } else {
          res
            .status(404)
            .send(`no order with the id of ${req.params.orderId} found`);
        }
      })
      .catch(next);
  } else if (req.user) {
    const orderIdNum = req.params.orderId;
    return Order.findAll({
      where: {
        id: orderIdNum,
        userId: req.user.id
      },
      include: [{ all: true }]
    })
      .then(myOrder => {
        if (myOrder.length !== 0) {
          res.json(myOrder[0]);
        } else {
          res.status(404).send("No order by that ID found!");
        }
      })
      .catch(next);
  } else {
    const err = new Error("Not authorized");
    err.status = 403;
    next(err);
  }
});

router.post("/", (req, res, next) => {
  let { orderTotal, orderProds, orderEmail, orderAddress} = req.body;
  let userId = req.user ? req.user.id : null;
  Order.create({ orderTotal, userId, orderEmail, orderAddress })
  .then(newOrder => {
    let orderId = newOrder.id;
    let orderItemArr = orderProds.map(prod => {
      return {
        priceAtPurchase: prod.price,
        quantity: prod.cartQuantity,
        productId: prod.id,
        orderId
      };
    });
    return OrderItem.bulkCreate(orderItemArr)
    .then(() => {
      return Order.findOne({where: {
        id: orderId
      },
      include: [{all: true}]
      })
    })
    .then(foundOrder => {
      res.json(foundOrder)
    })
  })
  .catch(next);
});

router.put("/:orderId", (req, res, next) => {
  Order.findById(req.params.orderId)
    .then(order => {
      return order.update(req.body);
    })
    .then(editedOrder => res.json(editedOrder))
    .catch(next);
});
