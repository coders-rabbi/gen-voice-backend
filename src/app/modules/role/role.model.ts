import { Schema, model } from "mongoose";
import { TPermission, TRole } from "./role.interface";
import { Features } from "./roel.const";

const permissionSchema = new Schema<TPermission>(
  {
    feature: {
      type: String,
      enum: Features,
      required: true,
    },
    isGranted: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false },
);

const roleSchema = new Schema<TRole>(
  {
    roleName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    permissions: {
      type: [permissionSchema],
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export const Role = model<TRole>("Role", roleSchema);
