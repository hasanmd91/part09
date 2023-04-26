import express from "express";
import PatientService from "../services/PatientService";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(PatientService.getPublicPatientData());
});

router.post("/", (req, res) => {
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;

  const addPatiens = PatientService.addPatients({
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
  });

  res.json(addPatiens);
});

export default router;
