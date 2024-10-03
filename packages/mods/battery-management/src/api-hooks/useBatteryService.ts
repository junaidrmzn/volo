import type { Battery, BatteryCreate, Esu } from "@voloiq-typescript-api/battery-management-types";
import { useCreateService, useDeleteService, useGetAllService, useGetService, useUpdateService } from "@voloiq/service";
import { BATTERY_MANAGEMENT } from "./serviceEndpoints";

const route = `${BATTERY_MANAGEMENT}/batteries`;

export const BATTERY_PAGE_SIZE = 10;

export const useCreateBattery = () => useCreateService<BatteryCreate, Battery>({ route });

export const useGetBattery = (id: string) => useGetService<Battery>({ route, resourceId: id });

export const useGetBatteries = (page: number) =>
    useGetAllService<Battery>({
        params: {
            page,
            size: BATTERY_PAGE_SIZE,
        },
        route,
    });

export const useGetAssignedEsus = (id: string) =>
    useGetAllService<Esu>({
        params: {
            size: BATTERY_PAGE_SIZE,
        },
        route,
        config: { url: `${route}/${id}/assigned-esus` },
    });

export const useGetAssignableEsus = (id: string) =>
    useGetAllService<Esu>({
        params: {
            size: 100,
        },
        route,
        config: { url: `${route}/${id}/assignable-esus` },
    });

export const useDeleteBattery = () => useDeleteService({ route });

export const useUpdateBattery = () => useUpdateService({ route });

export const useAssignEsus = (id: string) => useUpdateService({ route, config: { url: `${route}/${id}/esus/assign` } });

export const useUnassignEsus = (id: string) =>
    useUpdateService({ route, config: { url: `${route}/${id}/esus/unassign` } });
