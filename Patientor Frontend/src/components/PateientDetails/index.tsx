import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, CircularProgress } from "@mui/material";
import { Patient } from "../../types";
import patientService from "../../services/patients";
import EntryDetails from "../EntryDetails/index";
import EntryForm from "../EntryDetails/EntryForm/EntryForm";
import Error from "../../components/Error/Error";
import ErrorHandeler from "../../utils";

const PatientDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient>();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchPatientData = async (id: string | undefined) => {
    try {
      if (!id) return;
      const patient: Patient = await patientService.getPatientDetails(id);
      setPatient(patient);
      setIsLoading(false);
    } catch (e: unknown) {
      const err = ErrorHandeler(e);
      setError(err);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchPatientData(id).catch((e) => {
      setError(e);
      setIsLoading(false);
    });
  }, [id]);

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box mt={3}>
      {error && <Error error={error} />}
      <Box>
        <Typography variant="h3">{patient?.name} </Typography>
        <Typography variant="subtitle1">
          <strong>SSH: </strong> {patient?.ssn}{" "}
        </Typography>
        <Typography variant="subtitle1">
          <strong> Occupation:</strong> {patient?.occupation}
        </Typography>
        <Typography variant="subtitle1">
          <strong>Date of Birth: </strong>
          {patient?.dateOfBirth}
        </Typography>
        <Typography variant="subtitle1">
          <strong>Gender:</strong> {patient?.gender}{" "}
        </Typography>
      </Box>
      <EntryForm onEntryAdded={() => fetchPatientData(id)} />
      {patient?.entries?.map((entry) => (
        <EntryDetails entry={entry} key={entry.id} />
      ))}
    </Box>
  );
};

export default PatientDetails;
