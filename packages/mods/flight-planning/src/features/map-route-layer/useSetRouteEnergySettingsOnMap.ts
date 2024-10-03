import { useEffect } from "react";
import type { RouteEnergySettings } from "@voloiq/flight-planning-api/v1";
import { VoloiqMap } from "@voloiq/map";

export const useSetRouteEnergySettingsOnMap = (map: VoloiqMap, settings?: RouteEnergySettings) => {
    useEffect(() => {
        if (map) {
            map.horizontalObstacleClearance = settings?.horizontalObstacleClearance;
            map.verticalObstacleClearance = settings?.verticalObstacleClearance;
        }
    }, [settings]);
};
