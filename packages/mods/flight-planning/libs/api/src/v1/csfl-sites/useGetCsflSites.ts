import { useGetAllService } from "@voloiq/service";
import { CsflSite } from "./models";

type UseGetCsflSitesOptions = {
    routeId: string | number;
    manual: boolean;
};
export const useGetCsflSites = (options: UseGetCsflSitesOptions) => {
    const { routeId, manual } = options;

    return useGetAllService<CsflSite>({
        route: `/routes/${routeId}/csfl-sites`,
        options: { manual },
    });
};
