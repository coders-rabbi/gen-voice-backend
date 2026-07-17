import { model, Schema } from "mongoose";
import { TUser, UserModel } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";

const UserSchema = new Schema<TUser>(
  {
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
    isActive: {
      type: String,
      enum: ["active", "blocked"],
      default: "active",
    },
  },
  {
    timestamps: true,
  },
);

//pre middleware
UserSchema.pre("save", async function () {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
});

//post middleware
UserSchema.post("save", async function (doc) {
  doc.password = "";
});

//Query Middleware
UserSchema.pre("find", async function () {
  this.find({ isDeleted: { $ne: true } });
});

//aggregate middleware
UserSchema.pre("aggregate", async function () {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
});

export const User = model<TUser, UserModel>("User", UserSchema);
