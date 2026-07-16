import { Model } from "mongoose";

// user.interface.ts
export type TUser = {
  email: string;
  password: string;
  role: string;
  isDeleted: boolean;
  status?: string;
};

export interface UserModel extends Model<TUser> {
  isUserExisting(id: string): Promise<TUser | null>;
}
