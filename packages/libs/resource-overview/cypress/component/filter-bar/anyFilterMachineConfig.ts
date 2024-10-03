import type { NumberRangeFilterProps } from "@voloiq/filter-panel";
import type { CreateFilterMachineOptions } from "../../../src/filter/state-machine/filtersMachineBuilder";
import { anyListMachineConfigBuilder } from "../../../src/list/__tests__/anyListMachineConfig";
import type { CreateListMachineOptions } from "../../../src/list/state-machine/listMachineBuilder";
import type { AuthorizationOptions } from "../../../src/state-machine/resourceMachineConfigBuilder";

export type TestResource = {
    id: string;
};

export const flightDurationFilter: NumberRangeFilterProps<TestResource> = {
    type: "numberRange",
    propertyName: "flightDuration",
    fromLabel: "min",
    toLabel: "max",
    displayName: "Flight Duration",
};

const filters = [flightDurationFilter];

export const anyFilterMachineConfig = (
    listMachineConfigOverwrites?: Partial<CreateListMachineOptions<TestResource>>,
    filterMachineConfigOverwrites?: Partial<CreateFilterMachineOptions<TestResource>>,
    authorizationOverwrites?: Partial<AuthorizationOptions>
) =>
    anyListMachineConfigBuilder(listMachineConfigOverwrites, authorizationOverwrites)
        .withFilter({
            getAllFilters: () => filters,
            getAllFiltersAsync: () => Promise.resolve(filters),
            ...filterMachineConfigOverwrites,
        })
        .build();

export const ameliaEarhart = { label: "Amelia Earhart", value: "1" };

const crewMembers = [ameliaEarhart];

export const filterMachineConfigWithAsyncOptions = (
    listMachineConfigOverwrites?: Partial<CreateListMachineOptions<TestResource>>,
    filterMachineConfigOverwrites?: Partial<CreateFilterMachineOptions<TestResource>>,
    authorizationOverwrites?: Partial<AuthorizationOptions>
) =>
    anyListMachineConfigBuilder(listMachineConfigOverwrites, authorizationOverwrites)
        .withFilter({
            getAllFilters: () => [
                {
                    type: "multiSelect",
                    propertyName: "pilot",
                    options: [],
                    displayName: "Pilot",
                },
            ],
            getAllFiltersAsync: () =>
                Promise.resolve([
                    {
                        type: "multiSelect",
                        propertyName: "pilot",
                        options: crewMembers,
                        displayName: "Pilot",
                    },
                ]),
            ...filterMachineConfigOverwrites,
        })
        .build();
