import React from "react";
import { Alert } from "@mui/material";

interface ErrorProps {
  error: string;
}

const Error = ({ error }: ErrorProps) => {
  return (
    <Alert severity="error" sx={{ marginBottom: 1 }}>
      {error}
    </Alert>
  );
};

export default Error;
