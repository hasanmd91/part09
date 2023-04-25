import data from "../data/patients";
import { publicPatientData } from "../type";

const getPublicPatientData = (): publicPatientData[] => {
  return data.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default {
  getPublicPatientData,
};
