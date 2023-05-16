import { Diagnosis } from "../types";
import { apiBaseUrl } from "../constants";
import axios from "axios";

const diagnosisService = {
  getAll: async (): Promise<Diagnosis[]> => {
    const { data } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
    return data;
  },
  getByCode: async (code: string): Promise<Diagnosis> => {
    const { data } = await axios.get<Diagnosis>(
      `${apiBaseUrl}/diagnoses/${code}`
    );
    return data;
  },
};

export default diagnosisService;
