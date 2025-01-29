import { Request, Response } from "express";
const User = require("../models/user.model");
const bcrypt = require("bcrypt");

const generateMasterPassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email }: { email: string } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).send({ message: "User not found" });
      return;
    }

    // Generate a random 8-character master password
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let masterPassword = "";
    for (let i = 0; i < 8; i++) {
      masterPassword += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }

    // Set expiry time to 24 hours from now
    const masterPasswordExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);

    // Hash the master password before storing
    const hashedMasterPassword = await bcrypt.hash(masterPassword, 8);

    // Update user with new hashed master password and expiry
    await User.findByIdAndUpdate(user._id, {
      masterPassword: hashedMasterPassword,
      masterPasswordExpiry,
    });

    res.status(200).send({
      message: "Master password generated successfully",
      masterPassword,
      expiresAt: masterPasswordExpiry,
    });
  } catch (error: any) {
    res
      .status(500)
      .send({ message: "An error occurred while generating master password" });
  }
};

module.exports = generateMasterPassword;
