import { Feature, GeometryTypes, Properties } from "@turf/turf";
import type {
    FeaturesCoordinates,
    GeoJsonSource,
    GeoJsonType,
    LayerProperties,
    VoloiqMap,
} from "../components/Map/types";

/* eslint no-underscore-dangle: 0 */
const moveLayerToTop = (map: VoloiqMap, layerId: string): void => {
    const orderArray = map.style._order;
    const lastLayer = orderArray[-1];
    if (orderArray.includes(layerId) && orderArray[-1] !== layerId) map.moveLayer(layerId, lastLayer);
};
const createFeaturesArray = (
    featuresData: { coordinates: FeaturesCoordinates; properties: Properties }[],
    featureType: GeometryTypes
): Feature[] =>
    featuresData.map((feature) => ({
        type: "Feature",
        geometry: { type: featureType, coordinates: feature.coordinates },
        properties: feature.properties,
    }));

export const createLayerFromGeoJson = (
    map: VoloiqMap,
    featuresData: {
        coordinates: FeaturesCoordinates;
        properties: Properties;
    }[],
    featureType: GeometryTypes,
    layerProperties: LayerProperties,
    beforeId?: string
) => {
    if (layerProperties && layerProperties.source) {
        const geojson = {
            type: "FeatureCollection",
            features: createFeaturesArray(featuresData, featureType),
        };
        const source = map.getSource(layerProperties.source) as GeoJsonSource;
        if (source) {
            source.setData(geojson as GeoJsonType);
        } else {
            map.addSource(layerProperties.source, {
                type: "geojson",
                data: geojson,
            });
        }
        moveLayerToTop(map, "waypoints-layer");
        if (!map.getLayer(layerProperties.id)) {
            map.addLayerToMap?.(map, layerProperties, "geojson", undefined, beforeId);
        }
    }
};
