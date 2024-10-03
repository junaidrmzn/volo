import type { ChargingLog } from "@voloiq-typescript-api/battery-management-types";
import { useGetAllService, useGetService } from "@voloiq/service";
import { BATTERY_MANAGEMENT } from "./serviceEndpoints";

const route = `${BATTERY_MANAGEMENT}/charging-logs`;

export const useGetChargingLog = () => useGetService<ChargingLog>({ route, resourceId: "", options: { manual: true } });

export const useGetChargingLogs = () =>
    useGetAllService<ChargingLog>({
        route,
        options: {
            manual: true,
        },
    });
