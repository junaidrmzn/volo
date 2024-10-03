import { timeRange } from "./timeUtils";

describe("timeRange", () => {
    test("calculates correct time range for months", () => {
        const startDate = new Date("2022-01-01 00:00:00.000");
        const endDate = new Date("2022-10-01 00:00:00.000");
        const result = timeRange(startDate, endDate, "months");

        expect(result.length).toBe(10);
        expect(result[0]?.getTime()).toBe(startDate.getTime());
        expect(result[result.length - 1]?.getTime()).toBe(endDate.getTime());
    });
    test("calculates correct time range for days", () => {
        const startDate = new Date("2022-01-01 00:00:00.000");
        const endDate = new Date("2022-02-01 00:00:00.000");
        const result = timeRange(startDate, endDate, "days");

        expect(result.length).toBe(32);
        expect(result[0]?.getTime()).toBe(startDate.getTime());
        expect(result[result.length - 1]?.getTime()).toBe(endDate.getTime());
    });
    test("calculates correct time range for hours", () => {
        const startDate = new Date("2022-01-01 00:00:00");
        const endDate = new Date("2022-01-01 12:00:00");
        const result = timeRange(startDate, endDate, "hours");

        expect(result.length).toBe(13);
        expect(result[0]?.getTime()).toBe(startDate.getTime());
        expect(result[result.length - 1]?.getTime()).toBe(endDate.getTime());
    });
    test("calculates correct time range for quarter hours", () => {
        const startDate = new Date("2022-01-01 00:00:00");
        const endDate = new Date("2022-01-01 03:00:00");
        const result = timeRange(startDate, endDate, "quarterHours");
        expect(result.length).toBe(13);
        expect(result[0]?.getTime()).toBe(startDate.getTime());
        expect(result[result.length - 1]?.getTime()).toBe(endDate.getTime());
    });
    test("calculates correct time range for minutes", () => {
        const startDate = new Date("2022-01-01 00:00:00");
        const endDate = new Date("2022-01-01 01:00:00");
        const result = timeRange(startDate, endDate, "minutes");

        expect(result.length).toBe(61);
        expect(result[0]?.getTime()).toBe(startDate.getTime());
        expect(result[result.length - 1]?.getTime()).toBe(endDate.getTime());
    });
});
