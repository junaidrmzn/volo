import { anyListMachineConfigBuilder } from "../../list/__tests__/anyListMachineConfig";
import type { CreateListMachineOptions } from "../../list/state-machine/listMachineBuilder";
import type { AuthorizationOptions } from "../../state-machine/resourceMachineConfigBuilder";
import type { CreatePreviewMachineOptions } from "../state-machine/previewMachineBuilder";

export type TestResource = {
    id: string;
};
export const fetchAnyPreviewResource = (resourceId: string) => Promise.resolve({ data: { id: resourceId } });
export const getAnyPreviewTitle = () => "Any Preview Title";
export const anyPreviewMachineBuilder = (
    overwrites?: Partial<CreatePreviewMachineOptions<TestResource>>,
    listMachineOverwrites?: Partial<CreateListMachineOptions<TestResource>>,
    authorizationOverwrites?: Partial<AuthorizationOptions>
) =>
    anyListMachineConfigBuilder(listMachineOverwrites, authorizationOverwrites).withPreview({
        fetchPreviewResource: fetchAnyPreviewResource,
        getPreviewTitle: getAnyPreviewTitle,
        ...overwrites,
    });
