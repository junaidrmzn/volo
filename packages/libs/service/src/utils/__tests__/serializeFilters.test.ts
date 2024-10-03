import type { FilterSet } from "@voloiq/filter-panel";
import { serializeFilters } from "../serializeFilters";

type Aircraft = {
    id: string;
    productLine: number;
    weight: number;
    aircraftType: string;
    engine: {
        type: string;
    };
    msn: string;
    createdOn: string;
    modifiedOn: string;
    active: boolean;
    pilots: string[];
    leonId: string;
};

test("It serializes the given filter set correctly", () => {
    const filterSet: FilterSet<Aircraft> = {
        filters: [
            {
                type: "text",
                propertyName: "aircraftType",
                value: "VD150",
                isActive: true,
                displayName: "Aircraft Type",
            },
            {
                type: "text",
                propertyName: "aircraftLabel",
                value: "Amazing aircraft",
                isActive: true,
                displayName: "Aircraft Label",
            },
            {
                type: "number",
                propertyName: "weight",
                value: 860,
                isActive: true,
                displayName: "Weight",
            },
            {
                type: "boolean",
                propertyName: "active",
                value: false,
                isActive: true,
                displayName: "Status",
                trueLabel: "Active",
                falseLabel: "Inactive",
            },
            {
                type: "range",
                fromDate: "2022-09-01T12:00:00.000Z",
                toDate: "2022-09-30T12:00:00.000Z",
                propertyName: "createdOn",
                isActive: true,
                displayName: "Created On",
                useUtcTime: true,
            },
            {
                type: "numberRange",
                fromValue: "5",
                toValue: "10",
                propertyName: "productLine",
                isActive: true,
                displayName: "Product Line",
            },
            {
                propertyName: "type",
                type: "select",
                value: { label: "VC - VC1-2 - 01", value: "a43g5bvrg5h4rb" },
                isActive: true,
                displayName: "Engine Type",
            },
            {
                propertyName: "pilots",
                type: "multiSelect",
                values: [
                    { label: "John Doe", value: "john.doe@volocopter.com" },
                    { label: "Bar Baz", value: "bar.baz@volocopter.com" },
                ],
                isActive: true,
                displayName: "Pilots",
            },
            {
                type: "text",
                propertyName: "leonId",
                isActive: true,
                displayName: "Aircraft Type",
                comparisonOperator: "notEqual",
                isNull: true,
                value: "123",
            },
        ],
    };

    expect(serializeFilters(filterSet, { useIlikeOperator: true })).toBe(
        `aircraftType ILIKE "%VD150%" ` +
            `AND aircraftLabel ILIKE "%Amazing aircraft%" ` +
            `AND weight EQ "860" ` +
            `AND active EQ "false" ` +
            `AND createdOn GE "2022-09-01T12:00:00.000Z" ` +
            `AND createdOn LE "2022-09-30T12:00:00.000Z" ` +
            `AND productLine GE "5" AND productLine LE "10" ` +
            `AND type EQ "a43g5bvrg5h4rb" ` +
            `AND pilots IN ["john.doe@volocopter.com", "bar.baz@volocopter.com"] ` +
            `AND leonId IS_NOT NULL AND leonId NE "123"`
    );
});

test("It serializes the given filter set with custom serializers correctly", () => {
    const filterSet: FilterSet<Aircraft> = {
        filters: [
            {
                type: "text",
                propertyName: "aircraftType",
                propertyNameSerializer: (propertyName) => `[${propertyName}]`,
                value: "VD150",
                isActive: true,
                displayName: "Aircraft Type",
            },
            {
                type: "text",
                propertyName: "aircraftLabel",
                propertyNameSerializer: () => `aircraft.label`,
                value: "Amazing aircraft",
                isActive: true,
                displayName: "Aircraft Label",
            },
        ],
    };

    expect(serializeFilters(filterSet, { useIlikeOperator: true })).toBe(
        `[aircraftType] ILIKE "%VD150%" AND aircraft.label ILIKE "%Amazing aircraft%"`
    );
});

test("It serializes the given filter set with OR condition correctly", () => {
    const searchString = "99999";

    const filterSet: FilterSet<Aircraft> = {
        filters: [
            {
                value: searchString,
                type: "text",
                propertyName: "ftiCode",
                displayName: "FTI Code",
                isActive: true,
            },
            {
                value: searchString,
                type: "text",
                propertyName: "shortDescription",
                displayName: "Short Description",
                isActive: true,
            },
        ],
    };

    expect(serializeFilters(filterSet, { useIlikeOperator: false, joinCondition: "OR" })).toBe(
        `ftiCode LIKE "%${searchString}%" OR shortDescription LIKE "%${searchString}%"`
    );
});
