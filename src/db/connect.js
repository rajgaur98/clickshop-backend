const mongoose = require("mongoose");

mongoose.connect(
  `mongodb+srv://root:root@cluster0.ktwkp.mongodb.net/clickshop`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
mongoose.connection.on("error", (err) => console.log(err));
mongoose.connection.once("open", () => {
  console.log("we are connected");
});
