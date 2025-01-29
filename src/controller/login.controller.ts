const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
import { Request, Response } from "express";

const Login = async (req: Request, res: Response): Promise<void> => {
  const { email, password }: { email: string; password: string } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).send({ message: "User not found" });
      return;
    }

    if (!password) {
      res.status(400).send({ message: "Password is required" });
      return;
    }

    // Check if master password exists, is not expired, and matches the input
    const currentTime = new Date();
    const isMasterPasswordValid =
      user.masterPassword &&
      user.masterPasswordExpiry &&
      new Date(user.masterPasswordExpiry) > currentTime;

    // Check if master password matches
    const isMasterPasswordMatch =
      isMasterPasswordValid &&
      (await bcrypt.compare(password, user.masterPassword));

    // Check if regular password matches
    const isRegularPasswordValid = await bcrypt.compare(
      password,
      user.password
    );

    // If either password is valid, generate token and login
    if (isMasterPasswordValid || isRegularPasswordValid) {
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET || "default_secret"
      );

      const message = isMasterPasswordValid
        ? "Login successful with master password"
        : "Login successful";

      res.status(200).send({ message, token });
      return;
    }

    // If neither password matches
    res.status(401).send({ message: "Invalid password" });
  } catch (error: any) {
    res.status(500).send({ message: "An error occurred during login" });
  }
};

module.exports = Login;
