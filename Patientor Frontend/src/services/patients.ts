import axios from "axios";
import { EntryWithoutId, Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const patientService = {
  getAll: async () => {
    const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

    return data;
  },

  getPatientDetails: async (id: string) => {
    const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
    return data;
  },

  create: async (object: PatientFormValues) => {
    console.log(object);
    const { data } = await axios.post<Patient>(
      `${apiBaseUrl}/patients`,
      object
    );
    console.log(data);
    return data;
  },

  createEntry: async (id: string, object: EntryWithoutId) => {
    const { data } = await axios.post<EntryWithoutId>(
      `${apiBaseUrl}/patients/${id}/entries`,
      object
    );

    return data;
  },
};

export default patientService;
