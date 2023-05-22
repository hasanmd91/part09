import {
  TextField,
  Typography,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { SyntheticEvent, useState } from "react";
import patientService from "../../../services/patients";
import { useParams } from "react-router-dom";
import { EntryWithoutId, HealthCheckRating } from "../../../types";

const EntryForm = () => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(
    HealthCheckRating.Healthy
  );

  const [error, setError] = useState("");
  const id = useParams() as unknown as string;

  const addNewEntry = (id: string, entry: EntryWithoutId) => {
    patientService.createEntry(id, entry);
  };

  const handelHealthCheckRating = () => {};

  const HandelDiagnosis = () => {};

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
          fullWidth
          value={healthCheckRating}
          onChange={handelHealthCheckRating}
        ></Select>

        <TextField
          margin="dense"
          label="Diagnosis Code"
          fullWidth
          value={diagnosisCodes}
          onChange={HandelDiagnosis}
        />
      </form>
    </Box>
  );
};

export default EntryForm;
