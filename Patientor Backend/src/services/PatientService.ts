import { v1 as uuid } from "uuid";
import { publicPatient, newPatient, Patient } from "../type";
import patientsData from "../data/patients";

import { EntryWithoutId } from "./../type";

const getPublicPatient = (): publicPatient[] => {
  return patientsData.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
};

const getSinglepatient = (id: string) => {
  const singlePatient = patientsData.find((patient) => patient.id === id);
  return singlePatient;
};

const addPatients = (patients: newPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patients,
  };
  patientsData.push(newPatient);
  return newPatient;
};

const addNewEntry = (id: string, entry: EntryWithoutId) => {
  const Patient = patientsData.find((patient) => patient.id === id);
  const newEntry = {
    id: uuid(),
    ...entry,
  };
  Patient?.entries?.push(newEntry);
  return newEntry;
};

export default {
  getPublicPatient,
  addPatients,
  getSinglepatient,
  addNewEntry,
};
