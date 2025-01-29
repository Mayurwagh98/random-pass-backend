const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
import { Request, Response } from "express";

const Login = async (req: Request, res: Response): Promise<void> => {
  const {
    email,
    password,
    masterPassword,
  }: { email: string; password: string; masterPassword?: string } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).send({ message: "User not found" });
      return;
    }

    // Check if master password is provided and valid
    if (masterPassword) {
      const currentTime = new Date();
      if (
        user.masterPassword &&
        user.masterPasswordExpiry &&
        new Date(user.masterPasswordExpiry) > currentTime &&
        masterPassword === user.masterPassword
      ) {
        const token = jwt.sign(
          { email: user.email },
          process.env.JWT_SECRET || "default_secret"
        );
        res
          .status(200)
          .send({ message: "Login successful with master password", token });
        return;
      }
      res.status(401).send({ message: "Invalid or expired master password" });
      return;
    }

    // Regular password authentication
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).send({ message: "Invalid password" });
      return;
    }

    const token = jwt.sign(
      { email: user.email },
      process.env.JWT_SECRET || "default_secret"
    );

    res.status(200).send({ message: "Login successful", token });
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send({ message: "An error occurred during login" });
  }
};

module.exports = Login;
