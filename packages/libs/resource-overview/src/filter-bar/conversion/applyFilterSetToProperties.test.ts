import type { Property } from "@volocopter/filter-react";
import type { FilterSet } from "@voloiq/filter-panel";
import { applyFilterSetToProperties } from "./applyFilterSetToProperties";

describe("applyFilterSetToProperties", () => {
    it("applies filterSet to boolean property", () => {
        const property: Property = {
            type: "boolean",
            group: "group",
            label: "label",
            propertyName: "propertyName",
            options: [
                { value: true, label: "true" },
                { value: false, label: "false" },
            ],
        };

        const filterSet: FilterSet<{}> = {
            filters: [
                {
                    type: "boolean",
                    displayName: "displayName",
                    trueLabel: "true",
                    falseLabel: "false",
                    value: true,
                    isActive: true,
                    propertyName: "propertyName",
                },
            ],
        };
        const expected: Property = {
            ...property,
            value: { value: true, label: "true" },
        };
        expect(applyFilterSetToProperties([property], filterSet)).toMatchObject([expected]);
    });

    it("applies filterSet to select property", () => {
        const property: Property = {
            type: "select",
            group: "group",
            label: "label",
            propertyName: "propertyName",
            options: [
                { value: 1, label: "1" },
                { value: 2, label: "2" },
            ],
        };

        const filterSet: FilterSet<{}> = {
            filters: [
                {
                    type: "select",
                    displayName: "displayName",
                    value: { value: "1", label: "1" },
                    isActive: true,
                    propertyName: "propertyName",
                },
            ],
        };
        const expected: Property = {
            ...property,
            value: { value: 1, label: "1" },
        };
        expect(applyFilterSetToProperties([property], filterSet)).toMatchObject([expected]);
    });

    it("applies filterSet to select-multiple property", () => {
        const property: Property = {
            type: "select-multiple",
            group: "group",
            label: "label",
            propertyName: "propertyName",
            options: [
                { value: 1, label: "1" },
                { value: 2, label: "2" },
            ],
        };

        const filterSet: FilterSet<{}> = {
            filters: [
                {
                    type: "multiSelect",
                    displayName: "displayName",
                    values: [
                        { value: "1", label: "1" },
                        { value: "2", label: "2" },
                    ],
                    isActive: true,
                    propertyName: "propertyName",
                },
            ],
        };
        const expected: Property = {
            ...property,
            value: [
                { value: 1, label: "1" },
                { value: 2, label: "2" },
            ],
        };
        expect(applyFilterSetToProperties([property], filterSet)).toMatchObject([expected]);
    });

    it("applies filterSet to text property", () => {
        const property: Property = {
            type: "text",
            group: "group",
            label: "label",
            propertyName: "propertyName",
        };

        const filterSet: FilterSet<{}> = {
            filters: [
                {
                    type: "text",
                    displayName: "displayName",
                    value: "value",
                    isActive: true,
                    propertyName: "propertyName",
                },
            ],
        };
        const expected: Property = {
            ...property,
            value: "value",
        };
        expect(applyFilterSetToProperties([property], filterSet)).toMatchObject([expected]);
    });

    it("applies filterSet to number property", () => {
        const property: Property = {
            type: "number",
            group: "group",
            label: "label",
            propertyName: "propertyName",
        };

        const filterSet: FilterSet<{}> = {
            filters: [
                {
                    type: "number",
                    displayName: "displayName",
                    value: 42,
                    isActive: true,
                    propertyName: "propertyName",
                },
            ],
        };
        const expected: Property = {
            ...property,
            value: 42,
        };
        expect(applyFilterSetToProperties([property], filterSet)).toMatchObject([expected]);
    });

    it("applies filterSet to number-range property", () => {
        const property: Property = {
            type: "number-range",
            group: "group",
            label: "label",
            propertyName: "propertyName",
            minLabel: "minLabel",
            maxLabel: "maxLabel",
        };

        const filterSet: FilterSet<{}> = {
            filters: [
                {
                    type: "numberRange",
                    displayName: "displayName",
                    fromValue: "0",
                    toValue: "100",
                    isActive: true,
                    propertyName: "propertyName",
                },
            ],
        };
        const expected: Property = {
            ...property,
            value: { minValue: 0, maxValue: 100 },
        };
        expect(applyFilterSetToProperties([property], filterSet)).toMatchObject([expected]);
    });

    it("applies filterSet to date property", () => {
        const property: Property = {
            type: "date",
            group: "group",
            label: "label",
            propertyName: "propertyName",
        };

        const filterSet: FilterSet<{}> = {
            filters: [
                {
                    type: "range",
                    displayName: "displayName",
                    fromDate: "2023-04-04T10:00:00.000Z",
                    toDate: "2023-04-04T10:00:00.000Z",
                    isActive: true,
                    propertyName: "propertyName",
                },
            ],
        };

        const expected: Property = {
            ...property,
            value: new Date("2023-04-04T10:00:00.000Z"),
        };
        expect(applyFilterSetToProperties([property], filterSet)).toMatchObject([expected]);
    });

    it("applies filterSet to date-range property", () => {
        const property: Property = {
            type: "date-range",
            group: "group",
            label: "label",
            propertyName: "propertyName",
            minLabel: "minLabel",
            maxLabel: "maxLabel",
        };

        const filterSet: FilterSet<{}> = {
            filters: [
                {
                    type: "range",
                    displayName: "displayName",
                    fromDate: "2023-04-04T10:00:00.000Z",
                    toDate: "2023-04-24T10:00:00.000Z",
                    isActive: true,
                    propertyName: "propertyName",
                },
            ],
        };
        const expected: Property = {
            ...property,
            value: { minValue: new Date("2023-04-04T10:00:00.000Z"), maxValue: new Date("2023-04-24T10:00:00.000Z") },
        };
        expect(applyFilterSetToProperties([property], filterSet)).toMatchObject([expected]);
    });

    it("applies filterSet to date-range property when only min is set", () => {
        const property: Property = {
            type: "date-range",
            group: "group",
            label: "label",
            propertyName: "propertyName",
            minLabel: "minLabel",
            maxLabel: "maxLabel",
        };

        const filterSet: FilterSet<{}> = {
            filters: [
                {
                    type: "range",
                    displayName: "displayName",
                    fromDate: "2023-04-04T10:00:00.000Z",
                    toDate: "",
                    isActive: true,
                    propertyName: "propertyName",
                },
            ],
        };
        const expected: Property = {
            ...property,
            value: {
                minValue: new Date("2023-04-04T10:00:00.000Z"),
                maxValue: undefined,
            },
        };
        expect(applyFilterSetToProperties([property], filterSet)).toMatchObject([expected]);
    });
});
