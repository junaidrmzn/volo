import { joinNullableStrings } from "./text-manipulation";

describe("joinNullableStrings", () => {
    test("it joins strings with separator, omitting null, undefined, and empty string", () => {
        expect(joinNullableStrings(["foo", undefined, "bar"], " - ")).toEqual("foo - bar");
        expect(joinNullableStrings([undefined, "foo", undefined, null, "", "bar", null], " - ")).toEqual("foo - bar");
    });

    test("it defaults to a single space as a separator", () => {
        expect(joinNullableStrings(["foo", undefined, "bar"])).toEqual("foo bar");
    });

    test("when there are no non-empty strings, it returns an empty string", () => {
        expect(joinNullableStrings([])).toEqual("");
        expect(joinNullableStrings([], " - ")).toEqual("");
        expect(joinNullableStrings([undefined, null, ""], " - ")).toEqual("");
    });
});
