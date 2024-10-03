import { AircraftType } from "@voloiq-typescript-api/aircraft-management-types";
import { useGetAllService } from "@voloiq/service";
import { networkSchedulingManagementBaseUrl } from "../networkSchedulingManagementBaseUrl";

type UseGetAircraftTypeOptions = {
    manual: boolean;
};

export const useGetAircraftTypes = (options: UseGetAircraftTypeOptions) => {
    return useGetAllService<AircraftType>({
        route: `${networkSchedulingManagementBaseUrl}/aircraft-types`,
        params: {
            page: 1,
            size: 100,
        },
        options,
    });
};
