import type { ChargingProfile, ChargingProfileCreate } from "@voloiq-typescript-api/battery-management-types";
import { useCreateService, useDeleteService, useGetAllService, useGetService, useUpdateService } from "@voloiq/service";
import { BATTERY_MANAGEMENT } from "./serviceEndpoints";

const route = `${BATTERY_MANAGEMENT}/charging-profiles`;

export const CHARGING_PROFILE_PAGE_SIZE = 10;

export const useCreateChargingProfile = () => useCreateService<ChargingProfileCreate, ChargingProfile>({ route });

export const useGetChargingProfile = (id: string) => useGetService<ChargingProfile>({ route, resourceId: id });

export const useGetChargingProfiles = (page: number) =>
    useGetAllService<ChargingProfile>({
        params: {
            page,
            size: CHARGING_PROFILE_PAGE_SIZE,
        },
        route,
    });

export const useDeleteChargingProfile = () => useDeleteService({ route });

export const useUpdateChargingProfile = () => useUpdateService({ route });
