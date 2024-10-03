import type { Pagination } from "@voloiq/service";
import type { AuthorizationOptions } from "../../state-machine/resourceMachineConfigBuilder";
import { ResourceMachineConfigBuilder } from "../../state-machine/resourceMachineConfigBuilder";
import type { CreateListMachineOptions } from "../state-machine/listMachineBuilder";

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
export const getAnyListTitle = () => "Any Title";
export const getAnyModuleTitle = () => "Any Module";
export const getAnyListItemName = () => "Any Item name";
export const anyListMachineConfigBuilder = (
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
    }).withList({
        fetchAllResources,
        getListTitle: getAnyListTitle,
        getModuleTitle: getAnyModuleTitle,
        getListItemName: getAnyListItemName,
        ...overwrites,
    });
export const anyListMachineConfig = (
    overwrites?: Partial<CreateListMachineOptions<TestResource>>,
    authorizationOverwrites?: Partial<AuthorizationOptions>
) => anyListMachineConfigBuilder(overwrites, authorizationOverwrites).build();
