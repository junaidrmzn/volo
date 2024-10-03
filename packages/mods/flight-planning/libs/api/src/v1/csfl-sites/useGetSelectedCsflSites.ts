import { useGetAllService } from "@voloiq/service";
import { SelectedCsflSite } from "./models";

type UseGetSelectedCsflSitesOptions = {
    routeId: string | number;
    manual: boolean;
};
export const useGetSelectedCsflSites = (options: UseGetSelectedCsflSitesOptions) => {
    const { routeId, manual } = options;

    return useGetAllService<SelectedCsflSite>({
        route: `/routes/${routeId}/selected-csfl-sites`,
        options: { manual },
    });
};
