import { anyListMachineConfigBuilder } from "../../list/__tests__/anyListMachineConfig";
import type { BaseResource } from "../../state-machine/BaseResource";
import type { AuthorizationOptions } from "../../state-machine/resourceMachineConfigBuilder";
import type { CreateDeleteMachineOptions } from "../state-machine/deleteMachineBuilder";

type Aircraft = BaseResource & {
    name: string;
};

type TestResource = {
    id: string;
};

const fetchAnyPreviewResource = (resourceId: string) => Promise.resolve({ data: { id: resourceId } });
const getAnyPreviewTitle = () => "Any Preview Title";

export const anyDeleteMachine = (
    deleteMachineOverwrites?: Partial<CreateDeleteMachineOptions<TestResource>>,
    authorizationOverwrites?: Partial<AuthorizationOptions>
) =>
    anyListMachineConfigBuilder(
        {
            getListItemName: (resource: BaseResource) => `ListItem ${resource.id}`,
        },
        authorizationOverwrites
    )
        .withPreview({
            fetchPreviewResource: fetchAnyPreviewResource,
            getPreviewTitle: getAnyPreviewTitle,
        })
        .withDelete<Aircraft>({
            deleteResource: () => Promise.resolve(),
            getDeleteTexts: (aircraft) => ({
                confirmationModal: {
                    headerText: `Delete Aircraft ${aircraft.name}`,
                    bodyText: `Do you really want to permanently delete aircraft ${aircraft.name}?`,
                },
            }),
            ...deleteMachineOverwrites,
        })
        .build();

export const anyDeleteMachineWithCallback = (onAnyDeleted: () => void) =>
    anyListMachineConfigBuilder({
        getListItemName: (resource: BaseResource) => `ListItem ${resource.id}`,
    })
        .withPreview({
            fetchPreviewResource: fetchAnyPreviewResource,
            getPreviewTitle: getAnyPreviewTitle,
        })
        .withDelete<Aircraft>({
            deleteResource: () => Promise.resolve(),
            getDeleteTexts: () => ({
                confirmationModal: {
                    headerText: "Delete Item",
                    bodyText: "Do you really want to permanently delete item?",
                },
            }),
            invokeOnDeleted: onAnyDeleted,
        })
        .build();
