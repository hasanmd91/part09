import express from "express";
import PatientService from "../services/PatientService";
import toAddNewPatient from "../utils/utils";
import toAddNewEntries from "../utils/NewEntry";
import { Request, Response } from "express";
const router = express.Router();

router.get("/", (_req, res) => {
  res.send(PatientService.getPublicPatient());
});

router.get("/:id", (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  console.log(id);
  res.send(PatientService.getSinglepatient(id));
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

router.post("/:id/entries", (req, res) => {
  try {
    const { id } = req.params;
    const newEntry = toAddNewEntries(req.body);
    const addedPatient = PatientService.addNewEntry(id, newEntry);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }

    res.status(400).send(errorMessage);
  }
});

export default router;
