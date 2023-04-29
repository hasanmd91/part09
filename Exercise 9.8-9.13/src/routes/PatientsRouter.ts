import express from "express";
import PatientService from "../services/PatientService";
import toAddNewPatient from "../utils/utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(PatientService.getPublicPatientData());
});

router.post("/", (req, res) => {
  try {
    const newPatient = toAddNewPatient(req.body);
    const addPatiens = PatientService.addPatients(newPatient);
    res.json(addPatiens);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong";
    if (error instanceof Error) {
      errorMessage += "Error " + error;
    }

    res.status(400).send(errorMessage);
  }
});

export default router;
