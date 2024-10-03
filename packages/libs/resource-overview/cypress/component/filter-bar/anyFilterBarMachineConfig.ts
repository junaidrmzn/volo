import type {
    BooleanProperty,
    DateProperty,
    DateRangeProperty,
    NumberProperty,
    NumberRangeProperty,
    SelectMultipleProperty,
    SelectProperty,
    SortingConfig,
    TextProperty,
} from "@volocopter/filter-react";
import type { CreateFilterBarMachineOptions } from "../../../src/filter-bar/state-machine/filterBarMachineBuilder";
import { anyListMachineConfigBuilder } from "../../../src/list/__tests__/anyListMachineConfig";
import type { CreateListMachineOptions } from "../../../src/list/state-machine/listMachineBuilder";
import type { AuthorizationOptions } from "../../../src/state-machine/resourceMachineConfigBuilder";

export type TestResource = {
    id: string;
};

export const numberRangeProperty: NumberRangeProperty = {
    type: "number-range",
    propertyName: "flightDuration",
    minLabel: "min",
    maxLabel: "max",
    group: "group",
    label: "Flight Duration",
};

export const numberProperty: NumberProperty = {
    type: "number",
    propertyName: "passengerWeight",
    group: "group",
    label: "Passenger Weight",
};

export const textProperty: TextProperty = {
    type: "text",
    propertyName: "description",
    group: "group",
    label: "Description",
};

export const nullableTextProperty: TextProperty = {
    type: "text",
    propertyName: "leonId",
    group: "group",
    label: "LEON ID",
    isNullable: true,
};

export const dateProperty: DateProperty = {
    type: "date",
    propertyName: "created",
    group: "group",
    label: "Date Created",
    withUtcTime: true,
};

export const dateRangeProperty: DateRangeProperty = {
    type: "date-range",
    propertyName: "modified",
    group: "group",
    label: "Date Modified",
    minLabel: "min",
    maxLabel: "max",
    withUtcTime: true,
};

export const booleanProperty: BooleanProperty = {
    type: "boolean",
    propertyName: "serviceability",
    group: "group",
    label: "Serviceability",
    options: [
        { value: true, label: "serviceable" },
        { value: false, label: "unserviceable" },
    ],
};

export const selectProperty: SelectProperty = {
    type: "select",
    propertyName: "pilot",
    group: "group",
    label: "Pilot",
    options: [
        { value: "ameliaEarhart", label: "Amelia Earhart" },
        { value: "paulStone", label: "Paul Stone" },
    ],
};

export const selectMultipleProperty: SelectMultipleProperty = {
    type: "select-multiple",
    propertyName: "passengers",
    group: "group",
    label: "Passengers",
    options: [
        { value: "emmanuelMacron", label: "Emmanuel Macron" },
        { value: "olafScholz", label: "Olaf Scholz" },
    ],
};

const filters = [
    numberRangeProperty,
    numberProperty,
    textProperty,
    dateProperty,
    dateRangeProperty,
    booleanProperty,
    selectProperty,
    selectMultipleProperty,
    nullableTextProperty,
];

const sortingConfig: SortingConfig = {
    options: [
        { value: "name", label: "Name" },
        { value: "createdBy", label: "Created By" },
    ],
};

export const anyFilterBarMachineConfig = (
    listMachineConfigOverwrites?: Partial<CreateListMachineOptions<TestResource>>,
    filterMachineConfigOverwrites?: Partial<CreateFilterBarMachineOptions>,
    authorizationOverwrites?: Partial<AuthorizationOptions>
) =>
    anyListMachineConfigBuilder(listMachineConfigOverwrites, authorizationOverwrites)
        .withFilterBar({
            getAllFilters: () => filters,
            ...filterMachineConfigOverwrites,
        })
        .build();

export const anyFilterBarWithSortingConfigMachineConfig = (
    listMachineConfigOverwrites?: Partial<CreateListMachineOptions<TestResource>>,
    filterMachineConfigOverwrites?: Partial<CreateFilterBarMachineOptions>,
    authorizationOverwrites?: Partial<AuthorizationOptions>
) =>
    anyListMachineConfigBuilder(listMachineConfigOverwrites, authorizationOverwrites)
        .withFilterBar({
            getAllFilters: () => filters,
            getSortingConfig: () => sortingConfig,
            ...filterMachineConfigOverwrites,
        })
        .build();
