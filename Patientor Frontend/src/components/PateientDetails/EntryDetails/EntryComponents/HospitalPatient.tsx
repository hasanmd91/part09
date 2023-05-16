import React from "react";
import { HospitalEntry } from "../../../../types";
import { Card, CardContent, Typography } from "@mui/material";
import DiagnosisDetails from "../../../DiagnossisDetails/DiagnosisDetails";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

interface HospitalPatientProps {
  entry: HospitalEntry;
}

const HospitalPatient: React.FC<HospitalPatientProps> = ({ entry }) => {
  return (
    <Card variant="outlined" style={{ marginTop: "2rem" }}>
      <CardContent>
        <Typography>
          {" "}
          {entry.date} <LocalHospitalIcon />
        </Typography>
        <Typography> {entry.description} </Typography>
        <Typography>
          Discharged: {entry.discharge.date} {entry.discharge.criteria}
        </Typography>
        <Typography> Diagnosed by {entry.specialist} </Typography>
        {entry.diagnosisCodes?.map((code) => (
          <DiagnosisDetails code={code} />
        ))}
      </CardContent>
    </Card>
  );
};

export default HospitalPatient;
