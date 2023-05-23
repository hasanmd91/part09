import {
  Select,
  TextField,
  Typography,
  MenuItem,
  InputLabel,
  Box,
  Button,
} from "@mui/material";
import React, { SyntheticEvent, useState } from "react";
import patientService from "../../../services/patients";
import { useParams } from "react-router-dom";
import { EntryWithoutId, HealthCheckRating } from "../../../types";

const EntryForm = () => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [healthCheckRating, setHealthCheckRating] = useState(
    HealthCheckRating.Healthy
  );
  const id = useParams() as unknown as string;

  const addNewEntry = (id: string, entry: EntryWithoutId) => {
    patientService.createEntry(id, entry);
  };

  const HandelDiagnosis = (input: string) => {
    const codes = input.split(",").map((code: string) => code.trim());
    setDiagnosisCodes(codes);
  };

  const submitHandeler = (event: SyntheticEvent) => {
    event.preventDefault();

    const newEntry: EntryWithoutId = {
      type: "HealthCheck",
      description,
      date,
      specialist,
      diagnosisCodes,
      healthCheckRating,
    };
    addNewEntry(id, newEntry);
  };

  return (
    <Box border={1} padding={2}>
      <Typography variant="h6"> New HealthCheck Entry</Typography>
      <form onSubmit={submitHandeler}>
        <TextField
          margin="dense"
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          type="date"
          margin="dense"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          margin="dense"
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <InputLabel style={{ marginTop: 10 }}>Health Check Rating</InputLabel>

        <Select
          value={healthCheckRating}
          type="number"
          margin="dense"
          label="Health check rating "
          fullWidth
          onChange={({ target }) => setHealthCheckRating(Number(target.value))}
        >
          <MenuItem value={HealthCheckRating.Healthy}>0</MenuItem>
          <MenuItem value={HealthCheckRating.LowRisk}>1</MenuItem>
          <MenuItem value={HealthCheckRating.HighRisk}>2</MenuItem>
          <MenuItem value={HealthCheckRating.CriticalRisk}>3</MenuItem>
        </Select>

        <TextField
          margin="dense"
          label="Diagnosis Code"
          fullWidth
          value={diagnosisCodes}
          onChange={({ target }) => HandelDiagnosis(target.value)}
        />
        <Button type="submit"> Add Entry</Button>
      </form>
    </Box>
  );
};

export default EntryForm;
