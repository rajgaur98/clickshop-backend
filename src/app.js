const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cartRoute = require("./routes/cart");
const productRouter = require("./routes/products");
const loginRoute = require("./routes/login");
const registerRoute = require("./routes/register");
require("./db/connect");

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(bodyParser.json());

app.use("/api/cart", cartRoute);
app.use("/api/products", productRouter);
app.use("/api/login", loginRoute);
app.use("/api/register", registerRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("listening on port %s", port);
});
