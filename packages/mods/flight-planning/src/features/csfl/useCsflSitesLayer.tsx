import { Feature } from "@turf/turf";
import type { CsflSite, RouteCsflSitesLink } from "@voloiq-typescript-api/flight-planning-types";
import { useEffect } from "react";
import { Route } from "@voloiq/flight-planning-api/v1";
import { CircleLayerSpec, GeomType, returnVoloiqMap, useMapContext, useMapEvent } from "@voloiq/map";
import { KNOTS_TO_METERS_PER_SECOND, metersToPixelsAtMaxZoom } from "../../utils";

const filterSelectedCsflSite = (csflSites: CsflSite[], selectedCsflSites: RouteCsflSitesLink[]): Feature[] => {
    const filteredSites = csflSites.filter((csflSite) =>
        selectedCsflSites.some((selectedSite) => csflSite.id === selectedSite.csflSiteId)
    );

    return filteredSites.map(
        (site) =>
            ({
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: [+site.lng.toFixed(4), +site.lat.toFixed(4)],
                },
            } as Feature)
    );
};

export const useCsflSitesLayer = (
    csflSites: CsflSite[] | undefined,
    selectedCsflSites: RouteCsflSitesLink[] | undefined,
    selectedRoute: Route,
    showCsflSites: boolean
) => {
    const { map, isReady } = useMapContext();
    const currentMap = returnVoloiqMap(map);
    const CSFL_SOURCE = "csfl-circle-source";
    const CSFL_CIRCLE_ID = "csfl-circle";
    const CSFL_CIRCLE_LAYER = "csfl-circle-layer";
    const CSFL_MARKERS_LAYER = "csfl-markers";

    let csflCoverageRadiusInMeters = 0;
    if (selectedRoute.routeEnergySettings?.maxTimeToCsfl && selectedRoute?.routeEnergySettings?.airspeedCsfl) {
        const maxTimeToCsflInSeconds = selectedRoute.routeEnergySettings.maxTimeToCsfl * 60;
        const airSpeedCsflInMetersPerSecond =
            selectedRoute.routeEnergySettings.airspeedCsfl * KNOTS_TO_METERS_PER_SECOND;
        csflCoverageRadiusInMeters = maxTimeToCsflInSeconds * airSpeedCsflInMetersPerSecond;
    }

    if (currentMap && !currentMap.getLayer(CSFL_CIRCLE_LAYER) && showCsflSites) {
        const filteredCsflSites =
            csflSites && selectedCsflSites && filterSelectedCsflSite(csflSites, selectedCsflSites);
        const referenceLatitude = currentMap.getCenter().lat;
        const csflLayerProperties = {
            id: CSFL_CIRCLE_LAYER,
            type: "circle" as GeomType,
            source: CSFL_SOURCE,
            paint: {
                "circle-color": "transparent",
                "circle-stroke-color": "red",
                "circle-stroke-width": 3,
                "circle-radius": [
                    "interpolate",
                    ["exponential", 2],
                    ["zoom"],
                    0,
                    0,
                    22,
                    metersToPixelsAtMaxZoom(referenceLatitude, csflCoverageRadiusInMeters),
                ],
            },
        };

        currentMap.addLayerToMap?.(currentMap, csflLayerProperties as CircleLayerSpec, "geojson", filteredCsflSites);
    }
    useEffect((): void => {
        if (!isReady || !currentMap) return;
        if (currentMap.getLayer(CSFL_CIRCLE_LAYER) && !showCsflSites) {
            currentMap.removeMapLayer?.(currentMap, CSFL_CIRCLE_ID);
            currentMap.removeMapLayer?.(currentMap, CSFL_MARKERS_LAYER);
        }
    }, [isReady, map, showCsflSites]);

    useMapEvent("render", () => {
        if (!currentMap) return;
        const filteredCsflSites =
            csflSites && selectedCsflSites && filterSelectedCsflSite(csflSites, selectedCsflSites);
        if (filteredCsflSites) currentMap.updateSourceData?.(currentMap, filteredCsflSites, CSFL_SOURCE);
    });
};
