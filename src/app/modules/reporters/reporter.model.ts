import { model, Schema } from "mongoose";
import { TReporterName, TReporter, ReporterModel } from "./reporter.interface";

const ReporterNameSchema = new Schema<TReporterName>({
  firstName: { type: String, required: true, trim: true },
  middleName: { type: String, trim: true },
  lastName: { type: String, required: true, trim: true },
});

const ReporterSchema = new Schema<TReporter, ReporterModel>(
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
      trim: true,
    },

    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
    },

    contactNo: {
      type: String,
      required: true,
      trim: true,
    },

    presentAddress: {
      type: String,
      required: true,
      trim: true,
    },

    permanentAddress: {
      type: String,
      required: true,
      trim: true,
    },

    profileImage: {
      type: String,
    },

    designation: {
      type: String,
      required: true,
      trim: true,
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

//custom static methods
ReporterSchema.statics.isReporterExists = async function (id: string) {
  const ExistingReport = await Reporter.findOne({ id });
  return ExistingReport;
};

// custom instance method
// ReporterSchema.methods.isReporterExists = async function (id: string) {
//   const ExistingReporter = await Reporter.findOne({ id });
//   return ExistingReporter;
// };

export const Reporter = model<TReporter, ReporterModel>(
  "Reporter",
  ReporterSchema,
);
