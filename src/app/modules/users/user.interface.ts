import { Model } from "mongoose";

// user.interface.ts
export type TUser = {
  email: string; // Use lowercase 'string'
  password: string; // Use lowercase 'string'
  role: string; // Use lowercase 'string'
  isDeleted: boolean;
  status?: string; // Use lowercase 'string'
};

export interface UserModel extends Model<TUser> {
  isUserExisting(id: string): Promise<TUser | null>;
}
