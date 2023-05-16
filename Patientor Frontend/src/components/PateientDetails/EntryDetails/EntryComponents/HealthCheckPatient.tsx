import React from "react";
import { HealthCheckEntry } from "../../../../types";
import { Card, CardContent, Typography } from "@mui/material";
import DiagnosisDetails from "../../../DiagnossisDetails/DiagnosisDetails";

interface HealthCheckPatientProps {
  entry: HealthCheckEntry;
}

const HealthCheckPatient: React.FC<HealthCheckPatientProps> = ({ entry }) => {
  return (
    <Card variant="outlined" style={{ marginTop: "2rem" }}>
      <CardContent>
        <Typography> {entry.date} </Typography>
        <Typography> {entry.description} </Typography>
        <Typography> {entry.healthCheckRating} </Typography>
        <Typography> Diagnosed by {entry.specialist} </Typography>
        {entry.diagnosisCodes?.map((code) => (
          <DiagnosisDetails code={code} />
        ))}
      </CardContent>
    </Card>
  );
};

export default HealthCheckPatient;
