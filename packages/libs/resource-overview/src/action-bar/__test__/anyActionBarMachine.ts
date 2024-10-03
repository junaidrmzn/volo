import { anyListMachineConfigBuilder } from "../../list/__tests__/anyListMachineConfig";

export const anyActionBarMachine = (getResourceInfo: () => string) =>
    anyListMachineConfigBuilder().withActionBar({ getResourceInfo }).build();
