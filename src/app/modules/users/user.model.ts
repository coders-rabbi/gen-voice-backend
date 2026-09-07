import { model, Query, Schema } from "mongoose";
import bcrypt from "bcrypt";
import { TUser, UserModel } from "./user.interface";
import config from "../../config";
import { USER_ROLE } from "./user.constant";

const UserSchema = new Schema<TUser, UserModel>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },
    password: { type: String, required: true, select: false },
    passwordChangeAt: { type: Date },
    role: {
      type: String,
      enum: Object.values(USER_ROLE),
      default: USER_ROLE.USER,
    },
    isDeleted: { type: Boolean, default: false },
    isActive: {
      type: String,
      enum: ["active", "blocked"],
      default: "active",
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc, ret: any) {
        delete ret.password;
        delete ret.__v;
        return ret;
      },
    },
  },
);

// pre-save: hash password only when it changes
UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds) || 10,
  );
});

// soft-delete filter on aggregate pipelines
UserSchema.pre("aggregate", function () {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
});

// instance method
UserSchema.methods.comparePassword = async function (candidate: string) {
  return bcrypt.compare(candidate, this.password);
};

// static method
UserSchema.statics.isUserExisting = async function (id: string) {
  return this.findById(id);
};

UserSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangeTimestamp: Date,
  jwtIssuedTimestamp: number,
) {
  const passwordChangeTime = Math.floor(
    new Date(passwordChangeTimestamp).getTime() / 1000,
  );
  return passwordChangeTime > jwtIssuedTimestamp;
};

export const User = model<TUser, UserModel>("User", UserSchema);
