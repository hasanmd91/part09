import React from "react";
import { HealthCheckEntry } from "../../../types";
import { Card, CardContent, Typography } from "@mui/material";
import DiagnosisDetails from "../../DiagnossisDetails/Index";
import FavoriteSharpIcon from "@mui/icons-material/FavoriteSharp";
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
        <Typography> {entry?.date} </Typography>
        <Typography> {entry?.description} </Typography>
        <Typography>
          <FavoriteSharpIcon style={{ color: ratingColor }} />{" "}
        </Typography>
        <Typography> Diagnosed by {entry?.specialist} </Typography>
        {entry?.diagnosisCodes?.map((code) => (
          <DiagnosisDetails code={code} />
        ))}
      </CardContent>
    </Card>
  );
};

export default HealthCheckPatient;
