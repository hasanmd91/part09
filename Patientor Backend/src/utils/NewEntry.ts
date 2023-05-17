import {
  Diagnosis,
  EntryWithoutId,
  EntryType,
  HealthCheckRating,
} from "../type";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
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

const toAddNewEntries = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== "object") {
    throw new Error("incorect or missing data");
  }

  if (
    "description" in object &&
    "date" in object &&
    "specialist" in object &&
    "diagnosisCodes" in object &&
    "type" in object &&
    "healthCheckRating" in object &&
    "employerName" in object
  ) {
    const newEntry = {
      description: parseDescription(object.description),
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist),
      diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
      type: parseType(object.type),
      healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
      employerName: parseEmployerName(object.employerName),
    };

    return newEntry;
  }

  throw new Error(" Incorrect data some fields are missing ");
};

export default toAddNewEntries;
