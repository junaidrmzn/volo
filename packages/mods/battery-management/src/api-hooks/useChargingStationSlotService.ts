import type {
    ChargingStationSlot,
    ChargingStationSlotCreate,
    ChargingStationSlotUpdate,
} from "@voloiq-typescript-api/battery-management-types";
import { useCreateService, useDeleteService, useGetAllService, useGetService, useUpdateService } from "@voloiq/service";
import { BATTERY_MANAGEMENT } from "./serviceEndpoints";

const route = `${BATTERY_MANAGEMENT}/charging-station-slots`;

export const CHARGING_STATION_SLOT_PAGE_SIZE = 10;

export const useCreateChargingStationSlot = () =>
    useCreateService<ChargingStationSlotCreate, ChargingStationSlot>({ route });

export const useGetChargingStationSlot = () =>
    useGetService<ChargingStationSlot>({ route, resourceId: "", options: { manual: true } });

export const useGetChargingStationSlots = () =>
    useGetAllService<ChargingStationSlot>({
        route,
        options: {
            manual: true,
        },
    });

export const useDeleteChargingStationSlot = () => useDeleteService({ route });

export const useUpdateChargingStationSlot = (resourceId: string) =>
    useUpdateService<ChargingStationSlotUpdate, ChargingStationSlot>({ route: `${route}/${resourceId}` });
