import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import {
  Box,
  Button,
  Divider,
  Container,
  Typography,
  CircularProgress,
} from "@mui/material";

import { apiBaseUrl } from "./constants";
import { NonSensetivePatient } from "./types";

import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";
import PatientDetails from "./components/PateientDetails";

const App = () => {
  const [patients, setPatients] = useState<NonSensetivePatient[]>([]);

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/patients`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
    void fetchPatientList();
  }, []);

  if (patients.length < 0) {
    return (
      <Box sx={{ display: "flex", justifyContent: "space-around" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className="App">
      <Router>
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route
              path="/"
              element={
                <PatientListPage
                  patients={patients}
                  setPatients={setPatients}
                />
              }
            />
            <Route path="PatientDetails/:id" element={<PatientDetails />} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
