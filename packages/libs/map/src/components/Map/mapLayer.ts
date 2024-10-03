import * as turf from "@turf/turf";
import { Feature, FeatureCollection } from "@turf/turf";
import type { AirspaceFeatureAllOf } from "@voloiq-typescript-api/flight-planning-types";
import { match } from "ts-pattern";
import type {
    GeoJsonSource,
    GeoJsonSourceType,
    GeoJsonType,
    LayerProperties,
    LayerSpec,
    RouteType,
    VoloiqMap,
} from "./types";

const setFeatureType = (Featuretype: "symbol" | "line" | "fill" | "circle") =>
    match(Featuretype)
        .with("symbol", () => "Point")
        .with("circle", () => "Point")
        .with("line", () => "LineString")
        .with("fill", () => "Polygon")
        .exhaustive();

export const addLayerToMap = (
    map: VoloiqMap,
    layerProperties: LayerProperties,
    sourceType: GeoJsonSourceType = "geojson",
    data?: AirspaceFeatureAllOf[] | Feature[],
    beforeId?: string
) => {
    // initially add empty source
    if (!layerProperties.source) {
        const mapLayerSource = map.getSource(`${layerProperties.id}-source`);
        if (mapLayerSource && Object.keys(mapLayerSource).length > 0) return;
        map.addSource(`${layerProperties.id}-source`, {
            type: "geojson",
            data: {
                type: "FeatureCollection",
                features: [
                    {
                        type: "Feature",
                        properties: {},
                        geometry: {
                            type: setFeatureType(layerProperties.type),
                            coordinates: [],
                        },
                    },
                ],
            },
        });
        layerProperties.source = `${layerProperties.id}-source`;
        layerProperties.id = `${layerProperties.id}-layer`;
    }
    const mapLayerSource = map.getSource(layerProperties.source);
    if (!mapLayerSource)
        map.addSource(`${layerProperties.source}`, {
            type: sourceType,
            data: {
                type: "FeatureCollection",
                features: data ?? [],
            },
        });
    map.addLayer(layerProperties as LayerSpec, beforeId);
};

export const createLayer = (
    map: maplibregl.Map,
    id: number | string,
    color: string,
    routeType: RouteType,
    width?: number,
    opacity?: number
) => {
    const mapLayerSource = map.getSource(`${id}-source`);
    if (mapLayerSource && Object.keys(mapLayerSource).length > 0) return;

    // initially add empty source
    map.addSource(`${id}-source`, {
        type: "geojson",
        data: {
            type: "FeatureCollection",
            features: [
                {
                    type: "Feature",
                    properties: {},
                    geometry: {
                        type: "LineString",
                        coordinates: [],
                    },
                },
            ],
        },
    });

    // dashed line style for template previews
    const lineDashArray = routeType === "template" ? [1, 1.5] : [1];
    // configuration for route comparison
    const lineWidth = width && width > 0 ? width : 10; // pixels
    const lineOpacity = opacity && opacity > 0 ? opacity : 0.8;

    map.addLayer({
        id: `${id}-layer`,
        type: "line",
        source: `${id}-source`,
        layout: {
            "line-join": "round",
            "line-cap": "round",
        },
        paint: {
            "line-color": color,
            "line-opacity": lineOpacity,
            "line-width": lineWidth,
            "line-dasharray": lineDashArray,
        },
    });

    if (routeType === "displayed") {
        map.on("mouseover", `${id}-layer`, () => {
            map.getCanvas().style.cursor = "pointer";
        });
        map.on("mouseleave", `${id}-layer`, () => {
            map.getCanvas().style.cursor = "";
        });
    }
};

export const updateLayer = (
    map: maplibregl.Map | VoloiqMap,
    features: turf.helpers.FeatureCollection,
    id: number | string
) => {
    const mapLayerSource = map.getSource(`${id}-source`) as GeoJsonSource;
    if (mapLayerSource && Object.keys(mapLayerSource).length > 0 && features.features.length > 0) {
        /* // @ts-ignore https://github.com/DefinitelyTyped/DefinitelyTyped/issues/14877 */
        mapLayerSource.setData(features as GeoJsonType);
    }
};

export const updateSourceData = (
    map: VoloiqMap,
    features: AirspaceFeatureAllOf[] | Feature[] | Feature | FeatureCollection,
    sourceId: string
) => {
    const mapLayerSource = map.getSource(sourceId) as GeoJsonSource;
    if (mapLayerSource && Object.keys(mapLayerSource).length > 0) {
        const geojson = {
            type: "FeatureCollection",
            features: Array.isArray(features) ? features : [features],
        };
        mapLayerSource.setData(geojson as GeoJsonType);
    }
};

export const removeLayer = (map: maplibregl.Map, id: number | string) => {
    if (map.getLayer(`${id}-layer`)) map.removeLayer(`${id}-layer`);
    if (map.getSource(`${id}-source`)) map.removeSource(`${id}-source`);
};
