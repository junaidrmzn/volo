import { useGetAllService } from "@voloiq/service";
import { StringPair } from "../common/apiModels";
import { vertiportManagementBaseUrl } from "../vertiportManagementBaseUrl";

type UseGetServicesOptions = {
    manual: boolean;
};

export const useGetServices = (options: UseGetServicesOptions) => {
    return useGetAllService<StringPair>({
        route: `${vertiportManagementBaseUrl}/vertiports/services`,
        params: {
            page: 1,
            size: 100,
            orderBy: "name",
        },
        options,
    });
};
