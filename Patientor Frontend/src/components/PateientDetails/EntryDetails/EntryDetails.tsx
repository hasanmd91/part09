import React from "react";
import { Entry } from "../../../types";
import HospitalPatient from "./EntryComponents/HospitalPatient";
import HealthCheckPatient from "./EntryComponents/HealthCheckPatient";
import OccupationalHealthcarePatient from "./EntryComponents/OccupationalHealthcarePatient";

interface EntryDetailsProps {
  entry: Entry;
}

const EntryDetails: React.FC<EntryDetailsProps> = ({ entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalPatient entry={entry} />;
    case "HealthCheck":
      return <HealthCheckPatient entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcarePatient entry={entry} />;
  }
};

export default EntryDetails;
