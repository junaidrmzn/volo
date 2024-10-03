import { anyListMachineConfigBuilder } from "../../list/__tests__/anyListMachineConfig";
import type { CreateListMachineOptions } from "../../list/state-machine/listMachineBuilder";
import type {
    AuthorizationOptions,
    ResourceMachineConfigBuilderOptions,
} from "../../state-machine/resourceMachineConfigBuilder";

export type TestResource = {
    id: string;
};
export const fetchAnyDetailsResource = (resourceId: string) => Promise.resolve({ data: { id: resourceId } });
export const anyAddMachine = (
    listMachineOverwrites?: Partial<CreateListMachineOptions<TestResource>>,
    authorizationOverwrites?: Partial<AuthorizationOptions>
) => anyListMachineConfigBuilder(listMachineOverwrites, authorizationOverwrites).withAdd().build();

export const anyAddMachineWithDetail = (
    listMachineOverwrites?: Partial<CreateListMachineOptions<TestResource>>,
    authorizationOverwrites?: Partial<AuthorizationOptions>
) =>
    anyListMachineConfigBuilder(listMachineOverwrites, authorizationOverwrites)
        .withDetails({
            getDetailsTitle: () => "anyAddMachineWithDetail",
            fetchDetailsResource: fetchAnyDetailsResource,
        })
        .withPreview({
            fetchPreviewResource: fetchAnyDetailsResource,
            getPreviewTitle: () => "Preview",
        })
        .withAdd()
        .build();

export const anyAddMachineWithCallback = (onAnyAdded: () => void) =>
    anyListMachineConfigBuilder().withAdd({ invokeOnSaved: onAnyAdded }).build();

export const anyAddMachineWithConfigBuilderOptions = (
    listMachineOverwrites?: Partial<CreateListMachineOptions<TestResource>>,
    authorizationOverwrites?: Partial<ResourceMachineConfigBuilderOptions>
) => anyListMachineConfigBuilder(listMachineOverwrites, authorizationOverwrites).withAdd().build();
