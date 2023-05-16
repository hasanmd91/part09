import data from "../data/diagnoses";
import { Diagnosis } from "../type";

const getdiagnoseData = (): Diagnosis[] => {
  return data;
};

export default {
  getdiagnoseData,
};
