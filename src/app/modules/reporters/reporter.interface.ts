import { Model, Types } from "mongoose";

export type TReporterName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TReporter = {
  id: string;
  user: Types.ObjectId;
  name: TReporterName;
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

//Static Methods
export interface ReporterModel extends Model<TReporter> {
  isReporterExists(id: string): Promise<TReporter | null>;
}

// custom instace
// export type ReporterMethods = {
//   isReporterExists(id: string): Promise<TReporter | null>;
// };

// export type ReporterModel = Model<
//   TReporter,
//   Record<string, never>,
//   ReporterMethods
// >;
