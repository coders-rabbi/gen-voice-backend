import mongoose, { Schema, Model } from "mongoose";
import { IPoll, IQuestion } from "./poll.interface";

const QuestionSchema = new Schema<IQuestion>(
  {
    type: {
      type: String,
      enum: ["RADIO", "TEXT", "CHECKBOX", "RATING", "YESNO", "EMOJI"],
      required: true,
    },
    label: { type: String, required: true, trim: true },
    options: { type: [String], default: [] },
    required: { type: Boolean, default: false },
  },
  { _id: false },
);

const PollSchema = new Schema<IPoll>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    visibility: {
      type: String,
      enum: ["Public", "Private", "Unlisted"],
      default: "Public",
    },
    category: {
      type: String,
      enum: ["Politics", "Business", "Technology", "Culture"],
      default: "Politics",
    },
    questions: { type: [QuestionSchema], default: [] },
    votes: { type: Number, default: 0 }, // 👈 fix
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

// Prevent model overwrite errors on hot-reload (Next.js dev mode)
const Poll: Model<IPoll> =
  mongoose.models.Poll || mongoose.model<IPoll>("Poll", PollSchema);

export default Poll;
