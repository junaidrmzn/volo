import { anyListMachineConfigBuilder } from "../../list/__tests__/anyListMachineConfig";
import type { CreateListMachineOptions } from "../../list/state-machine/listMachineBuilder";
import type { QuickFilterProperty } from "../state-machine/Types";

export type TestResource = {
    id: string;
};

export const anyQuickFilterMachine = (
    getAllQuickFilters: () => QuickFilterProperty[],
    overwrites?: Partial<CreateListMachineOptions<TestResource>>
) =>
    anyListMachineConfigBuilder({ ...overwrites })
        .withQuickFilter({ getAllQuickFilters })
        .build();
