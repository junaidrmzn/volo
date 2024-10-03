import type { Region } from "@voloiq-typescript-api/vertiport-management-types";
import { useGetAllService } from "@voloiq/service";
import { crewManagementBaseUrl } from "../crewManagementBaseUrl";

type UseGetRegionsOptions = {
    manual: boolean;
};

export const useGetRegions = (options: UseGetRegionsOptions) => {
    return useGetAllService<Region>({
        route: `${crewManagementBaseUrl}/regions`,
        params: {
            page: 1,
            size: 100,
            orderBy: "name",
        },
        options,
    });
};
