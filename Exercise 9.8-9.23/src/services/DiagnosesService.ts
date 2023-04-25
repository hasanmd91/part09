import data from "../data/diagnoses";
import { diagnoseData } from "../type";

const getdiagnoseData = (): diagnoseData[] => {
  return data;
};

export default {
  getdiagnoseData,
};
