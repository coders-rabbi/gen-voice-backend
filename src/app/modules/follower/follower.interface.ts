import { Types } from "mongoose";

export interface IFollow {
  follower: Types.ObjectId; 
  reporter: Types.ObjectId; 
}