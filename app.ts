const express = require("express");
const app = express();
import { Request, Response } from "express";
const SignupRoute = require("./src/routes/signup.route");
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.use("/v1", SignupRoute);

app.get("/", (req: Request, res: Response) => {
  return res.send("<h1>Working</h1>");
});

module.exports = app;
