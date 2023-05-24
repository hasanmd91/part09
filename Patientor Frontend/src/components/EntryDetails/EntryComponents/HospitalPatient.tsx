import React from "react";
import { HospitalEntry } from "../../../types";
import { Card, CardContent, Divider, Typography } from "@mui/material";
import DiagnosisDetails from "../../DiagnossisDetails/Index";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

interface HospitalPatientProps {
  entry: HospitalEntry;
}

const HospitalPatient: React.FC<HospitalPatientProps> = ({ entry }) => {
  return (
    <Card variant="elevation" style={{ marginTop: "1rem" }}>
      <CardContent>
        <Typography>
          <strong>Entry Type:</strong> {entry?.type}
        </Typography>
        <Typography>
          {entry.date} <LocalHospitalIcon />
        </Typography>
        <Typography> {entry.description} </Typography>
        <Typography>Discharged Date: {entry.discharge.date}</Typography>
        <Typography>Discharged Criteria :{entry.discharge.criteria}</Typography>
        <Typography> Diagnosed by {entry.specialist} </Typography>
        <Divider />
        <Typography variant="caption"> Diagnose Code:</Typography>
        {entry.diagnosisCodes?.map((code) => (
          <DiagnosisDetails code={code} key={code} />
        ))}
      </CardContent>
    </Card>
  );
};

export default HospitalPatient;
