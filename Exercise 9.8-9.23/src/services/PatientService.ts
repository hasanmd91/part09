import data from "../data/patients";
import { publicPatientData, newPatientData, patientData } from "../type";
import { v1 as uuid } from "uuid";

const getPublicPatientData = (): publicPatientData[] => {
  return data.map(({ id, name, dateOfBirth, gender, occupation }) => ({
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
  data.push(newPatient);
  return newPatient;
};

export default {
  getPublicPatientData,
  addPatients,
};
