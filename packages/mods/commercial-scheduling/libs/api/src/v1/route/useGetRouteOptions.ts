import { useGetAllService } from "@voloiq/service";
import { ROUTE_OPTION_BASE_URL } from "../../serviceEndpoints";
import { RouteOption } from "./apiModels";

type useGetRouteOptionsOptions = {
    manual?: boolean;
};

export const useGetRouteOptions = (options?: useGetRouteOptionsOptions) => {
    return useGetAllService<RouteOption>({
        route: ROUTE_OPTION_BASE_URL,
        options,
    });
};
