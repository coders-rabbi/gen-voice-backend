import { Model } from "mongoose";

export type TUserRole =
  | "super_admin"
  | "admin"
  | "editor"
  | "reporter"
  | "user";

export type TUser = {
  email: string;
  password: string;
  role: TUserRole;
  isDeleted: boolean;
  isActive?: "active" | "blocked";
  comparePassword(candidate: string): Promise<boolean>;
};

export interface UserModel extends Model<TUser> {
  isUserExisting(id: string): Promise<TUser | null>;
}
