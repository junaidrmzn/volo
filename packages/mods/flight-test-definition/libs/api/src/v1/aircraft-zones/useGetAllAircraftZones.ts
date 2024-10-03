import { useGetAllService } from "@voloiq/service";
import { AircraftZoneV1 } from "./apiModels";

const route = "/ftd/v1/aircraft-zones";

export const useGetAllAircraftZones = () =>
    useGetAllService<AircraftZoneV1>({
        route,
        params: {
            size: 100,
            orderBy: "label:asc",
        },
    });
