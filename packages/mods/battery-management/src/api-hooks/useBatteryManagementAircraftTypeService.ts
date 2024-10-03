import type { AircraftType } from "@voloiq-typescript-api/battery-management-types";
import { useGetAllService } from "@voloiq/service";
import { BATTERY_MANAGEMENT } from "./serviceEndpoints";

// for now battery management maintains their own list of vtol types
const route = `${BATTERY_MANAGEMENT}/dependencies/aircraft-types`;

export const AIRCRAFT_TYPE_PAGE_SIZE = 10;

export const useGetAircraftTypes = (page: number) =>
    useGetAllService<AircraftType>({
        params: {
            page,
            size: AIRCRAFT_TYPE_PAGE_SIZE,
        },
        route,
    });
