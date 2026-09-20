import mongoose, { Schema, Model } from "mongoose";
import { IVisit } from "./visit.interface";

const VisitSchema = new Schema<IVisit>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    path: { type: String },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

// aggregation query দ্রুত করার জন্য index
VisitSchema.index({ createdAt: 1 });
VisitSchema.index({ userId: 1 });

const Visit: Model<IVisit> =
  mongoose.models.Visit || mongoose.model<IVisit>("Visit", VisitSchema);

export default Visit;
