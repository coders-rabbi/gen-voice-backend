import { Document, Types } from "mongoose";

export interface IVisit extends Document {
  userId?: Types.ObjectId; // থাকলে registered visitor, না থাকলে guest
  path?: string; // কোন পেজে visit হয়েছে (optional, চাইলে ট্র্যাক করবেন)
  createdAt: Date;
}

export type TTrafficStats = {
  totalVisits: number;
  registeredVisits: number;
  guestVisits: number;
};
