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
  console.log("what is this id", id);

  const Patient = patientsData.find((patient) => patient.id === id);
  const newEntry = {
    id: uuid(),
    ...entry,
  };

  console.log("this is patient", Patient);
  console.log("this is entry", newEntry);
  if (Patient) {
    const myentry = Patient?.entries?.push(newEntry);
    console.log("this is all entries", myentry);
  }

  return newEntry;
};

export default {
  getPublicPatient,
  addPatients,
  getSinglepatient,
  addNewEntry,
};
