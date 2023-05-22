import { TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { SyntheticEvent, useState } from "react";
import patientService from "../../../services/patients";
import { useParams } from "react-router-dom";
import { Entry, HealthCheckRating } from "../../../types";

const EntryForm = () => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(
    HealthCheckRating.Healthy
  );
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [error, setError] = useState("");

  const id = useParams();

  const addNewEntry = (id: string, entry: Entry) => {
    try {
      patientService.createEntry(id, entry);
    } catch (error) {
      console.log(error);
    }
  };

  const submitHandeler = (event: SyntheticEvent) => {
    event.preventDefault();
    const newEntry: Entry = {
      description,
      date,
      specialist,
      healthCheckRating,
      diagnosisCodes,
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
          margin="dense"
          label="Date"
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
        <TextField
          margin="dense"
          label="Health Check Ratinng"
          fullWidth
          value={healthChckRating}
          onChange={({ target }) => setHealthCheckRating(target.value)}
        />
        <TextField
          margin="dense"
          label="Diagnosis Code"
          fullWidth
          value={diagnosisCodes}
          onChange={({ target }) => setDiagnosisCodes(target.value)}
        />
      </form>
    </Box>
  );
};

export default EntryForm;
