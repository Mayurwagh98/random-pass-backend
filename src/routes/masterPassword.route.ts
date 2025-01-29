import { Router } from "express";
const generateMasterPassword = require("../controller/masterPassword.controller");

const masterPasswordRouter = Router();

masterPasswordRouter.post("/generate-master-password", generateMasterPassword);

module.exports = masterPasswordRouter;
