import { useEffect, useState } from "react";
import { useIsAuthorizedTo } from "@voloiq/auth";
import { useGetConductedRouteEnergyTemperature, useGetRouteFullEnergy } from "../../../api-hooks";
import { useSelectedRoute } from "../../selected-route";

export const useBatteryTemperatureChart = (setIsLoading: (isLoading: boolean) => void) => {
    const [isTemperatureGraphDisplayed, setTemperatureGraphDisplayed] = useState(true);

    const { selectedRoute } = useSelectedRoute();

    const canReadConductedRouteGraph = useIsAuthorizedTo(["read"], ["ConductedRouteGraph"]);
    const conductedRouteQuery = useGetConductedRouteEnergyTemperature(
        selectedRoute?.id || 0,
        canReadConductedRouteGraph
    );
    const temperatureQuery = useGetRouteFullEnergy(selectedRoute?.id);

    useEffect(() => {
        setIsLoading(temperatureQuery.isFetching || conductedRouteQuery.isFetching);
    }, [setIsLoading, temperatureQuery.isFetching, conductedRouteQuery.isFetching]);

    return {
        isTemperatureGraphDisplayed,
        setTemperatureGraphDisplayed,
    };
};
