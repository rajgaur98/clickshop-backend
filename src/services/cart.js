const Order = require("../models/orders");
const Product = require("../models/products");
const jwt = require("jsonwebtoken");
const config = require("../config");

const getOrders = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const user_id = jwt.verify(token, config.TOKEN_SECRET).id;
  Order.find({
    user_id: user_id,
  })
    .populate("product")
    .exec((err, products) => {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      } else res.status(200).send(products);
    });
};

const addOrder = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const user_id = jwt.verify(token, config.TOKEN_SECRET).id;
  Order.create(
    {
      user_id: user_id,
      product: req.body.product_id,
    },
    (err, order) => {
      if (err) res.status(400).send(err);
      else res.status(201).send(order);
    }
  );
};

const deleteOrder = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const user_id = jwt.verify(token, config.TOKEN_SECRET).id;
  Order.deleteOne(
    {
      _id: req.params.id,
    },
    (err, _) => {
      if (err) res.status(400).send(err);
      else {
        Order.find({
          user_id: user_id,
        })
          .populate("product")
          .exec((err, products) => {
            if (err) {
              console.log(err);
              res.status(400).send(err);
            } else res.status(200).send(products);
          });
      }
    }
  );
};

module.exports = { getOrders, addOrder, deleteOrder };
