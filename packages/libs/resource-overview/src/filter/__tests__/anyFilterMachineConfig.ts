import { anyListMachineConfigBuilder } from "../../list/__tests__/anyListMachineConfig";
import type { CreateListMachineOptions } from "../../list/state-machine/listMachineBuilder";
import type { AuthorizationOptions } from "../../state-machine/resourceMachineConfigBuilder";
import type { CreateFilterMachineOptions } from "../state-machine/filtersMachineBuilder";

export type TestResource = {
    id: string;
};
export const anyFilterMachineConfig = (
    listMachineConfigOverwrites?: Partial<CreateListMachineOptions<TestResource>>,
    filterMachineConfigOverwrites?: Partial<CreateFilterMachineOptions<TestResource>>,
    authorizationOverwrites?: Partial<AuthorizationOptions>
) =>
    anyListMachineConfigBuilder(listMachineConfigOverwrites, authorizationOverwrites)
        .withFilter({
            getAllFilters: () => [
                {
                    type: "numberRange",
                    propertyName: "flightHeight",
                    fromLabel: "min",
                    toLabel: "max",
                    displayName: "Flight height",
                },
                {
                    type: "numberRange",
                    propertyName: "flightDuration",
                    fromLabel: "min",
                    toLabel: "max",
                    displayName: "Flight Duration",
                },
            ],
            getAllFiltersAsync: () =>
                Promise.resolve([
                    {
                        type: "numberRange",
                        propertyName: "flightHeight",
                        fromLabel: "min",
                        toLabel: "max",
                        displayName: "Flight height",
                    },
                    {
                        type: "numberRange",
                        propertyName: "flightDuration",
                        fromLabel: "min",
                        toLabel: "max",
                        displayName: "Flight Duration",
                    },
                ]),
            ...filterMachineConfigOverwrites,
        })
        .build();
