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
      const fetchDiagnosis = async () => {
        try {
          const response = await axios.get<Diagnosis>(
            `${apiBaseUrl}/diagnoses/${code}`
          );
          setDiagnosis(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchDiagnosis().catch((error) => console.log(error));
    }
  }, [code]);

  if (!code) {
    return null;
  }

  return (
    <Typography variant="subtitle1">
      {diagnosis?.code}: {diagnosis?.name}
    </Typography>
  );
};

export default DiagnosisDetails;
