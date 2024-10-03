import { CorridorClearanceType } from "@voloiq/flight-planning-api/v1";
import { useGetService } from "@voloiq/service";

export const useGetCorridorClearanceData = (routeId?: string | number) => {
    return useGetService<CorridorClearanceType>({
        route: `/routes/${routeId}/corridor-clearance`,
        resourceId: "",
        options: {},
    });
};
