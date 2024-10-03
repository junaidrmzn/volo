import type { CsflSite } from "@voloiq-typescript-api/flight-planning-types";
import { MapMouseEvents, PointGeom, SymbolLayerSpec, VoloiqCustomDataType, VoloiqMap } from "@voloiq/map";
import { csflProperties } from "./types";

/* eslint no-underscore-dangle: 0 */
type CsflMarkerProps = {
    map: VoloiqMap;
    csflData?: CsflSite[];
    onClick?: (site: CsflSite) => void;
};

const createFeaturesArray = (featuresData: csflProperties[]): VoloiqCustomDataType[] =>
    featuresData.map((feature) => ({ coordinates: [feature.lng, feature.lat], properties: { ...feature } }));

export const csflMarkerLayer = (props: CsflMarkerProps): void => {
    const { map, csflData, onClick } = props;
    if (csflData && map) {
        const features = createFeaturesArray(csflData);

        const options = {
            id: "csfl-markers-layer",
            source: "csfl-markers-source",
            type: "symbol",
            layout: {
                "icon-image": ["case", ["==", ["get", "selected"], true], "selected-csfl", "csfl"],
                "icon-size": 1,
                "icon-allow-overlap": true,
            },
        };
        if (!map.getLayer(options.id)) {
            map.createLayerFromGeoJson?.(map, features, "Point", options as SymbolLayerSpec);
            map.on("mouseover", "csfl-markers-layer", (event: MapMouseEvents) => {
                event.preventDefault();
                map._canvas.style.cursor = "pointer";
            });

            map.on("mousedown", "csfl-markers-layer", (event: MapMouseEvents) => {
                event.preventDefault();
                map._canvas.style.cursor = "";
                const bbox: [PointGeom, PointGeom] = [
                    [event.point.x - 10, event.point.y - 10],
                    [event.point.x + 10, event.point.y + 10],
                ];
                const selectedFeatures = map.queryRenderedFeatures(bbox, {
                    layers: ["csfl-markers-layer"],
                });
                if (selectedFeatures[0]?.properties) {
                    onClick?.(selectedFeatures[0].properties as CsflSite);
                }
            });
            map.on("mouseleave", "csfl-markers-layer", (event: MapMouseEvents) => {
                event.preventDefault();
                map._canvas.style.cursor = "";
            });
        }
    }
};
