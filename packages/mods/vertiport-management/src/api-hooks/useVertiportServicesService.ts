import { useGetAllService } from "@voloiq/service";
import type { StringPair } from "@voloiq/vertiport-management-api/v1";
import { VERTIPORT_MANAGEMENT } from "./serviceEndpoints";

const route = `${VERTIPORT_MANAGEMENT}/vertiports/services`;
type GetAllServicesOptions = { manual: boolean };

export const VERTIPORT_SERVICE_PAGE_SIZE = 10;

export const useGetVertiportServices = (page: number) =>
    useGetAllService<StringPair>({
        params: {
            page,
            size: VERTIPORT_SERVICE_PAGE_SIZE,
        },
        route,
    });

export const useGetAllServices = (options?: GetAllServicesOptions) =>
    useGetAllService<StringPair>({
        options: { manual: options?.manual ?? false },
        route,
    });
