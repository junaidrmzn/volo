import { useUpdateService } from "@voloiq/service";
import { RouteOption, RouteOptionUpdate } from "./models";

type UseEditRouteOptionOptions = {
    routeOptionId: number;
    manual: boolean;
};
export const useEditRouteOption = (options: UseEditRouteOptionOptions) => {
    const { routeOptionId, manual } = options;

    return useUpdateService<RouteOptionUpdate, RouteOption>({
        route: `/route-options/${routeOptionId}`,
        options: { manual },
    });
};
