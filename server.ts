const app = require("./app")
const connectDb = require("./config/db")
require("dotenv").config()


connectDb()

app.listen(5000,() =>{
    console.log(`server running on 5000`)
})