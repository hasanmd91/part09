// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries?: Entry[];
}

export type publicPatient = Omit<Patient, "ssn" | "entries">;

export type newPatient = Omit<Patient, "id">;

export interface diagnoseData {
  code: string;
  name: string;
  latin?: string;
}
