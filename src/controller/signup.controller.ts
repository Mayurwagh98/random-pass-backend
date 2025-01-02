const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Adjust the path according to your project structure.
import { Request, Response } from "express";

/**
 * Signup controller for user registration.
 * @param req - Express request object.
 * @param res - Express response object.
 */
const Signup = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password }: { name: string; email: string; password: string } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      res.status(200).send({ message: "User already exists" });
      return;
    }

    const hashPassword = await bcrypt.hash(password, 8);

    const newUser = await User.create({ name, email, password: hashPassword });

    const token = jwt.sign({ email: newUser.email }, process.env.JWT_SECRET || "default_secret");

    res.status(200).send({ message: "User registered", newUser, token });
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send({ message: "An error occurred during signup" });
  }
};

module.exports = Signup;
