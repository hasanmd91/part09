import React from "react";
import { Entry } from "../../types";
import { Box, Typography } from "@mui/material";
import DiagnosisDetails from "./DiagnosisDetails";

interface EntryDetailsProps {
  entry: Entry;
}

const EntryDetails: React.FC<EntryDetailsProps> = ({ entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntry entry={entry} />;
    case "HealthCheck":
      return <HealthCheckEntry entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcare entry={entry} />;
  }
};

const HospitalEntry: React.FC<EntryDetailsProps> = ({ entry }) => {
  return (
    <Box
      m={2}
      p={2}
      borderTop={1}
      borderRight={1}
      borderBottom={1}
      borderLeft={1}
      borderColor="black"
    >
      <Typography> {entry.date} </Typography>
      <Typography> {entry.description} </Typography>
      <Typography> Diagnose by {entry.specialist} </Typography>
      {entry.diagnosisCodes?.map((code) => (
        <DiagnosisDetails code={code} />
      ))}
    </Box>
  );
};

const HealthCheckEntry: React.FC<EntryDetailsProps> = ({ entry }) => {
  return (
    <Box
      m={2}
      p={2}
      borderTop={1}
      borderRight={1}
      borderBottom={1}
      borderLeft={1}
      borderColor="black"
    >
      <Typography> {entry.date} </Typography>
      <Typography> {entry.description} </Typography>
      <Typography> Diagnose by {entry.specialist} </Typography>
      {entry.diagnosisCodes?.map((code) => (
        <DiagnosisDetails code={code} />
      ))}
    </Box>
  );
};

const OccupationalHealthcare: React.FC<EntryDetailsProps> = ({ entry }) => {
  return (
    <Box
      m={2}
      p={2}
      borderTop={1}
      borderRight={1}
      borderBottom={1}
      borderLeft={1}
      borderColor="black"
    >
      <Typography> {entry.date} </Typography>
      <Typography> {entry.description} </Typography>
      <Typography> Diagnose by {entry.specialist} </Typography>
      {entry.diagnosisCodes?.map((code) => (
        <DiagnosisDetails code={code} />
      ))}
    </Box>
  );
};

export default EntryDetails;
