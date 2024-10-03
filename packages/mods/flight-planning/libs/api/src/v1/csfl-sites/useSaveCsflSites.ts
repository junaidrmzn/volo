import { useCreateService } from "@voloiq/service";
import { SaveSelectedCsflSites, SelectedCsflSite } from "./models";

type UseSaveCsflSitesOptions = {
    routeId: string | number;
};

export const useSaveCsflSites = (options: UseSaveCsflSitesOptions) => {
    const { routeId } = options;

    return useCreateService<SaveSelectedCsflSites, SelectedCsflSite>({
        route: `/routes/${routeId}/selected-csfl-sites`,
    });
};
