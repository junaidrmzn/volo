import type { RouteEnergySettings } from "@voloiq-typescript-api/flight-planning-types";
import { useEffect, useState } from "react";
import { useSelectedRoute } from "../../selected-route";

export const useSocSettings = () => {
    const { selectedRoute } = useSelectedRoute();
    const [socSettings, setSocSettings] = useState<RouteEnergySettings>({});
    useEffect(() => {
        if (selectedRoute && selectedRoute.routeEnergySettings) {
            setSocSettings(selectedRoute.routeEnergySettings);
        }
    }, [selectedRoute]);
    return { socSettings, setSocSettings };
};
