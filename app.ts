const express = require("express")
const app = express()
import {Request, Response} from "express"

app.use(express.json())


app.get("/", (req: Request, res: Response) =>{
    return res.send("<h1>Working</h1>")
})


module.exports = app