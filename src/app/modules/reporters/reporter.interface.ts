export type TReporterName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TReporter = {
  id: string;
  name: TReporterName;
  gender: "male" | "female";
  dateOfBirth: Date;
  email: string;
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "O+" | "O-" | "AB+" | "AB-";
  contactNo: string;
  presentAddress: string;
  permanentAddress: string;
  profileImage?: string;
  designation: string;
  facebook?: string;
  isActive?: "active" | "blocked";
  createdAt?: Date;
  updatedAt?: Date;
};