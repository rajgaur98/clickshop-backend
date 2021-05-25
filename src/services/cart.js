const Order = require("../models/orders");
const Product = require("../models/products");
const jwt = require("jsonwebtoken");
const config = require("../config");

const getOrders = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const user_id = jwt.verify(token, config.TOKEN_SECRET).id;
  Order.find(
    {
      user_id: user_id,
    },
    (err, order) => {
      if (err) res.status(400).send(err);
      else {
        const orders = [];
        if (order.length === 0) res.status(200).send(orders);
        order.forEach((o, i) => {
          Product.find(
            {
              _id: o.product_id,
            },
            (errr, product) => {
              if (errr) res.status(400).send(errr);
              else {
                temp = { ...product[0]._doc, order_id: o._id };
                orders.push(temp);
              }
              if (i === order.length - 1) res.status(200).send(orders);
            }
          );
        });
      }
    }
  );
};

const addOrder = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const user_id = jwt.verify(token, config.TOKEN_SECRET).id;
  Order.create(
    {
      user_id: user_id,
      product_id: req.body.product_id,
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
        Order.find(
          {
            user_id: user_id,
          },
          (err, order) => {
            if (err) res.status(400).send(err);
            else {
              const orders = [];
              if (order.length === 0) res.status(200).send(orders);
              order.forEach((o, i) => {
                Product.find(
                  {
                    _id: o.product_id,
                  },
                  (errr, product) => {
                    if (errr) res.status(400).send(errr);
                    else {
                      temp = { ...product[0]._doc, order_id: o._id };
                      orders.push(temp);
                    }
                    if (i === order.length - 1) res.status(200).send(orders);
                  }
                );
              });
            }
          }
        );
      }
    }
  );
};

module.exports = { getOrders, addOrder, deleteOrder };
