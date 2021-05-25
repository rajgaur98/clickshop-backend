const jwt = require("jsonwebtoken");
const config = require("./config");

const getUserId = (headers) => {
  const token = headers.authorization.split(" ")[1];
  const user_id = jwt.verify(token, config.TOKEN_SECRET).id;
  return user_id;
};

module.exports = { getUserId };
