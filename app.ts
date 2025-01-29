const express = require("express");
const app = express();
import { Request, Response } from "express";
const SignupRoute = require("./src/routes/signup.route");
const LoginRoute = require("./src/routes/login.route");
const MasterPasswordRoute = require("./src/routes/masterPassword.route");
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.use("/v1", SignupRoute);
app.use("/v1", LoginRoute);
app.use("/v1", MasterPasswordRoute);

app.get("/", (req: Request, res: Response) => {
  return res.send("<h1>Working</h1>");
});

module.exports = app;
