import {
  SickLeave,
  Diagnosis,
  EntryType,
  HealthCheckRating,
  Discharge,
  EntryWithoutId,
} from "../type";

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

export const isValidHealthCheckRating = (
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

const parseCriteria = (criteria: unknown): string => {
  if (!criteria || !isString(criteria)) {
    throw new Error("Incorrect or missing criteria:" + criteria);
  }
  return criteria;
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

export const parseSickLeave = (sickLeave: unknown): SickLeave => {
  if (!sickLeave || typeof sickLeave !== "object") {
    throw new Error("Incorrect or missing sickLeave");
  }
  if ("startDate" in sickLeave && "endDate" in sickLeave) {
    return {
      startDate: parseDate(sickLeave.startDate),
      endDate: parseDate(sickLeave.endDate),
    };
  }
  throw new Error("Incorrect or missing sickLeave:" + sickLeave);
};

export const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge || typeof discharge !== "object") {
    throw new Error("Incorrect or missing discharge");
  }

  if ("criteria" in discharge && "date" in discharge) {
    return {
      date: parseDate(discharge.date),
      criteria: parseCriteria(discharge.criteria),
    };
  }

  throw new Error("Incorrect or missing discharge:" + discharge);
};

export const parseHealthCheckRating = (rating: unknown) => {
  if (rating !== 0 && (!rating || !isValidHealthCheckRating(rating))) {
    throw new Error("Incorrect or missing rating:" + rating);
  }
  return rating;
};

export const parseEmployerName = (employerName: unknown): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error("Incorrect or missing employerName:" + employerName);
  }
  return employerName;
};

const NewBaseEntry = (object: unknown) => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorect or missing data");
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
    throw new Error("Incorect or missing data");
  }
  const BaseEntry = NewBaseEntry(object);
  {
    switch (BaseEntry.type) {
      case "HealthCheck":
        if ("healthCheckRating" in object) {
          return {
            ...BaseEntry,
            healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
          };
        }
        break;

      case "Hospital":
        if ("discharge" in object) {
          return {
            ...BaseEntry,
            discharge: object.discharge as Discharge,
          };
        }
        break;

      case "OccupationalHealthcare":
        if ("employerName" in object && "sickLeave" in object) {
          return {
            ...BaseEntry,
            employerName: parseEmployerName(object.employerName),
            sickLeave: object.sickLeave as SickLeave,
          };
        }

        if ("employerName" in object) {
          return {
            ...BaseEntry,
            employerName: parseEmployerName(object.employerName),
          };
        }

        if ("sickLeave" in object) {
          return {
            ...BaseEntry,
            sickLeave: parseSickLeave(object.sickLeave),
          };
        }
        break;
    }

    throw new Error("Invalid entry data");
  }
};

export default toAddNewEntries;
