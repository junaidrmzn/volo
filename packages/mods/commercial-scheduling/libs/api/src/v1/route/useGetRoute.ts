import { useGetService } from "@voloiq/service";
import { ROUTE_BASE_URL } from "../../serviceEndpoints";
import { Route } from "./apiModels";

export const useGetRoute = (routeId: string) => {
    return useGetService<Route>({
        route: ROUTE_BASE_URL,
        resourceId: routeId,
        params: {
            withWaypoints: "false",
        },
    });
};
