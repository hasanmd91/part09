import React from "react";
import { OccupationalHealthcareEntry } from "../../../types";
import { Card, CardContent, Typography } from "@mui/material";
import DiagnosisDetails from "../../DiagnossisDetails/Index";

interface OOccupationalHealthcarePatientProps {
  entry: OccupationalHealthcareEntry;
}

const OccupationalHealthcarePatient: React.FC<
  OOccupationalHealthcarePatientProps
> = ({ entry }) => {
  return (
    <Card variant="elevation" style={{ marginTop: "1rem" }}>
      <CardContent>
        <Typography>
          <strong>Entry Type:</strong> {entry?.type}
        </Typography>
        <Typography> {entry.date} </Typography>
        <Typography> {entry.description} </Typography>
        <Typography> Diagnosed by {entry.specialist} </Typography>
        {entry.diagnosisCodes?.map((code, index) => (
          <DiagnosisDetails code={code} key={index} />
        ))}
      </CardContent>
    </Card>
  );
};

export default OccupationalHealthcarePatient;
