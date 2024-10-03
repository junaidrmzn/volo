import type { Unit } from "@voloiq-typescript-api/fti-types";
import { useGetAllService } from "@voloiq/service";

const route = "/units";

export const useGetAllUnits = () =>
    useGetAllService<Unit>({
        route,
        params: {
            size: 100,
            orderBy: "label:asc",
        },
    });

export const useGetAllUnitsManual = () =>
    useGetAllService<Unit>({
        route,
        options: {
            manual: true,
        },
        params: {
            size: 100,
            orderBy: "label:asc",
        },
    });
