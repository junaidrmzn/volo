import type { PropertyFilter } from "@volocopter/filter-react";
import { ParameterValue } from "./LocalStorageParameters";
import { getParametersFromPropertyFilters } from "./getParametersFromPropertyFilters";

const basePropertyFilter: Pick<PropertyFilter, "label" | "propertyName"> = {
    propertyName: "propertyName",
    label: "Label",
};

describe("getParametersFromPropertyFilters", () => {
    describe("for number properties", () => {
        it("adds parameter for number properties", () => {
            const result = getParametersFromPropertyFilters([{ ...basePropertyFilter, type: "number", value: 0 }]);
            const filterObject: ParameterValue = {
                value: "0",
            };
            expect(result).toMatchObject({ "number-propertyName": JSON.stringify(filterObject) });
        });

        it("applies number value, empty and notEqual comparison operator", () => {
            const result = getParametersFromPropertyFilters([
                { ...basePropertyFilter, type: "number", value: 0, isNull: true, comparisonOperator: "notEqual" },
            ]);
            const filterObject: ParameterValue = {
                value: "0",
                comparisonOperator: "notEqual",
                isNull: true,
            };
            expect(result).toMatchObject({ "number-propertyName": JSON.stringify(filterObject) });
        });
    });

    describe("for text properties", () => {
        it("adds parameter for text properties", () => {
            const result = getParametersFromPropertyFilters([
                { ...basePropertyFilter, type: "text", value: "Description" },
            ]);
            const filterObject: ParameterValue = {
                value: "Description",
            };
            expect(result).toMatchObject({ "text-propertyName": JSON.stringify(filterObject) });
        });

        it("applies text value, empty and notContains comparison operator", () => {
            const result = getParametersFromPropertyFilters([
                {
                    ...basePropertyFilter,
                    type: "text",
                    value: "Description",
                    isNull: true,
                    comparisonOperator: "notContains",
                },
            ]);
            const filterObject: ParameterValue = {
                value: "Description",
                comparisonOperator: "notContains",
                isNull: true,
            };
            expect(result).toMatchObject({ "text-propertyName": JSON.stringify(filterObject) });
        });
    });

    describe("for range properties", () => {
        it("adds parameter for date properties", () => {
            const dateString = "2023-05-09T12:00:00.000Z";
            const result = getParametersFromPropertyFilters([
                { ...basePropertyFilter, type: "date", value: new Date(dateString) },
            ]);
            const filterObject: ParameterValue = {
                value: dateString,
            };
            expect(result).toMatchObject({ "range-propertyName": JSON.stringify(filterObject) });
        });

        it("adds parameters for min and max for date range properties", () => {
            const minDateString = "2023-05-09T12:00:00.000Z";
            const maxDateString = "2023-06-10T12:00:00.000Z";
            const result = getParametersFromPropertyFilters([
                {
                    ...basePropertyFilter,
                    type: "date-range",
                    value: { minValue: new Date(minDateString), maxValue: new Date(maxDateString) },
                },
            ]);
            const minFilterObject: ParameterValue = {
                value: minDateString,
            };
            const maxFilterObject: ParameterValue = {
                value: maxDateString,
            };
            expect(result).toMatchObject({
                "range-propertyNameRangeFrom": JSON.stringify(minFilterObject),
                "range-propertyNameRangeTo": JSON.stringify(maxFilterObject),
            });
        });

        it("adds parameters for min for number range properties", () => {
            const result = getParametersFromPropertyFilters([
                {
                    ...basePropertyFilter,
                    type: "number-range",
                    value: { minValue: 42 },
                },
            ]);
            const minFilterObject: ParameterValue = {
                value: "42",
            };
            expect(result).toMatchObject({
                "numberRange-propertyNameRangeFrom": JSON.stringify(minFilterObject),
            });
        });

        it("adds parameters for min and max for number range properties", () => {
            const result = getParametersFromPropertyFilters([
                {
                    ...basePropertyFilter,
                    type: "number-range",
                    value: { minValue: 42, maxValue: 44 },
                },
            ]);
            const minFilterObject: ParameterValue = {
                value: "42",
            };
            const maxFilterObject: ParameterValue = {
                value: "44",
            };
            expect(result).toMatchObject({
                "numberRange-propertyNameRangeFrom": JSON.stringify(minFilterObject),
                "numberRange-propertyNameRangeTo": JSON.stringify(maxFilterObject),
            });
        });

        it("assign min, max value and empty for number range properties", () => {
            const result = getParametersFromPropertyFilters([
                {
                    ...basePropertyFilter,
                    type: "number-range",
                    value: { minValue: 40, maxValue: 44 },
                    comparisonOperator: "between",
                    isNull: true,
                },
            ]);
            const minFilterObject: ParameterValue = {
                value: "40",
                comparisonOperator: "between",
                isNull: true,
            };
            const maxFilterObject: ParameterValue = {
                value: "44",
                comparisonOperator: "between",
                isNull: true,
            };
            expect(result).toMatchObject({
                "numberRange-propertyNameRangeFrom": JSON.stringify(minFilterObject),
                "numberRange-propertyNameRangeTo": JSON.stringify(maxFilterObject),
            });
        });
    });

    describe("for boolean properties", () => {
        it("assigns the value 'true' correctly", () => {
            const trueOption = { value: true, label: "Correct" };
            const result = getParametersFromPropertyFilters([
                { ...basePropertyFilter, type: "boolean", value: trueOption },
            ]);
            const filterObject: ParameterValue = {
                value: "true",
            };
            expect(result).toMatchObject({ "boolean-propertyName": JSON.stringify(filterObject) });
        });

        it("assigns the value 'false' correctly", () => {
            const falseOption = { value: false, label: "Incorrect" };
            const result = getParametersFromPropertyFilters([
                { ...basePropertyFilter, type: "boolean", value: falseOption },
            ]);
            const filterObject: ParameterValue = {
                value: "false",
            };
            expect(result).toMatchObject({ "boolean-propertyName": JSON.stringify(filterObject) });
        });

        it("assigns the value 'true' and empty correctly", () => {
            const trueOption = { value: true, label: "Correct" };
            const result = getParametersFromPropertyFilters([
                {
                    ...basePropertyFilter,
                    type: "boolean",
                    value: trueOption,
                    comparisonOperator: "equal",
                    isNull: true,
                },
            ]);
            const filterObject: ParameterValue = {
                value: "true",
                comparisonOperator: "equal",
                isNull: true,
            };
            expect(result).toMatchObject({ "boolean-propertyName": JSON.stringify(filterObject) });
        });
    });

    describe("for select properties", () => {
        it("assigns the value correctly", () => {
            const selectedOption = { value: 1, label: "First" };

            const result = getParametersFromPropertyFilters([
                { ...basePropertyFilter, type: "select", value: selectedOption },
            ]);
            const filterObject: ParameterValue = {
                value: "1",
            };
            expect(result).toMatchObject({ "select-propertyName": JSON.stringify(filterObject) });
        });

        it("assigns the value correctly with empty and notEqual comparison operator", () => {
            const selectedOption = { value: 1, label: "First" };

            const result = getParametersFromPropertyFilters([
                {
                    ...basePropertyFilter,
                    type: "select",
                    value: selectedOption,
                    comparisonOperator: "notEqual",
                    isNull: true,
                },
            ]);
            const filterObject: ParameterValue = {
                value: "1",
                comparisonOperator: "notEqual",
                isNull: true,
            };
            expect(result).toMatchObject({ "select-propertyName": JSON.stringify(filterObject) });
        });
    });

    describe("for select-multiple properties", () => {
        const firstOption = { value: 1, label: "First" };
        const secondOption = { value: 2, label: "Second" };

        it("assigns single value correctly", () => {
            const result = getParametersFromPropertyFilters([
                {
                    type: "select-multiple",
                    ...basePropertyFilter,
                    value: [secondOption],
                },
            ]);
            const filterObject: ParameterValue = {
                value: "2",
            };
            expect(result).toMatchObject({ "multiSelect-propertyName": JSON.stringify(filterObject) });
        });

        it("assigns multiple values correctly", () => {
            const result = getParametersFromPropertyFilters([
                {
                    type: "select-multiple",
                    ...basePropertyFilter,
                    value: [firstOption, secondOption],
                },
            ]);
            const filterObject: ParameterValue = {
                value: "1|2",
            };
            expect(result).toMatchObject({ "multiSelect-propertyName": JSON.stringify(filterObject) });
        });

        it("assign single value with empty and notEqaul comparison operator", () => {
            const result = getParametersFromPropertyFilters([
                {
                    type: "select-multiple",
                    ...basePropertyFilter,
                    value: [secondOption],
                    comparisonOperator: "notEqual",
                    isNull: true,
                },
            ]);
            const filterObject: ParameterValue = {
                value: "2",
                comparisonOperator: "notEqual",
                isNull: true,
            };
            expect(result).toMatchObject({ "multiSelect-propertyName": JSON.stringify(filterObject) });
        });
    });
});
