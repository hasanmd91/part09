import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import FavoriteSharpIcon from "@mui/icons-material/FavoriteSharp";
import { HealthCheckEntry } from "../../../types";
import DiagnosisDetails from "../../DiagnossisDetails/Index";
interface HealthCheckPatientProps {
  entry: HealthCheckEntry;
}

const HealthCheckPatient: React.FC<HealthCheckPatientProps> = ({ entry }) => {
  const getIconColor = (rating: number) => {
    if (rating === 0) {
      return "green";
    } else if (rating === 1) {
      return "yellow";
    } else if (rating === 2) {
      return "orange";
    } else if (rating === 3) {
      return "red";
    } else {
      return "black";
    }
  };

  const ratingColor = getIconColor(entry?.healthCheckRating);
  return (
    <Card variant="elevation" style={{ marginTop: "1rem" }}>
      <CardContent>
        <Typography>
          <strong>Entry Type:</strong> {entry?.type}
        </Typography>
        <Typography> {entry?.date} </Typography>
        <Typography> {entry?.description} </Typography>
        <Typography>
          Rating: <FavoriteSharpIcon style={{ color: ratingColor }} />
        </Typography>
        <Typography> Diagnosed by {entry?.specialist} </Typography>
        <Typography variant="caption"> Diagnose Code:</Typography>
        {entry?.diagnosisCodes?.map((code) => (
          <DiagnosisDetails code={code} key={code} />
        ))}
      </CardContent>
    </Card>
  );
};

export default HealthCheckPatient;
