import { Types } from "mongoose";

export type TFeature =
  | "categories"
  | "registeredUsers"
  | "allPosts"
  | "allPolls"
  | "usersAndRoll"
  | "websiteConfiguration"
  | "settings";

export type TPermission = {
  feature: TFeature;
  isGranted: boolean;
};

export type TRole = {
  roleName: string;
  permissions: TPermission[];
  isDeleted: boolean;
};
