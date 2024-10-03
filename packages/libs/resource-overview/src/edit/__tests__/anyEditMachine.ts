import { CreateDetailsMachineOptions } from "../../details/state-machine/detailsMachineBuilder";
import { anyListMachineConfigBuilder } from "../../list/__tests__/anyListMachineConfig";
import type { CreateListMachineOptions } from "../../list/state-machine/listMachineBuilder";
import type { CreatePreviewMachineOptions } from "../../preview/state-machine/previewMachineBuilder";
import type { AuthorizationOptions } from "../../state-machine/resourceMachineConfigBuilder";
import { EditMachineOptions } from "../state-machine/editMachineBuilder";

export type TestResource = {
    id: string;
};

export const fetchAnyPreviewResource = (resourceId: string) => Promise.resolve({ data: { id: resourceId } });
export const getAnyPreviewTitle = () => "Any Preview Title";

export const anyEditMachine = (listMachineOverwrites?: Partial<CreateListMachineOptions<TestResource>>) =>
    anyListMachineConfigBuilder(listMachineOverwrites).withEdit().build();

export const anyEditMachineWithPreview = (
    listMachineOverwrites?: Partial<CreateListMachineOptions<TestResource>>,
    previewMachineOverwrites?: Partial<CreatePreviewMachineOptions<TestResource>>,
    authorizationOverwrites?: Partial<AuthorizationOptions>
) =>
    anyListMachineConfigBuilder(listMachineOverwrites, authorizationOverwrites)
        .withEdit()
        .withPreview({
            fetchPreviewResource: fetchAnyPreviewResource,
            getPreviewTitle: getAnyPreviewTitle,
            ...previewMachineOverwrites,
        })
        .build();

export const fetchAnyDetailsResource = (resourceId: string) => Promise.resolve({ data: { id: resourceId } });
export const getAnyDetailsTitle = () => "Any Details Title";

export const anyEditMachineWithDetails = (
    detailsMachineOverwrites?: Partial<CreateDetailsMachineOptions<TestResource>>,
    listMachineOverwrites?: Partial<CreateListMachineOptions<TestResource>>,
    previewMachineOverwrites?: Partial<CreatePreviewMachineOptions<TestResource>>,
    authorizationOverwrites?: Partial<AuthorizationOptions>,
    editMachineOverwrites?: EditMachineOptions<TestResource>
) =>
    anyListMachineConfigBuilder(listMachineOverwrites, authorizationOverwrites)
        .withDetails({
            fetchDetailsResource: fetchAnyDetailsResource,
            getDetailsTitle: getAnyDetailsTitle,
            ...detailsMachineOverwrites,
        })
        .withEdit(editMachineOverwrites)
        .withPreview({
            fetchPreviewResource: fetchAnyPreviewResource,
            getPreviewTitle: getAnyPreviewTitle,
            ...previewMachineOverwrites,
        })
        .build();
