import { Route, useGetFullEnvelopeValidationQuery } from "@voloiq/flight-planning-api/v1";
import { useGetRouteFullEnergy, useGetRouteTerrainData } from "../../../../api-hooks";

export const useWaypointList = (selectedRoute: Route) => {
    const { clearFullEnergyCache } = useGetRouteFullEnergy(selectedRoute.id);
    const { invalidateRouteTerrainData } = useGetRouteTerrainData(selectedRoute.id);
    const { clearFullEnvelopeValidationCache } = useGetFullEnvelopeValidationQuery({ routeId: selectedRoute.id });

    const invalidateRoute = () => {
        clearFullEnergyCache();
        invalidateRouteTerrainData();
        clearFullEnvelopeValidationCache();
    };

    return { invalidateRoute };
};
