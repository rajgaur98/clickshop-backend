const router = require("express").Router();
const { getOrders, addOrder, deleteOrder } = require("../services/cart");

router.get("/", getOrders);

router.post("/", addOrder);

router.delete("/:id", deleteOrder);

module.exports = router;
