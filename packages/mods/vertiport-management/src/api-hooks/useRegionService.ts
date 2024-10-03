import type { FilterSet } from "@voloiq/filter-panel";
import { useCreateService, useDeleteService, useGetAllService, useGetService, useUpdateService } from "@voloiq/service";
import type { Region, RegionCreate } from "@voloiq/vertiport-management-api/v1";
import { createApiFilterString, extractRegionAndServicesWithFilter } from "../hooks/filtering/filterUtil";
import { VERTIPORT_MANAGEMENT } from "./serviceEndpoints";

const route = `${VERTIPORT_MANAGEMENT}/regions`;
const routeCoord = `${VERTIPORT_MANAGEMENT}/regions/coordinate-calculated`;

export const REGION_PAGE_SIZE = 10;

export const useCreateRegion = () => useCreateService<RegionCreate, Region>({ route });

export const useGetRegion = (id: string, loadImages: boolean = false) =>
    useGetService<Region>({ route, resourceId: id, params: { loadImages: loadImages.toString() } });

export const useGetRegionNew = () => useGetService<Region>({ route, resourceId: "", params: { loadImages: "true" } });

export const useGetRegionWithCoordinates = (vertiportLatitude: number, vertiprotLongitude: number) =>
    useGetAllService<String>({
        params: {
            latitude: vertiportLatitude,
            longitude: vertiprotLongitude,
        },
        route: routeCoord,
    });

export const useGetRegions = (page: number) =>
    useGetAllService<Region>({
        params: {
            page,
            size: REGION_PAGE_SIZE,
        },
        route,
    });

export const useGetAllRegionsManual = () => {
    return useGetAllService<Region>({
        route: `${VERTIPORT_MANAGEMENT}/regions`,
        options: {
            manual: true,
        },
    });
};

export const useGetAllRegions = (
    pageNumber: number = 1,
    orderByParameter?: string,
    filterString?: FilterSet<Event>,
    pageSize: number = REGION_PAGE_SIZE
) =>
    useGetAllService<Region>({
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

type GetAllRegionsOptions = { manual: boolean };

export const useGetAllRegionsOptions = (options?: GetAllRegionsOptions) =>
    useGetAllService<Region>({
        params: {
            limit: 100,
        },
        options: { manual: options?.manual ?? false },
        route,
    });

export const useDeleteRegion = () => useDeleteService({ route });

export const useUpdateRegion = () => useUpdateService({ route });
