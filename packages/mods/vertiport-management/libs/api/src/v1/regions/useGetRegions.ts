import { useGetAllService } from "@voloiq/service";
import { vertiportManagementBaseUrl } from "../vertiportManagementBaseUrl";
import type { Region } from "./apiModels";

type UseGetRegionsOptions = {
    manual: boolean;
};

export const useGetRegions = (options: UseGetRegionsOptions) => {
    return useGetAllService<Region>({
        route: `${vertiportManagementBaseUrl}/regions`,
        params: {
            page: 1,
            size: 100,
            orderBy: "name",
        },
        options,
    });
};
