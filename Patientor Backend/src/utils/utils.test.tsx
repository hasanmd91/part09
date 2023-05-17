import {
  parseHealthCheckRating,
  isValidHealthCheckRating,
  parseEmployerName,
  parseSickLeave,
} from "./validateEntryData";

describe("should validate entry data", () => {
  it(" valid heartrating", () => {
    expect(isValidHealthCheckRating(1)).toBeTruthy();
    expect(isValidHealthCheckRating(2)).toBeTruthy();
    expect(isValidHealthCheckRating(3)).toBeTruthy();
    expect(isValidHealthCheckRating(0)).toBeTruthy();
    expect(isValidHealthCheckRating(4)).toBeFalsy();
  });

  it("parse healthCheckRating", () => {
    expect(parseHealthCheckRating(1)).toBe(1);
    expect(parseHealthCheckRating(2)).toBe(2);
    expect(parseHealthCheckRating(3)).toBe(3);
    expect(parseHealthCheckRating(0)).toBe(0);
    expect(() => parseHealthCheckRating(null)).toThrowError();
    expect(() => parseHealthCheckRating(undefined)).toThrowError();
    expect(() => parseHealthCheckRating(5)).toThrowError();
    expect(() => parseHealthCheckRating("null")).toThrowError();
  });

  it("parse employerName", () => {
    expect(parseEmployerName("hasan")).toBe("hasan");
    expect(parseEmployerName("abida")).toBe("abida");
    expect(parseEmployerName("ilhaan")).toBe("ilhaan");
    expect(() => parseEmployerName("")).toThrowError();
  });

  it("parse sickleave", () => {
    expect(
      parseSickLeave({ startDate: "2015-01-02", endDate: "2015-01-02" })
    ).toEqual({ startDate: "2015-01-02", endDate: "2015-01-02" });

    expect(() =>
      parseSickLeave({ startDae: "2015-02", endDate: "2015-01-02" })
    ).toThrowError();

    expect(() =>
      parseSickLeave({ startDate: "2015-02", endDat: "2015-01-02" })
    ).toThrowError();

    expect(() =>
      parseSickLeave({ startDate: "", endDate: "2015-01-02" })
    ).toThrowError();

    expect(() => parseSickLeave({})).toThrowError();
  });
});
