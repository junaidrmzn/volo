import type { Workgroup } from "@voloiq-typescript-api/fti-types";
import { useGetAllService } from "@voloiq/service";

const route = "/workgroups";

export const useGetAllWorkgroups = () =>
    useGetAllService<Workgroup>({
        route,
        params: {
            size: 100,
            orderBy: "label:asc",
        },
    });

export const useGetAllWorkgroupsManual = () =>
    useGetAllService<Workgroup>({
        route,
        options: {
            manual: true,
        },
        params: {
            size: 100,
            orderBy: "label:asc",
        },
    });
