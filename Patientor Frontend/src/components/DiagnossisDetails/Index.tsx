import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography } from "@mui/material";
import { Diagnosis } from "../../types";
import { apiBaseUrl } from "../../constants";

interface DiagnosisDetailsProps {
  code?: string;
}

const DiagnosisDetails = ({ code }: DiagnosisDetailsProps) => {
  const [diagnosis, setDiagnosis] = useState<Diagnosis>();

  useEffect(() => {
    if (code) {
      const fetchDiagnosis = async () => {
        const response = await axios.get<Diagnosis>(
          `${apiBaseUrl}/diagnoses/${code}`
        );
        setDiagnosis(response.data);
      };
      fetchDiagnosis();
    }
  }, [code]);

  if (!code) {
    return null;
  }

  return (
    <Typography display="block" variant="caption">
      {code} {diagnosis?.name}
    </Typography>
  );
};

export default DiagnosisDetails;
