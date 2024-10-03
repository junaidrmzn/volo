import type { AtaIspec } from "@voloiq-typescript-api/fti-types";
import { useGetAllService } from "@voloiq/service";

const route = "/ata-ispecs";

export const useGetAllAtaISpecs = () =>
    useGetAllService<AtaIspec>({
        route,
        params: {
            size: 100,
            orderBy: "label:asc",
        },
    });

export const useGetAllAtaISpecsManual = () =>
    useGetAllService<AtaIspec>({
        route,
        options: {
            manual: true,
        },
        params: {
            size: 100,
            orderBy: "label:asc",
        },
    });
