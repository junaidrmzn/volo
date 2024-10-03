import { anyListMachineConfigBuilder } from "../../list/__tests__/anyListMachineConfig";
import type { CreateListMachineOptions } from "../../list/state-machine/listMachineBuilder";
import type { AuthorizationOptions } from "../../state-machine/resourceMachineConfigBuilder";
import type { CreateDetailsMachineOptions } from "../state-machine/detailsMachineBuilder";

export type TestResource = {
    id: string;
};
export const fetchAnyDetailsResource = (resourceId: string) => Promise.resolve({ data: { id: resourceId } });
export const getAnyDetailsTitle = () => "Any Details Title";
export const anyDetailsMachine = (
    overwrites?: Partial<CreateDetailsMachineOptions<TestResource>>,
    listMachineOverwrites?: Partial<CreateListMachineOptions<TestResource>>,
    authorizationOverwrites?: Partial<AuthorizationOptions>
) =>
    anyListMachineConfigBuilder(listMachineOverwrites, authorizationOverwrites)
        .withDetails({
            fetchDetailsResource: fetchAnyDetailsResource,
            getDetailsTitle: getAnyDetailsTitle,
            ...overwrites,
        })
        .withPreview({
            fetchPreviewResource: fetchAnyDetailsResource,
            getPreviewTitle: () => "Preview",
        })
        .build();
