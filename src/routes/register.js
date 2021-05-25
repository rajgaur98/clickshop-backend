const router = require("express").Router();
const register = require("../services/user").register;

router.post("/", register);

module.exports = router;
