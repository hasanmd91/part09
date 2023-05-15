import express from "express";
import DiagnosesService from "../services/DiagnosesService";
const router = express.Router();

router.get("/", (_req, res) => {
  res.send(DiagnosesService.getdiagnoseData());
});

export default router;
