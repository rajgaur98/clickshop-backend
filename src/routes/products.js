const router = require("express").Router();
const Product = require("../models/products");

router.get("/:type", (req, res) => {
  Product.find(
    {
      type: req.params.type,
    },
    (err, products) => {
      if (err) res.send(err.message);
      res.send(products);
    }
  );
});

module.exports = router;
