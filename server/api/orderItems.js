"use strict";

const router = require("express").Router();
const { Order, User, OrderItem } = require("../db/models");
const { isAdmin } = require("../gatekeeper.js");
module.exports = router;

router.get('/', (req, res, next) => {
  OrderItem.findAll({include: [{all: true}]})
  .then(orderItems => res.json(orderItems))
  .catch(next);
})
