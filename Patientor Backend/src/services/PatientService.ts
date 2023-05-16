import { publicPatient, newPatient, Patient } from "../type";
import { v1 as uuid } from "uuid";
import patientsData from "../data/patients";

const getPublicPatient = (): publicPatient[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getSinglepatient = (id: string) => {
  const singlePatient = patientsData.find((patient) => patient.id === id);
  return singlePatient;
};

const addPatients = (newEntry: newPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...newEntry,
  };
  patientsData.push(newPatient);
  return newPatient;
};

export default {
  getPublicPatient,
  addPatients,
  getSinglepatient,
};
