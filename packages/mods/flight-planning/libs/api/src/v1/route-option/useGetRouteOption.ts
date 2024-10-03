import { useGetService } from "@voloiq/service";
import { RouteOption } from "./models";

type UseGetRouteOptionOptions = {
    routeOptionId: string | number;
    manual: boolean;
};
export const useGetRouteOption = (options: UseGetRouteOptionOptions) => {
    const { routeOptionId, manual } = options;

    return useGetService<RouteOption>({
        route: `/route-options/${routeOptionId}`,
        resourceId: "",
        options: { manual },
    });
};
