import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Patient } from "../../types";
import patientService from "../../services/patients";
import { Box, Typography } from "@mui/material";
import EntryDetails from "../EntryDetails/index";
import EntryForm from "../EntryDetails/EntryForm/EntryForm";

const PatientDetails = () => {
  const params = useParams<Record<string, string | undefined>>();
  const { id } = params;

  const [patient, setPatient] = useState<Patient>();

  useEffect(() => {
    const fetcchOnepatinet = async (id: string) => {
      const patient = await patientService.getPatientDetails(id);
      setPatient(patient);
    };
    fetcchOnepatinet(id as string);
  }, [id]);

  return (
    <Box mt={3}>
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
      <EntryForm />
      {patient?.entries?.map((entry) => (
        <EntryDetails entry={entry} key={entry.id} />
      ))}
    </Box>
  );
};

export default PatientDetails;
