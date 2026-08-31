import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export type TUserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];

export type TUser = {
  email: string;
  password: string;
  passwordChangeAt?: Date;
  role: TUserRole;
  isDeleted: boolean;
  isActive?: "active" | "blocked";
  comparePassword(candidate: string): Promise<boolean>;
};

export interface UserModel extends Model<TUser> {
  isUserExisting(id: string): Promise<TUser | null>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangeTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean;
}
