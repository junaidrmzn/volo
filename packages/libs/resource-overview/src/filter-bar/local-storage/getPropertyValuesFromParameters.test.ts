import type { Property } from "@volocopter/filter-react";
import { getPropertyValuesFromParameters } from "./getPropertyValuesFromParameters";

const baseProperty: Pick<Property, "group" | "label" | "propertyName"> = {
    propertyName: "propertyName",
    group: "group",
    label: "Label",
};

describe("getPropertyValuesFromParameters", () => {
    describe("for number properties", () => {
        const numberProperty: Property = {
            type: "number",
            ...baseProperty,
        };

        it("assigns the value correctly", () => {
            const parameters = { "number-propertyName": JSON.stringify({ value: "42" }) };
            const result = getPropertyValuesFromParameters(parameters, [numberProperty]);
            expect(result[0]).toMatchObject({ ...numberProperty, value: 42 });
        });

        it("ignores invalid values", () => {
            const parameters = { "number-propertyName": JSON.stringify({ value: "invalid" }) };
            const result = getPropertyValuesFromParameters(parameters, [numberProperty]);
            expect(result[0]).toMatchObject(numberProperty);
        });
    });

    describe("for number range properties", () => {
        const numberRangeProperty: Property = {
            type: "number-range",
            maxLabel: "max",
            minLabel: "min",
            ...baseProperty,
        };

        it("assigns the min value correctly", () => {
            const parameters = { "numberRange-propertyNameRangeFrom": JSON.stringify({ value: "42" }) };
            const result = getPropertyValuesFromParameters(parameters, [numberRangeProperty]);
            expect(result[0]).toMatchObject({ ...numberRangeProperty, value: { minValue: 42 } });
        });

        it("assigns the max value correctly", () => {
            const parameters = { "numberRange-propertyNameRangeTo": JSON.stringify({ value: "44" }) };
            const result = getPropertyValuesFromParameters(parameters, [numberRangeProperty]);
            expect(result[0]).toMatchObject({ ...numberRangeProperty, value: { maxValue: 44 } });
        });

        it("assigns both values correctly", () => {
            const parameters = {
                "numberRange-propertyNameRangeFrom": JSON.stringify({ value: "42" }),
                "numberRange-propertyNameRangeTo": JSON.stringify({ value: "44" }),
            };
            const result = getPropertyValuesFromParameters(parameters, [numberRangeProperty]);
            expect(result[0]).toMatchObject({ ...numberRangeProperty, value: { minValue: 42, maxValue: 44 } });
        });

        it("ignores invalid values", () => {
            const parameters = {
                "numberRange-propertyNameRangeFrom": JSON.stringify({ value: "invalid" }),
                "numberRange-propertyNameRangeTo": JSON.stringify({ value: "invalid" }),
            };
            const result = getPropertyValuesFromParameters(parameters, [numberRangeProperty]);
            expect(result[0]).toMatchObject(numberRangeProperty);
        });
    });

    describe("for date properties", () => {
        const dateProperty: Property = {
            type: "date",
            ...baseProperty,
        };

        it("assigns the value correctly", () => {
            const dateString = "2023-05-09T12:00:00.000Z";
            const parameters = { "range-propertyName": JSON.stringify({ value: dateString }) };
            const result = getPropertyValuesFromParameters(parameters, [dateProperty]);
            expect(result[0]).toMatchObject({ ...dateProperty, value: new Date(dateString) });
        });

        it("ignores invalid values", () => {
            const parameters = { "range-propertyName": JSON.stringify({ value: "invalid" }) };
            const result = getPropertyValuesFromParameters(parameters, [dateProperty]);
            expect(result[0]).toMatchObject(dateProperty);
        });
    });

    describe("for date range properties", () => {
        const minDateString = "2023-05-09T12:00:00.000Z";
        const maxDateString = "2023-06-10T12:00:00.000Z";

        const dateRangeProperty: Property = {
            type: "date-range",
            maxLabel: "max",
            minLabel: "min",
            ...baseProperty,
        };

        it("assigns the min value correctly", () => {
            const parameters = { "range-propertyNameRangeFrom": JSON.stringify({ value: minDateString }) };
            const result = getPropertyValuesFromParameters(parameters, [dateRangeProperty]);
            expect(result[0]).toMatchObject({ ...dateRangeProperty, value: { minValue: new Date(minDateString) } });
        });

        it("assigns the max value correctly", () => {
            const parameters = { "range-propertyNameRangeTo": JSON.stringify({ value: maxDateString }) };
            const result = getPropertyValuesFromParameters(parameters, [dateRangeProperty]);
            expect(result[0]).toMatchObject({ ...dateRangeProperty, value: { maxValue: new Date(maxDateString) } });
        });

        it("assigns both values correctly", () => {
            const parameters = {
                "range-propertyNameRangeFrom": JSON.stringify({ value: minDateString }),
                "range-propertyNameRangeTo": JSON.stringify({ value: maxDateString }),
            };
            const result = getPropertyValuesFromParameters(parameters, [dateRangeProperty]);
            expect(result[0]).toMatchObject({
                ...dateRangeProperty,
                value: { minValue: new Date(minDateString), maxValue: new Date(maxDateString) },
            });
        });

        it("ignores invalid values", () => {
            const parameters = {
                "range-propertyNameFrom": JSON.stringify({ value: "invalid" }),
                "range-propertyNameTo": JSON.stringify({ value: "invalid" }),
            };
            const result = getPropertyValuesFromParameters(parameters, [dateRangeProperty]);
            expect(result[0]).toMatchObject(dateRangeProperty);
        });
    });

    it("assigns the value to a text property correctly", () => {
        const textProperty: Property = {
            type: "text",
            ...baseProperty,
        };

        const value = "This is a description";
        const parameters = { "text-propertyName": JSON.stringify({ value }) };
        const result = getPropertyValuesFromParameters(parameters, [textProperty]);
        expect(result[0]).toMatchObject({ ...textProperty, value });
    });

    describe("for boolean properties", () => {
        const trueOption = { value: true, label: "Correct" };
        const falseOption = { value: false, label: "Incorrect" };
        const booleanProperty: Property = {
            type: "boolean",
            options: [trueOption, falseOption],
            ...baseProperty,
        };

        it("assigns the value 'true' correctly", () => {
            const parameters = { "boolean-propertyName": JSON.stringify({ value: "true" }) };
            const result = getPropertyValuesFromParameters(parameters, [booleanProperty]);
            expect(result[0]).toMatchObject({ ...booleanProperty, value: trueOption });
        });

        it("assigns the value 'false' correctly", () => {
            const parameters = { "boolean-propertyName": JSON.stringify({ value: "false" }) };
            const result = getPropertyValuesFromParameters(parameters, [booleanProperty]);
            expect(result[0]).toMatchObject({ ...booleanProperty, value: falseOption });
        });

        it("ignores invalid values", () => {
            const parameters = { "boolean-propertyName": JSON.stringify({ value: "invalid" }) };
            const result = getPropertyValuesFromParameters(parameters, [booleanProperty]);
            expect(result[0]).toMatchObject(booleanProperty);
        });
    });

    describe("for select properties", () => {
        const firstOption = { value: 1, label: "First" };
        const secondOption = { value: 2, label: "Second" };
        const selectProperty: Property = {
            type: "select",
            options: [firstOption, secondOption],
            ...baseProperty,
        };

        it("assigns the value correctly", () => {
            const parameters = { "select-propertyName": JSON.stringify({ value: "2" }) };
            const result = getPropertyValuesFromParameters(parameters, [selectProperty]);
            expect(result[0]).toMatchObject({ ...selectProperty, value: secondOption });
        });

        it("ignores invalid values", () => {
            const parameters = { "select-propertyName": JSON.stringify({ value: "invalid" }) };
            const result = getPropertyValuesFromParameters(parameters, [selectProperty]);
            expect(result[0]).toMatchObject(selectProperty);
        });
    });

    describe("for select-multiple properties", () => {
        const firstOption = { value: 1, label: "First" };
        const secondOption = { value: 2, label: "Second" };
        const selectMultipleProperty: Property = {
            type: "select-multiple",
            options: [firstOption, secondOption],
            ...baseProperty,
        };

        it("assigns a single value correctly", () => {
            const parameters = { "multiSelect-propertyName": JSON.stringify({ value: "2" }) };
            const result = getPropertyValuesFromParameters(parameters, [selectMultipleProperty]);
            expect(result[0]).toMatchObject({ ...selectMultipleProperty, value: [secondOption] });
        });

        it("assigns multiple values correctly", () => {
            const parameters = { "multiSelect-propertyName": JSON.stringify({ value: "1|2" }) };
            const result = getPropertyValuesFromParameters(parameters, [selectMultipleProperty]);
            expect(result[0]).toMatchObject({ ...selectMultipleProperty, value: [firstOption, secondOption] });
        });

        it("ignores invalid values", () => {
            const parameters = { "multiSelect-propertyName": JSON.stringify({ value: "invalid" }) };
            const result = getPropertyValuesFromParameters(parameters, [selectMultipleProperty]);
            expect(result[0]).toMatchObject(selectMultipleProperty);
        });
    });
});
