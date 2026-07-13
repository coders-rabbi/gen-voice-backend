import { model, Schema } from "mongoose";
import { TReporterName, TReporter } from "./reporter.interface";

const ReporterNameSchema = new Schema<TReporterName>({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
});

const ReporterSchema = new Schema<TReporter>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },

    name: {
      type: ReporterNameSchema,
      required: true,
    },

    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },

    dateOfBirth: {
      type: Date,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
    },

    contactNo: {
      type: String,
      required: true,
    },

    presentAddress: {
      type: String,
      required: true,
    },

    permanentAddress: {
      type: String,
      required: true,
    },

    profileImage: {
      type: String,
    },

    designation: {
      type: String,
      required: true,
    },

    facebook: {
      type: String,
    },

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
export const ReporterModel = model<TReporter>("Reporter", ReporterSchema);
