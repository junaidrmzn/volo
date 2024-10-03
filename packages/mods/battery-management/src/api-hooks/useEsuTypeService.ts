import type { EsuType, EsuTypeCreate } from "@voloiq-typescript-api/battery-management-types";
import { useCreateService, useDeleteService, useGetAllService, useGetService, useUpdateService } from "@voloiq/service";
import { BATTERY_MANAGEMENT } from "./serviceEndpoints";

const route = `${BATTERY_MANAGEMENT}/esu-types`;

export const ESU_TYPE_PAGE_SIZE = 10;

export const useCreateEsuType = () => useCreateService<EsuTypeCreate, EsuType>({ route });

export const useGetEsuType = (id: string) => useGetService<EsuType>({ route, resourceId: id });

export const useGetEsuTypes = (page: number, customSize?: number) =>
    useGetAllService<EsuType>({
        params: {
            page,
            size: customSize || ESU_TYPE_PAGE_SIZE,
        },
        route,
    });

export const useDeleteEsuType = () => useDeleteService({ route });

export const useUpdateEsuType = () => useUpdateService({ route });
