export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface patientData {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

export type publicPatientData = Omit<patientData, "ssn">;

export type newPatientData = Omit<patientData, "id">;

export interface diagnoseData {
  code: string;
  name: string;
  latin?: string;
}
