import express from "express";
import DiagnosesService from "../services/DiagnosesService";
import { Request, Response } from "express";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(DiagnosesService.getdiagnoseData());
});

router.get("/:code", (req: Request<{ code: string }>, res: Response) => {
  const { code } = req.params;
  res.send(DiagnosesService.getDiagnoseDataBycode(code));
});

export default router;
