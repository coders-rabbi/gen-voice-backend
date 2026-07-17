import { Model } from "mongoose";

// user.interface.ts
export type TUser = {
  email: string;
  password: string;
  role: string;
  isDeleted: boolean;
  isActive?: "active" | "blocked";
};

export interface UserModel extends Model<TUser> {
  isUserExisting(id: string): Promise<TUser | null>;
}
