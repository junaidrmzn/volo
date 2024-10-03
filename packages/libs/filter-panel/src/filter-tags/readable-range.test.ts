import { getReadableRange } from "./readable-range";

describe("A formatted duration should", () => {
    const testCases = [
        [
            "show time period on the same day using UTC",
            {
                start: new Date("2022-07-18T10:00:00.000Z"),
                end: new Date("2022-07-18T12:00:00.000Z"),
                useUtcTime: true,
                expectedFormattedDuration: "2022-07-18, 10:00 - 12:00 UTC",
            },
        ],
        [
            "show only start date using UTC",
            {
                start: new Date("2022-07-18T10:00:00.000Z"),
                end: undefined,
                useUtcTime: true,
                expectedFormattedDuration: "2022-07-18, 10:00 UTC - *",
            },
        ],
        [
            "show only end date using UTC",
            {
                start: undefined,
                end: new Date("2022-07-18T10:00:00.000Z"),
                useUtcTime: true,
                expectedFormattedDuration: "* - 2022-07-18, 10:00 UTC",
            },
        ],
        [
            "show time period between two different days using UTC",
            {
                start: new Date("2022-07-18T10:00:00.000Z"),
                end: new Date("2022-07-19T12:00:00.000Z"),
                useUtcTime: true,
                expectedFormattedDuration: "2022-07-18, 10:00 - 2022-07-19, 12:00 UTC",
            },
        ],
    ] as const;

    test.each(testCases)("%p", (_, options) => {
        const { start, end, useUtcTime, expectedFormattedDuration } = options;
        const formattedDuration = getReadableRange({ start, end, useUtcTime });
        expect(formattedDuration).toEqual(expectedFormattedDuration);
    });
});
