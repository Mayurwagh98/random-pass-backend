import { Router } from "express";
const Signup = require("../controller/signup.controller");

const signupRouter = Router();

signupRouter.post("/signup", Signup);

module.exports = signupRouter;
