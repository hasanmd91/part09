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

export type publicPatient = Omit<Patient, "ssn">;

export type newPatient = Omit<Patient, "id">;

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}
export type EntryType = "HealthCheck" | "OccupationalHealthcare" | "Hospital";

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis["code"]>;
  type: EntryType;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "High´Risk" = 2,
  "CriticalRisk" = 3,
}
export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;
interface HealthCheckEntry extends BaseEntry {
  healthCheckRating: HealthCheckRating;
}

export interface SickLeave {
  startDate: string;
  endDate: string;
}
interface OccupationalHealthcareEntry extends BaseEntry {
  employerName: string;
  sickLeave: SickLeave;
}
export interface Discharge {
  date: string;
  criteria: string;
}
interface HospitalEntry extends BaseEntry {
  discharge?: Discharge;
}

type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;

export type EntryWithoutId = UnionOmit<Entry, "id">;
