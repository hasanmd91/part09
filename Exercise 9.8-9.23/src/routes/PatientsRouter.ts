import express from "express";
import PatientService from "../services/PatientService";
const router = express.Router();

router.get("/", (_req, res) => {
  res.send(PatientService.getPublicPatientData());
});

export default router;
