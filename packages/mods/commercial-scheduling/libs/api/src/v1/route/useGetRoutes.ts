import { useGetAllService } from "@voloiq/service";
import { ROUTE_OPTION_BASE_URL } from "../../serviceEndpoints";
import { Route } from "./apiModels";

type UseGetRoutesOptions = {
    manual?: boolean;
};

export const useGetRoutes = (options?: UseGetRoutesOptions) => {
    return useGetAllService<Route>({
        route: `${ROUTE_OPTION_BASE_URL}`,
        options,
    });
};
