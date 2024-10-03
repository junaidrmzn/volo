import type { FilterSet } from "@voloiq/filter-panel";
import { useCreateService, useDeleteService, useGetAllService, useGetService, useUpdateService } from "@voloiq/service";
import type { Vertiport, VertiportCreate } from "@voloiq/vertiport-management-api/v1";
import { createApiFilterString, extractRegionAndServicesWithFilter } from "../hooks/filtering/filterUtil";
import { VERTIPORT_MANAGEMENT } from "./serviceEndpoints";

const route = `${VERTIPORT_MANAGEMENT}/vertiports`;

export const REGION_PAGE_SIZE = 10;

export const useCreateVertiport = () => useCreateService<VertiportCreate, Vertiport>({ route });

export const useGetVertiport = (id: string) => useGetService<Vertiport>({ route, resourceId: id });

export const useGetVertiportOverview = () =>
    useGetService<Vertiport>({ route, resourceId: "", params: { loadImages: "true" }, options: { manual: true } });

export const useGetAllVertiportsManual = () => {
    return useGetAllService<Vertiport>({
        route: `${VERTIPORT_MANAGEMENT}/vertiports`,
        options: {
            manual: true,
        },
    });
};

export const useGetAllVertiports = (
    pageNumber: number = 1,
    orderByParameter?: string,
    filterString?: FilterSet<Event>,
    pageSize: number = REGION_PAGE_SIZE
) =>
    useGetAllService<Vertiport>({
        params: {
            page: pageNumber,
            size: pageSize,
            ...(orderByParameter && { orderBy: orderByParameter }),
            ...extractRegionAndServicesWithFilter(filterString),
            ...(filterString && {
                filter:
                    createApiFilterString(filterString).length > 0 ? createApiFilterString(filterString) : undefined,
            }),
        },
        route,
    });

export const useDeleteVertiport = () => useDeleteService({ route });

export const useUpdateVertiport = () => useUpdateService({ route });
