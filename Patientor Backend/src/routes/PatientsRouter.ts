import express, { Request, Response } from "express";
import PatientService from "../services/PatientService";
import toAddNewPatient from "../utils/validatePatientData";
import toAddNewEntries from "../utils/validateEntryData";

const router = express.Router();

router.get("/", (_req: Request, res: Response) => {
  try {
    const publicPatients = PatientService.getPublicPatient();
    res.send(publicPatients);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong";
    if (error instanceof Error) {
      errorMessage += ": " + error.message;
    }
    res.status(500).send(errorMessage);
  }
});

router.get("/:id", (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;

    const singlePatient = PatientService.getSinglepatient(id);
    res.send(singlePatient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong";
    if (error instanceof Error) {
      errorMessage += ": " + error.message;
    }
    res.status(500).send(errorMessage);
  }
});

router.post("/", (req: Request, res: Response) => {
  try {
    const newPatient = toAddNewPatient(req.body);
    const addedPatient = PatientService.addPatients(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong";
    if (error instanceof Error) {
      errorMessage += ": " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post("/:id/entries", (req: Request, res: Response) => {
  console.log(req);

  try {
    const id = req.params.id;
    // console.log("lets fix this one", id);
    const newEntry = toAddNewEntries(req.body);
    const addedPatientEntry = PatientService.addNewEntry(id, newEntry);
    res.json(addedPatientEntry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong";
    if (error instanceof Error) {
      errorMessage += ": " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
