import { useGetService } from "@voloiq/service";
import type { RouteComparison } from "./models";

type UseGetRouteComparisonOptions = {
    routeId: string | number;
    manual: boolean;
};

export const useGetRouteComparison = (options: UseGetRouteComparisonOptions) => {
    const { routeId, manual } = options;

    return useGetService<RouteComparison>({
        route: `/routes/${routeId}/conducted-route`,
        resourceId: "",
        options: { manual },
    });
};
