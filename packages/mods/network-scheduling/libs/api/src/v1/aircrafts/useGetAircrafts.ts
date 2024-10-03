import { useGetAllService } from "@voloiq/service";
import { networkSchedulingManagementBaseUrl } from "../networkSchedulingManagementBaseUrl";
import { Aircraft } from "./apiModel";

type UseGetAircraftOptions = {
    manual: boolean;
};

export const useGetAircrafts = (options: UseGetAircraftOptions) => {
    return useGetAllService<Aircraft>({
        route: `${networkSchedulingManagementBaseUrl}/aircraft`,
        params: {
            page: 1,
            size: 100,
            orderBy: "msn",
        },
        options,
    });
};
