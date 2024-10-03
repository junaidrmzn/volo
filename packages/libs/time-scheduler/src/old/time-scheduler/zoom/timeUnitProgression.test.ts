import { progressTimeUnit } from "./timeUnitProgression";

describe("progressTimeUnit", () => {
    test("calculates right offset for hours", () => {
        const { nextStartDate, nextLeftOffset } = progressTimeUnit({
            startDate: new Date("1997-11-01 00:00:00"),
            leftOffset: 1200,
            sizeOfOneMinuteInPx: 0.01,
            timeUnit: "hours",
            unitOffset: 3,
        });

        expect(nextLeftOffset).toEqual(1.8);

        const expectedDate = new Date("1998-01-23 05:00:00");
        expect(nextStartDate.toDateString()).toEqual(expectedDate.toDateString());
        expect(nextStartDate.toTimeString()).toEqual(expectedDate.toTimeString());
    });

    test("calculates right offset for days", () => {
        const { nextStartDate, nextLeftOffset } = progressTimeUnit({
            startDate: new Date("1997-11-01 00:00:00"),
            leftOffset: 1200,
            sizeOfOneMinuteInPx: 0.01,
            timeUnit: "days",
            unitOffset: 3,
        });

        expect(nextLeftOffset).toEqual(48);
        const expectedDate = new Date("1998-01-20 00:00:00");
        expect(nextStartDate.toDateString()).toEqual(expectedDate.toDateString());
        expect(nextStartDate.toTimeString()).toEqual(expectedDate.toTimeString());
    });

    test("calculates right offset for months", () => {
        const { nextStartDate, nextLeftOffset } = progressTimeUnit({
            startDate: new Date("1997-11-01 00:00:00"),
            leftOffset: 1200,
            sizeOfOneMinuteInPx: 0.01,
            timeUnit: "months",
            unitOffset: 3,
        });

        expect(Math.ceil(nextLeftOffset)).toEqual(1647);
        const expectedDate = new Date("1997-10-01 00:00:00");
        expect(nextStartDate.toDateString()).toEqual(expectedDate.toDateString());
        expect(nextStartDate.toTimeString()).toEqual(expectedDate.toTimeString());
    });
});
