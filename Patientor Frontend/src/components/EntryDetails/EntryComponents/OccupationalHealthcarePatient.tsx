import React from "react";
import { Card, CardContent, Divider, Typography } from "@mui/material";
import { OccupationalHealthcareEntry } from "../../../types";
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
        <Divider />
        <Typography variant="subtitle1"> Sick Leave</Typography>
        <Typography display="block" variant="caption">
          Start Date:{entry.sickLeave?.startDate}
        </Typography>

        <Typography variant="caption">
          End Date: {entry.sickLeave?.endDate}
        </Typography>
        <Divider />
        <Typography display="block" variant="caption">
          Diagnose Code
        </Typography>
        {entry.diagnosisCodes?.map((code, index) => (
          <DiagnosisDetails code={code} key={index} />
        ))}
      </CardContent>
    </Card>
  );
};

export default OccupationalHealthcarePatient;
