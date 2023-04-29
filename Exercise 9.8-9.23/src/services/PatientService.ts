import { publicPatientData, newPatientData, patientData } from "../type";
import { v1 as uuid } from "uuid";
import patientsData from "../data/patients";

const getPublicPatientData = (): publicPatientData[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatients = (newEntry: newPatientData): patientData => {
  const newPatient = {
    id: uuid(),
    ...newEntry,
  };
  patientsData.push(newPatient);
  return newPatient;
};

export default {
  getPublicPatientData,
  addPatients,
};
