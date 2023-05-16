import data from "../data/diagnoses";
import { Diagnosis } from "../type";

const DiagnosesService = {
  getdiagnoseData: (): Diagnosis[] => {
    return data;
  },

  getDiagnoseDataBycode: (code: string): Diagnosis | undefined => {
    const diagnosis = data.find((d) => d.code === code);
    return diagnosis;
  },
};

export default DiagnosesService;
