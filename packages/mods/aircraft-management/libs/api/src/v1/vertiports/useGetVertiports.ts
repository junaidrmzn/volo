import { Vertiport } from "@voloiq-typescript-api/vertiport-management-types";
import { useGetAllService } from "@voloiq/service";
import { aircraftManagementBaseUrl } from "../aircraftManagementBaseUrl";

type UseGetVertiportsOptions = {
    manual: boolean;
};

export const useGetVertiports = (options: UseGetVertiportsOptions) => {
    return useGetAllService<Vertiport>({
        route: `${aircraftManagementBaseUrl}/vertiports`,
        params: {
            page: 1,
            size: 100,
            orderBy: "name",
        },
        options,
    });
};
