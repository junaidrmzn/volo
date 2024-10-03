import type { SensorType } from "@voloiq-typescript-api/fti-types";
import { useGetAllService } from "@voloiq/service";

const route = "/sensor-types";

export const useGetAllSensorTypes = () =>
    useGetAllService<SensorType>({
        route,
        params: {
            size: 100,
            orderBy: "label:asc",
        },
    });

export const useGetAllSensorTypesManual = () =>
    useGetAllService<SensorType>({
        route,
        options: {
            manual: true,
        },
        params: {
            size: 100,
            orderBy: "label:asc",
        },
    });
