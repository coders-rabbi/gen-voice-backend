import mongoose, { Schema, Model } from "mongoose";
import { IPollResponse, IAnswer } from "./poll-response.interface";

const AnswerSchema = new Schema<IAnswer>(
  {
    questionId: { type: String },
    questionLabel: { type: String, required: true },
    answer: { type: Schema.Types.Mixed, required: true },
  },
  { _id: false },
);

const PollResponseSchema = new Schema<IPollResponse>(
  {
    pollId: { type: Schema.Types.ObjectId, ref: "Poll", required: true },
    answers: { type: [AnswerSchema], default: [] },
    respondentId: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true },
);

// pollId দিয়ে ঘন ঘন query হবে, তাই index যোগ করা হলো
PollResponseSchema.index({ pollId: 1 });

const PollResponse: Model<IPollResponse> =
  mongoose.models.PollResponse ||
  mongoose.model<IPollResponse>("PollResponse", PollResponseSchema);

export default PollResponse;