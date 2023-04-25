export interface patientData {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}

export type publicPatientData = Omit<patientData, "ssn">;

export interface diagnoseData {
  code: string;
  name: string;
  latin?: string;
}
