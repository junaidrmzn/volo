import type { AircraftZone } from "@voloiq-typescript-api/fti-types";
import { useGetAllService } from "@voloiq/service";

const route = "/aircraft-zones";

export const useGetAllAircraftZones = () =>
    useGetAllService<AircraftZone>({
        route,
        params: {
            size: 100,
            orderBy: "label:asc",
        },
    });

export const useGetAllAircraftZonesManual = () =>
    useGetAllService<AircraftZone>({
        route,
        options: {
            manual: true,
        },
        params: {
            size: 100,
            orderBy: "label:asc",
        },
    });
