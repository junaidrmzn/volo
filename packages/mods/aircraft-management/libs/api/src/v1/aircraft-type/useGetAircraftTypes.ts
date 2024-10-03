import { useGetAllService } from "@voloiq/service";
import { aircraftManagementBaseUrl } from "../aircraftManagementBaseUrl";
import { AircraftType } from "./apiModels";

type UseGetAircraftTypesOptions = {
    manual: boolean;
};

export const useGetAircraftTypes = (options: UseGetAircraftTypesOptions) => {
    return useGetAllService<AircraftType>({
        route: `${aircraftManagementBaseUrl}/aircraft-types`,
        params: {
            page: 1,
            size: 100,
            orderBy: "name",
        },
        options,
    });
};
