import { formatDuration } from "../date";

const testCases: [number, string][] = [
    [0, "0 s"],
    [60, "1 min"],
    [3600, "1 h"],
    [4632, "1 h 17 min 12 s"],
];

test.each(testCases)("formatDuration correctly formats a duration of %s seconds", (input, output) => {
    expect(formatDuration(input)).toEqual(output);
});
