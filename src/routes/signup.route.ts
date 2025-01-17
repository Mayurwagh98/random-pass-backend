const router = require("express").Router();
const Signup = require("../controller/signup.controller");

router.post("/signup", Signup);

module.exports = router;
