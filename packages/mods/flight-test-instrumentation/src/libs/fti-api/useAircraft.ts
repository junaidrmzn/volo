import type { Aircraft } from "@voloiq-typescript-api/fti-types";
import { useGetAllService } from "@voloiq/service";

const route = "/aircraft";

export const useGetAllAircraft = () =>
    useGetAllService<Aircraft>({
        route,
        params: {
            size: 100,
            orderBy: "msn:asc",
        },
    });

export const useGetAllAircraftManual = () =>
    useGetAllService<Aircraft>({
        route,
        options: {
            manual: true,
        },
        params: {
            size: 100,
            orderBy: "msn:asc",
        },
    });
