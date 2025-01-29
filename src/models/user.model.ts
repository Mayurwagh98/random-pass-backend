import mongoose, { Schema, Document } from "mongoose";

export interface User extends Document {
  name: string;
  email: string;
  password: string;
  masterPassword?: string;
  masterPasswordExpiry?: Date;
}

const userSchema: Schema<User> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    masterPassword: {
      type: String,
      required: false,
    },
    masterPasswordExpiry: {
      type: Date,
      required: false,
    },
  },
  { timestamps: true }
);

// Create a User model using the schema
const User = mongoose.model<User>("User", userSchema);

module.exports = User;
