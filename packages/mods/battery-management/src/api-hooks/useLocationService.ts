import type { Location, LocationCreate } from "@voloiq-typescript-api/battery-management-types";
import { useCreateService, useDeleteService, useGetAllService, useGetService, useUpdateService } from "@voloiq/service";
import { BATTERY_MANAGEMENT } from "./serviceEndpoints";

const route = `${BATTERY_MANAGEMENT}/locations`;

export const LOCATION_PAGE_SIZE = 10;

export const useCreateLocation = () => useCreateService<LocationCreate, Location>({ route });

export const useGetLocation = (id: string) => useGetService<Location>({ route, resourceId: id });

export const useGetLocations = (page: number) =>
    useGetAllService<Location>({
        params: {
            page,
            size: LOCATION_PAGE_SIZE,
        },
        route,
    });

export const useDeleteLocation = () => useDeleteService({ route });

export const useUpdateLocation = () => useUpdateService({ route });
