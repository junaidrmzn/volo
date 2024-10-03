import type { CrewRole, CrewRoleCreate } from "@voloiq-typescript-api/crew-api-types";
import { useCreateService, useDeleteService, useGetAllService, useGetService, useUpdateService } from "@voloiq/service";
import { CREW_API } from "./serviceEndpoints";

const route = `${CREW_API}/crew-roles`;

export const REGION_PAGE_SIZE = 10;

export const useCreateCrewRole = () => useCreateService<CrewRoleCreate, CrewRole>({ route });

export const useGetCrewRoleNew = () =>
    useGetService<CrewRole>({ route, resourceId: "", params: { loadImages: "true" }, options: { manual: true } });

export const useGetCrewRoles = (page: number) =>
    useGetAllService<CrewRole>({
        params: {
            page,
            size: REGION_PAGE_SIZE,
        },
        route,
    });

export const useGetAllCrewRolesManual = () => {
    return useGetAllService<CrewRole>({
        route: `${route}`,
        options: {
            manual: true,
        },
    });
};

type GetAllCrewRolesOptions = { manual: boolean };

export const useGetAllCrewRolesOptions = (options?: GetAllCrewRolesOptions) =>
    useGetAllService<CrewRole>({
        params: {
            limit: 100,
        },
        options: { manual: options?.manual ?? false },
        route,
    });

export const useDeleteCrewRole = () => useDeleteService({ route });

export const useUpdateCrewRole = () => useUpdateService({ route });
