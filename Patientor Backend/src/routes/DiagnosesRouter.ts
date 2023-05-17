import express, { Request, Response } from "express";
import DiagnosesService from "../services/DiagnosesService";

const router = express.Router();

router.get("/", (_req: Request, res: Response) => {
  try {
    const diagnosesData = DiagnosesService.getdiagnoseData();
    res.send(diagnosesData);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong";
    if (error instanceof Error) {
      errorMessage += ": " + error.message;
    }
    res.status(500).send(errorMessage);
  }
});

router.get("/:code", (req: Request<{ code: string }>, res: Response) => {
  try {
    const { code } = req.params;
    const diagnosisData = DiagnosesService.getDiagnoseDataBycode(code);
    res.send(diagnosisData);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong";
    if (error instanceof Error) {
      errorMessage += ": " + error.message;
    }
    res.status(500).send(errorMessage);
  }
});

export default router;
