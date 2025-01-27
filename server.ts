const app = require("./app");
const connectDb = require("./src/config/db");
require("dotenv").config();

connectDb();

app.listen(5002, () => {
  console.log(`server running on 5002`);
});
