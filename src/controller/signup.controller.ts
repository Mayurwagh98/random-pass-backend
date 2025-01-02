import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import User from "../models/User"; // Adjust the import path based on your project structure.

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

    const token = jwt.sign({ email: newUser.email }, "blah");

    res.status(200).send({ message: "User registered", newUser, token });
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send({ message: "An error occurred during signup" });
  }
};

export default Signup;
