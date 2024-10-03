import { anyListMachineConfigBuilder } from "../../list/__tests__/anyListMachineConfig";
import type { CreateListMachineOptions } from "../../list/state-machine/listMachineBuilder";
import type { AuthorizationOptions } from "../../state-machine/resourceMachineConfigBuilder";
import type { CreateSortMachineOptions } from "../state-machine/sortMachineBuilder";

export type TestResource = {
    id: string;
};
export const anySortMachineConfig = (
    listMachineConfigOverwrites?: Partial<CreateListMachineOptions<TestResource>>,
    sortMachineConfigOverwrites?: Partial<CreateSortMachineOptions>,
    permissionsOverwrites?: Partial<AuthorizationOptions>
) =>
    anyListMachineConfigBuilder(listMachineConfigOverwrites, permissionsOverwrites)
        .withSort({
            sortingOptions: [
                {
                    id: "size",
                    label: "Size",
                },
                {
                    id: "speed",
                    label: "Speed",
                },
            ],
            ...sortMachineConfigOverwrites,
        })
        .build();
