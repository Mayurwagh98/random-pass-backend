const app = require("./app")
const connectDb = require("./src/config/db")
require("dotenv").config()


connectDb()

app.listen(5001,() =>{
    console.log(`server running on 5000`)
})