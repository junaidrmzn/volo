import type { PropertyFilter } from "@volocopter/filter-react";
import type { FilterSet } from "@voloiq/filter-panel";
import { transformPropertyFiltersToFilterSet } from "./transformPropertyFiltersToFilterSet";

describe("transformPropertyFiltersToFilterSet", () => {
    it("transforms filterProps to boolean property", () => {
        const property: PropertyFilter = {
            type: "boolean",
            label: "label",
            propertyName: "propertyName",
            value: { value: true, label: "true" },
        };
        const expected: FilterSet<{}> = {
            filters: [
                {
                    type: "boolean",
                    displayName: "label",
                    trueLabel: "true",
                    falseLabel: "",
                    value: true,
                    isActive: true,
                    propertyName: "propertyName",
                },
            ],
        };
        expect(transformPropertyFiltersToFilterSet([property])).toMatchObject(expected);
    });

    it("transforms filterProps to select property", () => {
        const property: PropertyFilter = {
            type: "select",
            label: "label",
            propertyName: "propertyName",
            value: { value: 1, label: "1" },
        };
        const expected: FilterSet<{}> = {
            filters: [
                {
                    type: "select",
                    displayName: "label",
                    value: { value: "1", label: "1" },
                    isActive: true,
                    propertyName: "propertyName",
                },
            ],
        };
        expect(transformPropertyFiltersToFilterSet([property])).toMatchObject(expected);
    });

    it("transforms filterProps to select-multiple property", () => {
        const property: PropertyFilter = {
            type: "select-multiple",
            label: "label",
            propertyName: "propertyName",
            value: [{ value: 1, label: "1" }],
        };
        const expected: FilterSet<{}> = {
            filters: [
                {
                    type: "multiSelect",
                    displayName: "label",
                    values: [{ value: "1", label: "1" }],
                    isActive: true,
                    propertyName: "propertyName",
                },
            ],
        };
        expect(transformPropertyFiltersToFilterSet([property])).toMatchObject(expected);
    });

    it("transforms filterProps to text property", () => {
        const property: PropertyFilter = {
            type: "text",
            label: "label",
            propertyName: "propertyName",
            value: "value",
        };
        const expected: FilterSet<{}> = {
            filters: [
                {
                    type: "text",
                    displayName: "label",
                    value: "value",
                    isActive: true,
                    propertyName: "propertyName",
                },
            ],
        };
        expect(transformPropertyFiltersToFilterSet([property])).toMatchObject(expected);
    });

    it("transforms filterProps to number property", () => {
        const property: PropertyFilter = {
            type: "number",
            label: "label",
            propertyName: "propertyName",
            value: 42,
        };
        const expected: FilterSet<{}> = {
            filters: [
                {
                    type: "number",
                    displayName: "label",
                    value: 42,
                    isActive: true,
                    propertyName: "propertyName",
                },
            ],
        };
        expect(transformPropertyFiltersToFilterSet([property])).toMatchObject(expected);
    });

    it("transforms filterProps to number-range property", () => {
        const property: PropertyFilter = {
            type: "number-range",
            label: "label",
            propertyName: "propertyName",
            value: { minValue: 0, maxValue: 100 },
        };
        const expected: FilterSet<{}> = {
            filters: [
                {
                    type: "numberRange",
                    displayName: "label",
                    fromValue: "0",
                    toValue: "100",
                    isActive: true,
                    propertyName: "propertyName",
                },
            ],
        };
        expect(transformPropertyFiltersToFilterSet([property])).toMatchObject(expected);
    });

    it("transforms filterProps to date property", () => {
        const property: PropertyFilter = {
            type: "date",
            label: "label",
            propertyName: "propertyName",
            value: new Date("2023-04-24T10:00:00.000Z"),
        };
        const expected: FilterSet<{}> = {
            filters: [
                {
                    type: "range",
                    displayName: "label",
                    fromDate: "2023-04-24T10:00:00.000Z",
                    toDate: "2023-04-24T10:00:00.000Z",
                    isActive: true,
                    propertyName: "propertyName",
                },
            ],
        };
        expect(transformPropertyFiltersToFilterSet([property])).toMatchObject(expected);
    });

    it("transforms filterProps to date-range property", () => {
        const property: PropertyFilter = {
            type: "date-range",
            label: "label",
            propertyName: "propertyName",
            value: { minValue: new Date("2023-04-04T10:00:00.000Z"), maxValue: new Date("2023-04-24T10:00:00.000Z") },
        };
        const expected: FilterSet<{}> = {
            filters: [
                {
                    type: "range",
                    displayName: "label",
                    fromDate: "2023-04-04T10:00:00.000Z",
                    toDate: "2023-04-24T10:00:00.000Z",
                    isActive: true,
                    propertyName: "propertyName",
                },
            ],
        };
        expect(transformPropertyFiltersToFilterSet([property])).toMatchObject(expected);
    });
});
