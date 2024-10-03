import type { Region } from "@voloiq-typescript-api/vertiport-management-types";
import { useGetAllService } from "@voloiq/service";
import { REGION_BASE_URL } from "../../serviceEndpoints";

type UseGetRegionsOptions = {
    manual: boolean;
};

export const useGetRegions = (options: UseGetRegionsOptions) => {
    return useGetAllService<Region>({
        route: REGION_BASE_URL,
        params: {
            page: 1,
            size: 100,
            orderBy: "name",
        },
        options,
    });
};
