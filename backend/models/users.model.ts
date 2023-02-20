import * as mongoose from "mongoose";
import * as validator from "validator";
import * as bcryptjs from "bcryptjs";
import * as jwt from "jsonwebtoken";
import * as crypto from "crypto";

import { IUser } from "../interfaces/user.interface";

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
      maxlength: [30, "Your name cannot exceed 30 characters"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
      validate: [validator.default.isEmail, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minlength: [6, "Your password must be longer than 6 characters"],
      select: false,
    },
    avatar: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },

    role: {
      type: String,
      default: "user",
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  }
);

/**
 * Encrypt user password before saving
 */

userSchema.pre("save", async function (next) {
  const SALT_WORK_FACTOR = 10;

  if (!this.isModified("password")) return next();

  const salt = await bcryptjs.genSalt(SALT_WORK_FACTOR);

  const hash = await bcryptjs.hash(this.password, salt);

  this.password = hash;

  next();
});

/**
 * Compare user password with db password
 */
userSchema.methods.comparePassword = async function (enteredPassword: string) {
  return await bcryptjs.compare(enteredPassword, this.password);
};

/**
 * Return JWT
 */
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
};

/**
 * Generate password reset token
 */

userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 30 * 60 * 100;

  return resetToken;
};
const User = mongoose.model<IUser>("User", userSchema);

User.createIndexes();

export { User };
