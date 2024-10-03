import type { Esu, EsuCreate } from "@voloiq-typescript-api/battery-management-types";
import { useCreateService, useDeleteService, useGetAllService, useGetService, useUpdateService } from "@voloiq/service";
import { BATTERY_MANAGEMENT } from "./serviceEndpoints";

const route = `${BATTERY_MANAGEMENT}/esus`;

export const ESU_PAGE_SIZE = 10;

export const useCreateEsu = () => useCreateService<EsuCreate, Esu>({ route });

export const useGetEsu = (id: string) => useGetService<Esu>({ route, resourceId: id });

export const useGetEsus = (page: number) =>
    useGetAllService<Esu>({
        params: {
            page,
            size: ESU_PAGE_SIZE,
        },
        route,
    });

export const useDeleteEsu = () => useDeleteService({ route });

export const useUpdateEsu = () => useUpdateService({ route });
