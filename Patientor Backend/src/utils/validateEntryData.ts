import {
  Diagnosis,
  EntryType,
  HealthCheckRating,
  Discharge,
  EntryWithoutId,
} from "../type";

export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: unknown): boolean => {
  return Boolean(Date.parse(date as string));
};

const isvalidType = (type: unknown): type is EntryType => {
  return (
    type === "HealthCheck" ||
    type === "OccupationalHealthcare" ||
    type === "Hospital"
  );
};

const isValidHealthCheckRating = (
  rating: unknown
): rating is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(rating as HealthCheckRating);
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error("Incorrect or missing description:" + description);
  }
  return description;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error("Incorrect or missing specialist:" + specialist);
  }
  return specialist;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis["code"]> => {
  if (Array.isArray(object)) {
    return object as Array<Diagnosis["code"]>;
  }
  return [];
};

const parseType = (type: unknown) => {
  if (!type || !isvalidType(type)) {
    throw new Error("Incorrect or missing type:" + type);
  }
  return type;
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (
    !discharge ||
    typeof discharge !== "object" ||
    !("date" in discharge) ||
    !("criteria" in discharge) ||
    !isDate(discharge.date) ||
    typeof discharge.criteria !== "string"
  ) {
    throw new Error("Incorrect or missing date: " + discharge);
  }
  return discharge as Discharge;
};

const parseHealthCheckRating = (rating: unknown) => {
  if (!rating || !isValidHealthCheckRating(rating)) {
    throw new Error("Incorrect or missing rating:" + rating);
  }
  return rating;
};

const parseEmployerName = (employerName: unknown): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error("Incorrect or missing employerName:" + employerName);
  }
  return employerName;
};

const NewBaseEntry = (object: unknown) => {
  if (!object || typeof object !== "object") {
    throw new Error("incorect or missing data");
  }

  if (
    "description" in object &&
    "date" in object &&
    "specialist" in object &&
    "diagnosisCodes" in object &&
    "type" in object
  ) {
    const baseEntry = {
      description: parseDescription(object.description),
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist),
      diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
      type: parseType(object.type),
    };

    return baseEntry;
  }

  throw new Error(" Incorrect data some fields are missing ");
};

const toAddNewEntries = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== "object") {
    throw new Error("incorect or missing data");
  }
  const BaseEntry = NewBaseEntry(object);

  if (
    "healthCheckRating" in object &&
    "discharge" in object &&
    "employerName" in object
  )
    switch (BaseEntry.type) {
      case "HealthCheck":
        return {
          ...BaseEntry,
          healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
        };

      case "Hospital":
        return {
          ...BaseEntry,
          discharge: parseDischarge(object.discharge),
        };

      case "OccupationalHealthcare":
        const newEntry = {
          ...BaseEntry,
          employerName: parseEmployerName(object.employerName),
        };

        return newEntry;
    }

  throw new Error("Invalid entry data");
};

export default toAddNewEntries;
