import { useGetService } from "@voloiq/service";
import { RouteFullEnergy, WindScenario } from "./models";

type useGetFullEnergyOptions = {
    routeId: string | number;
    windScenario?: WindScenario;
    manual?: boolean;
};
export const useGetFullEnergy = (options: useGetFullEnergyOptions) => {
    const { routeId, windScenario, manual = true } = options;

    return useGetService<RouteFullEnergy>({
        route: `/routes/${routeId}/energy`,
        resourceId: "",
        params: windScenario,
        options: { manual },
    });
};
