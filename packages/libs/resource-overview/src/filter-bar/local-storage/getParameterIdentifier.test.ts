import { getParameterIdentifier } from "./getParameterIdentifier";

describe("getParameterIdentifier", () => {
    it("returns the correct number identifier", () => {
        expect(getParameterIdentifier("number", "propertyName")).toBe("number-propertyName");
    });
    it("returns the correct number-range identifier", () => {
        expect(getParameterIdentifier("number-range", "propertyName", "min")).toBe("numberRange-propertyNameRangeFrom");
        expect(getParameterIdentifier("number-range", "propertyName", "max")).toBe("numberRange-propertyNameRangeTo");
    });
    it("returns the correct date identifier", () => {
        expect(getParameterIdentifier("date", "propertyName")).toBe("range-propertyName");
    });
    it("returns the correct date-range identifier", () => {
        expect(getParameterIdentifier("date-range", "propertyName", "min")).toBe("range-propertyNameRangeFrom");
        expect(getParameterIdentifier("date-range", "propertyName", "max")).toBe("range-propertyNameRangeTo");
    });
    it("returns the correct text identifier", () => {
        expect(getParameterIdentifier("text", "propertyName")).toBe("text-propertyName");
    });
    it("returns the correct boolean identifier", () => {
        expect(getParameterIdentifier("boolean", "propertyName")).toBe("boolean-propertyName");
    });
    it("returns the correct select identifier", () => {
        expect(getParameterIdentifier("select", "propertyName")).toBe("select-propertyName");
    });
    it("returns the correct select-multiple identifier", () => {
        expect(getParameterIdentifier("select-multiple", "propertyName")).toBe("multiSelect-propertyName");
    });
});
