import { CreateDetailsMachineOptions } from "../../../src/details/state-machine/detailsMachineBuilder";
import { anyListMachineConfigBuilder } from "../../../src/list/__tests__/anyListMachineConfig";

export type TestResource = {
    id: string;
};

export const fetchAnyDetailsResource = (resourceId: string) => Promise.resolve({ data: { id: resourceId } });
export const getAnyDetailsTitle = () => "Any Details Title";

export const anyDetailMachineConfig = (detailsMachineOverwrites?: Partial<CreateDetailsMachineOptions<TestResource>>) =>
    anyListMachineConfigBuilder()
        .withDetails({
            fetchDetailsResource: fetchAnyDetailsResource,
            getDetailsTitle: getAnyDetailsTitle,
            ...detailsMachineOverwrites,
        })
        .withEdit()
        .build();
