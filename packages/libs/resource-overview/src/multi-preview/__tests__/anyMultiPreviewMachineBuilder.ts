import { anyListMachineConfigBuilder, anyPagination } from "../../list/__tests__/anyListMachineConfig";
import type { CreateListMachineOptions } from "../../list/state-machine/listMachineBuilder";
import type { AuthorizationOptions } from "../../state-machine/resourceMachineConfigBuilder";
import type { CreateMultiPreviewMachineOptions } from "../state-machine/multiPreviewMachineBuilder";

export type TestResource = {
    id: string;
};
export const fetchAllResources = () =>
    Promise.resolve({
        data: [{ id: "1" }],
        pagination: anyPagination({ size: Number.MAX_SAFE_INTEGER }),
    });
export const getAnyMultiPreviewTitle = () => "Any Title";
export const anyMultiPreviewMachineBuilder = (
    overwrites?: Partial<CreateMultiPreviewMachineOptions<TestResource>>,
    listMachineOverwrites?: Partial<CreateListMachineOptions<TestResource>>,
    authorizationOverwrites?: Partial<AuthorizationOptions>
) =>
    anyListMachineConfigBuilder(listMachineOverwrites, authorizationOverwrites).withMultiPreview({
        canOpenMultiPreview: true,
        fetchAllResources,
        getMultiPreviewTitle: getAnyMultiPreviewTitle,
        ...overwrites,
    });
