import React, { useState, useEffect } from "react";
import { Diagnosis } from "../../types";
import axios from "axios";
import { apiBaseUrl } from "../../constants";
import { Typography } from "@mui/material";

interface DiagnosisDetailsProps {
  code?: string;
}

const DiagnosisDetails = ({ code }: DiagnosisDetailsProps) => {
  const [diagnosis, setDiagnosis] = useState<Diagnosis | undefined>();

  useEffect(() => {
    if (code) {
      const fetchDiagnosis = () => {
        axios
          .get<Diagnosis>(`${apiBaseUrl}/diagnoses/${code}`)
          .then((res) => setDiagnosis(res.data));
      };
      fetchDiagnosis();
    }
  }, [code]);

  if (!code) {
    return null;
  }

  return (
    <Typography variant="subtitle1">
      <li>{diagnosis?.name}</li>
    </Typography>
  );
};

export default DiagnosisDetails;
