import type { Pagination } from "@voloiq/service";
import { CreateListMachineOptions } from "../../../src/list/state-machine/listMachineBuilder";
import type { AuthorizationOptions } from "../../../src/state-machine/resourceMachineConfigBuilder";
import { ResourceMachineConfigBuilder } from "../../../src/state-machine/resourceMachineConfigBuilder";

export type TestResource = {
    id: string;
};

export const anyPagination = (overwrite?: Partial<Pagination>) => ({
    size: 1,
    page: 1,
    totalElements: 1,
    totalPages: 1,
    ...overwrite,
});
export const fetchAllResources = () =>
    Promise.resolve({
        data: [{ id: "1" }],
        pagination: anyPagination(),
    });
export const fetchResource = () =>
    Promise.resolve({
        data: { id: "1" },
    });
export const getAnyListTitle = () => "Any Title";
export const getAnyModuleTitle = () => "Any Module";
export const getAnyListItemName = () => "Any Item name";
export const anySplitPreviewMachineConfigBuilder = (
    overwrites?: Partial<CreateListMachineOptions<TestResource>>,
    authorizationOverwrites?: Partial<AuthorizationOptions>
) =>
    new ResourceMachineConfigBuilder({
        canCreate: true,
        canRead: true,
        canUpdate: true,
        canDelete: true,
        getResourceName: () => "Resource",
        ...authorizationOverwrites,
    })
        .withList({
            fetchAllResources,
            getListTitle: getAnyListTitle,
            getModuleTitle: getAnyModuleTitle,
            getListItemName: getAnyListItemName,
            ...overwrites,
        })
        .withSplitPreview({ fetchResource });
export const anySplitPreviewMachineConfig = (
    overwrites?: Partial<CreateListMachineOptions<TestResource>>,
    authorizationOverwrites?: Partial<AuthorizationOptions>
) => anySplitPreviewMachineConfigBuilder(overwrites, authorizationOverwrites).build();
