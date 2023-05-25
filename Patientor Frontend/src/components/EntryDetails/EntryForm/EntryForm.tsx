import {
  Select,
  TextField,
  Typography,
  MenuItem,
  InputLabel,
  Box,
  Button,
} from "@mui/material";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patientService from "../../../services/patients";
import { Diagnosis, EntryWithoutId, HealthCheckRating } from "../../../types";
import diagnosisService from "../../../services/diagnosis";
import Error from "../../Error/Error";

interface EntryFormProps {
  onEntryAdded: () => Promise<void>;
}

const EntryForm = ({ onEntryAdded }: EntryFormProps) => {
  const [entryType, setEntryType] = useState("HealthCheck");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<
    Array<Diagnosis["code"]>
  >([]);
  const [healthCheckRating, setHealthCheckRating] = useState(
    HealthCheckRating.Healthy
  );

  const [employerName, setEmployerName] = useState<string>("");
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState<string>("");
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState<string>("");
  const [dischargeDate, setDischargeDate] = useState<string>("");
  const [criteria, setCriteria] = useState<string>("");
  const [diagnosis, setDiagnosis] = useState<Diagnosis[]>([]);
  const [error, setError] = useState("");
  console.log(setError);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    diagnosisService
      .getAll()
      .then((data) => setDiagnosis(data))
      .catch((error) => console.log(error));
  }, []);

  const clear = (): void => {
    setEntryType("HealthCheck");
    setDescription("");
    setDate("");
    setSpecialist("");
    setDiagnosisCodes([]);
    setHealthCheckRating(HealthCheckRating.Healthy);
    setEmployerName("");
    setSickLeaveEndDate("");
    setSickLeaveStartDate("");
    setDischargeDate("");
    setCriteria("");
  };

  const addNewEntry = async (id: string | undefined, entry: EntryWithoutId) => {
    if (!id) return;
    try {
      await patientService.createEntry(id, entry);
      onEntryAdded().catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };

  const submitHandeler = (event: SyntheticEvent) => {
    event.preventDefault();

    let newEntry: EntryWithoutId;
    if (entryType === "HealthCheck") {
      newEntry = {
        type: entryType,
        description,
        date,
        specialist,
        diagnosisCodes,
        healthCheckRating,
      };
    } else if (entryType === "OccupationalHealthcare") {
      newEntry = {
        type: entryType,
        description,
        date,
        specialist,
        diagnosisCodes,
        employerName,
        sickLeave: {
          startDate: sickLeaveStartDate,
          endDate: sickLeaveEndDate,
        },
      };
    } else if (entryType === "Hospital") {
      newEntry = {
        type: entryType,
        description,
        date,
        specialist,
        diagnosisCodes,
        discharge: {
          date: dischargeDate,
          criteria: criteria,
        },
      };
    } else {
      return;
    }
    addNewEntry(id, newEntry).catch((error) => console.log(error));
    clear();
  };

  return (
    <Box>
      {error && <Error error={""} />}
      <Box border={1} padding={2}>
        <Typography variant="h6"> New HealthCheck Entry</Typography>
        <form onSubmit={submitHandeler}>
          <InputLabel style={{ marginTop: 10 }}>Entry Type</InputLabel>
          <Select
            value={entryType}
            margin="dense"
            label="Entry Type"
            fullWidth
            onChange={({ target }) => setEntryType(target.value)}
          >
            <MenuItem value="HealthCheck">Health Check</MenuItem>
            <MenuItem value="OccupationalHealthcare">
              Occupational Healthcare
            </MenuItem>
            <MenuItem value="Hospital">Hospital</MenuItem>
          </Select>
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

          <InputLabel> Diagnosis Code</InputLabel>
          {Array.isArray(diagnosis) && diagnosis.length > 0 && (
            <Select
              multiple
              margin="dense"
              label="Diagnosis Code"
              fullWidth
              value={diagnosisCodes}
              onChange={({ target }) => {
                if (Array.isArray(target.value)) {
                  setDiagnosisCodes(target.value);
                } else {
                  setDiagnosisCodes([target.value]);
                }
              }}
            >
              <MenuItem value="" disabled>
                Select Diagnosis Code
              </MenuItem>
              {diagnosis?.map((diagnose) => (
                <MenuItem value={diagnose.code} key={diagnose.code}>
                  {diagnose.code}
                </MenuItem>
              ))}
            </Select>
          )}

          {entryType === "HealthCheck" && (
            <>
              <InputLabel style={{ marginTop: 10 }}>
                Health Check Rating
              </InputLabel>
              <Select
                value={healthCheckRating}
                type="number"
                margin="dense"
                label="Health check rating "
                fullWidth
                onChange={({ target }) =>
                  setHealthCheckRating(Number(target.value))
                }
              >
                <MenuItem value={HealthCheckRating.Healthy}>0</MenuItem>
                <MenuItem value={HealthCheckRating.LowRisk}>1</MenuItem>
                <MenuItem value={HealthCheckRating.HighRisk}>2</MenuItem>
                <MenuItem value={HealthCheckRating.CriticalRisk}>3</MenuItem>
              </Select>
            </>
          )}

          {entryType === "OccupationalHealthcare" && (
            <>
              <TextField
                margin="dense"
                label="Employer name "
                fullWidth
                value={employerName}
                onChange={({ target }) => setEmployerName(target.value)}
              />
              <InputLabel>Sick leave </InputLabel>
              <TextField
                type="date"
                margin="dense"
                fullWidth
                value={sickLeaveStartDate}
                onChange={({ target }) => setSickLeaveStartDate(target.value)}
              />
              <TextField
                type="date"
                margin="dense"
                fullWidth
                value={sickLeaveEndDate}
                onChange={({ target }) => setSickLeaveEndDate(target.value)}
              />
            </>
          )}
          {entryType === "Hospital" && (
            <>
              <InputLabel> Discharge Date</InputLabel>
              <TextField
                type="date"
                margin="dense"
                fullWidth
                value={dischargeDate}
                onChange={({ target }) => setDischargeDate(target.value)}
              />
              <TextField
                label="Criteria"
                type="text"
                margin="dense"
                fullWidth
                value={criteria}
                onChange={({ target }) => setCriteria(target.value)}
              />
            </>
          )}
          <Box
            marginTop={1}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Button
              variant="contained"
              color="primary"
              size="medium"
              onClick={() => clear()}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              size="large"
            >
              Add Entry
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default EntryForm;
