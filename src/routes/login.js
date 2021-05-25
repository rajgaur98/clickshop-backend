const router = require("express").Router();
const login = require("../services/user").login;

router.post("/", login);

module.exports = router;
