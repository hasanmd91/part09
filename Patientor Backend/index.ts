import cors from "cors";
import express from "express";
import patientsRouter from "./src/routes/PatientsRouter";
import diagnoseRouter from "./src/routes/DiagnosesRouter";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

app.get("/", (_req, res) => {
  res.send("pong");
});

app.use("/api/patients", patientsRouter);
app.use("/api/diagnoses", diagnoseRouter);

app.listen(PORT, () => {
  console.log(`Server running on port number  ${PORT}`);
});
("");
