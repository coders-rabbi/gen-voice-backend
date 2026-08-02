import { Types } from "mongoose";

export type TEditorName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TEditor = {
  id: string;
  user: Types.ObjectId;
  name: TEditorName;
  gender: "male" | "female";
  dateOfBirth: Date;
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "O+" | "O-" | "AB+" | "AB-";
  contactNo: string;
  presentAddress: string;
  permanentAddress: string;
  profileImage?: string;
  designation: string;
  facebook?: string;
  createdAt?: Date;
  updatedAt?: Date;
};
