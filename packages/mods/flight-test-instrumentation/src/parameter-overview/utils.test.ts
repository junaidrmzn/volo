import { getPlaceholderIfUndefined } from "./utils";

describe("getPlaceholderIfUndefined", () => {
    it("should return the value if it is not undefined", () => {
        expect(getPlaceholderIfUndefined("test")).toEqual("test");
        expect(getPlaceholderIfUndefined(123)).toEqual(123);
    });

    it("should return '-' if the value is undefined", () => {
        expect(getPlaceholderIfUndefined(undefined)).toEqual("-");
    });
});
