import { formatParameterNameWithUnit } from "../formatParameterNameWithUnit";

describe("formatParameterNameWithUnit", () => {
    it("should return the parameter name with the unit if the unit is defined", () => {
        const testPointParameter = { name: "Parameter1", unit: "Unit1" };
        const result = formatParameterNameWithUnit(testPointParameter);
        expect(result).toEqual("Parameter1 [Unit1]");
    });

    it("should return the parameter name with the unknown unit string if the unit is not defined", () => {
        const testPointParameter = { name: "Parameter1" };
        const result = formatParameterNameWithUnit(testPointParameter);
        expect(result).toEqual("Parameter1 [-]");
    });

    it('should return the parameter name with the unknown unit string if the unit is ""', () => {
        const testPointParameter = { name: "Parameter1", unit: "" };
        const unknownUnitString = "my custom unknown unit";
        const result = formatParameterNameWithUnit(testPointParameter, unknownUnitString);
        expect(result).toEqual(`Parameter1 [${unknownUnitString}]`);
    });

    it("should return the parameter name with the unknown unit string if the unit is only whitespace", () => {
        const testPointParameter = { name: "Parameter1", unit: " " };
        const unknownUnitString = "my custom unknown unit";
        const result = formatParameterNameWithUnit(testPointParameter, unknownUnitString);
        expect(result).toEqual(`Parameter1 [${unknownUnitString}]`);
    });
});
