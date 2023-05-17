import React from "react";
import { OccupationalHealthcareEntry } from "../../../types";
import { Card, CardContent, Typography } from "@mui/material";
import DiagnosisDetails from "../../DiagnossisDetails/DiagnosisDetails";

interface OOccupationalHealthcarePatientProps {
  entry: OccupationalHealthcareEntry;
}

const OccupationalHealthcarePatient: React.FC<
  OOccupationalHealthcarePatientProps
> = ({ entry }) => {
  return (
    <Card variant="elevation" style={{ marginTop: "1rem" }}>
      <CardContent>
        <Typography> {entry.date} </Typography>
        <Typography> {entry.description} </Typography>
        <Typography> Diagnosed by {entry.specialist} </Typography>
        {entry.diagnosisCodes?.map((code) => (
          <DiagnosisDetails code={code} />
        ))}
      </CardContent>
    </Card>
  );
};

export default OccupationalHealthcarePatient;
