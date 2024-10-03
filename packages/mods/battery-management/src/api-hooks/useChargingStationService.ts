import type {
    ChargingStation,
    ChargingStationCreate,
    ChargingStationUpdate,
} from "@voloiq-typescript-api/battery-management-types";
import { useCreateService, useDeleteService, useGetAllService, useGetService, useUpdateService } from "@voloiq/service";
import { BATTERY_MANAGEMENT } from "./serviceEndpoints";

const route = `${BATTERY_MANAGEMENT}/charging-stations`;

export const CHARGING_STATION_PAGE_SIZE = 10;

export const useCreateChargingStation = () => useCreateService<ChargingStationCreate, ChargingStation>({ route });

export const useGetChargingStation = () =>
    useGetService<ChargingStation>({ route, resourceId: "", options: { manual: true } });

export const useGetChargingStations = () =>
    useGetAllService<ChargingStation>({
        route,
    });

export const useDeleteChargingStation = () => useDeleteService({ route });

export const useUpdateChargingStation = (resourceId: string) =>
    useUpdateService<ChargingStationUpdate, ChargingStation>({ route: `${route}/${resourceId}` });
