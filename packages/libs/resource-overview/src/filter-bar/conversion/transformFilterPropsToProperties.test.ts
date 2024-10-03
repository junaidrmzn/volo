import type { Property } from "@volocopter/filter-react";
import type { FilterProps } from "@voloiq/filter-panel";
import { transformFilterPropsToProperties } from "./transformFilterPropsToProperties";

describe("transformFilterPropsToProperties", () => {
    it("transforms filterProps to boolean property", () => {
        const filterProp: FilterProps<{}> = {
            type: "boolean",
            displayName: "displayName",
            trueLabel: "true",
            falseLabel: "false",
            neutralLabel: "neutral",
            propertyName: "propertyName",
        };
        const expected: Property = {
            type: "boolean",
            group: "Workflows",
            label: "displayName",
            propertyName: "propertyName",
            options: [
                { value: true, label: "true" },
                { value: false, label: "false" },
            ],
        };
        expect(transformFilterPropsToProperties([filterProp])).toMatchObject([expected]);
    });

    it("transforms filterProps to select property", () => {
        const filterProp: FilterProps<{}> = {
            type: "select",
            displayName: "displayName",
            propertyName: "propertyName",
            options: [
                { value: "1", label: "1" },
                { value: "2", label: "2" },
            ],
        };
        const expected: Property = {
            type: "select",
            group: "Workflows",
            label: "displayName",
            propertyName: "propertyName",
            options: [
                { value: "1", label: "1" },
                { value: "2", label: "2" },
            ],
        };
        expect(transformFilterPropsToProperties([filterProp])).toMatchObject([expected]);
    });

    it("transforms filterProps to select-multiple property", () => {
        const filterProp: FilterProps<{}> = {
            type: "multiSelect",
            displayName: "displayName",
            propertyName: "propertyName",
            options: [
                { value: "1", label: "1" },
                { value: "2", label: "2" },
            ],
        };
        const expected: Property = {
            type: "select-multiple",
            group: "Workflows",
            label: "displayName",
            propertyName: "propertyName",
            options: [
                { value: "1", label: "1" },
                { value: "2", label: "2" },
            ],
        };
        expect(transformFilterPropsToProperties([filterProp])).toMatchObject([expected]);
    });

    it("transforms filterProps to text property", () => {
        const filterProp: FilterProps<{}> = {
            type: "text",
            displayName: "displayName",
            propertyName: "propertyName",
        };
        const expected: Property = {
            type: "text",
            group: "Workflows",
            label: "displayName",
            propertyName: "propertyName",
        };
        expect(transformFilterPropsToProperties([filterProp])).toMatchObject([expected]);
    });

    it("transforms filterProps to number property", () => {
        const filterProp: FilterProps<{}> = {
            type: "number",
            displayName: "displayName",
            propertyName: "propertyName",
        };
        const expected: Property = {
            type: "number",
            group: "Workflows",
            label: "displayName",
            propertyName: "propertyName",
        };
        expect(transformFilterPropsToProperties([filterProp])).toMatchObject([expected]);
    });

    it("transforms filterProps to number-range property", () => {
        const filterProp: FilterProps<{}> = {
            type: "numberRange",
            displayName: "displayName",
            propertyName: "propertyName",
            fromLabel: "from",
            toLabel: "to",
        };
        const expected: Property = {
            type: "number-range",
            group: "Workflows",
            label: "displayName",
            propertyName: "propertyName",
            minLabel: "from",
            maxLabel: "to",
        };
        expect(transformFilterPropsToProperties([filterProp])).toMatchObject([expected]);
    });

    it("transforms filterProps to date property", () => {
        const filterProp: FilterProps<{}> = {
            type: "range",
            displayName: "displayName",
            fromLabel: "from",
            toLabel: "to",
            propertyName: "propertyName",
            mode: "date",
        };
        const expected: Property = {
            type: "date-range",
            group: "Workflows",
            label: "displayName",
            propertyName: "propertyName",
            mode: "date",
            minLabel: "from",
            maxLabel: "to",
        };
        expect(transformFilterPropsToProperties([filterProp])).toMatchObject([expected]);
    });

    it("transforms filterProps to number-range property", () => {
        const filterProp: FilterProps<{}> = {
            type: "range",
            displayName: "displayName",
            propertyName: "propertyName",
            fromLabel: "from",
            toLabel: "to",
        };
        const expected: Property = {
            type: "date-range",
            group: "Workflows",
            label: "displayName",
            propertyName: "propertyName",
            minLabel: "from",
            maxLabel: "to",
        };
        expect(transformFilterPropsToProperties([filterProp])).toMatchObject([expected]);
    });
});
