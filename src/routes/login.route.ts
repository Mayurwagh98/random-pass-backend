import { Router } from "express";
const Login = require("../controller/login.controller");

const loginRouter = Router();

loginRouter.post("/login", Login);

module.exports = loginRouter;
