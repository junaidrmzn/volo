import { useGetAllService } from "@voloiq/service";
import { Aircraft } from "../missions/availability/apiModels";
import { networkSchedulingManagementBaseUrl } from "../networkSchedulingManagementBaseUrl";

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
