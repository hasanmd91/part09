import React from "react";
import { HospitalEntry } from "../../../types";
import { Card, CardContent, Typography } from "@mui/material";
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
          {entry.date} <LocalHospitalIcon />
        </Typography>
        <Typography> {entry.description} </Typography>
        <Typography>
          Discharged: {entry.discharge.date} {entry.discharge.criteria}
        </Typography>
        <Typography> Diagnosed by {entry.specialist} </Typography>
        {entry.diagnosisCodes?.map((code, index) => (
          <DiagnosisDetails code={code} key={index} />
        ))}
      </CardContent>
    </Card>
  );
};

export default HospitalPatient;
