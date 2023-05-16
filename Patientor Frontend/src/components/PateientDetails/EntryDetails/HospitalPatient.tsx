import React from "react";
import { HospitalEntry } from "../../../types";
import { Box, Typography } from "@mui/material";
import DiagnosisDetails from "../../DiagnossisDetails/DiagnosisDetails";

interface HospitalPatientProps {
  entry: HospitalEntry;
}

const HospitalPatient: React.FC<HospitalPatientProps> = ({ entry }) => {
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

export default HospitalPatient;
