import { FeatureCollection, Geometry } from "@turf/turf";
import { useEffect } from "react";
import { useMapContext, useMapEvent } from "@voloiq/map";
import type { routeType } from "./types";

/**
 * adding source and layer of route on map
 * @returns
 */
export const createLayer = (
    map: maplibregl.Map,
    id: number | string,
    color: string,
    routeType: routeType,
    width?: number,
    opacity?: number
) => {
    const mapLayerSource = map.getSource(`${id}-source`);
    if (mapLayerSource && Object.keys(mapLayerSource).length > 0) return;

    // TODO: refactor this to use new functions of map lib for creating geojson linestrings
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
    greatCircleCoordinates: FeatureCollection<Geometry>,
    id: number | string,
    map: maplibregl.Map
) => {
    const mapLayerSource = map.getSource(`${id}-source`);
    if (mapLayerSource && Object.keys(mapLayerSource).length > 0 && greatCircleCoordinates.features.length > 0) {
        // @ts-ignore https://github.com/DefinitelyTyped/DefinitelyTyped/issues/14877
        mapLayerSource.setData(greatCircleCoordinates);
    }
};

export const removeLayer = (map: maplibregl.Map, id: number | string) => {
    if (map.getLayer(`${id}-layer`)) map.removeLayer(`${id}-layer`);
    if (map.getSource(`${id}-source`)) map.removeSource(`${id}-source`);
};

const defaultRouteCoordinatesFilter = (coordinates: FeatureCollection<Geometry>) => {
    return coordinates;
};

type UseDisplayRouteOptions = {
    greatCircleCoordinates: FeatureCollection<Geometry>;
    displayId: number | string;
    routeColor: string;
    routeType: routeType;
    isWaypointEditable?: boolean;
    width?: number;
    opacity?: number;
    routeCoordinatesFilter?: (coordinates: FeatureCollection<Geometry>) => FeatureCollection<Geometry>;
    isLoading?: boolean;
};

export const useDisplayRouteOld = (options: UseDisplayRouteOptions) => {
    const {
        greatCircleCoordinates,
        displayId,
        routeColor,
        routeType,
        isWaypointEditable,
        width,
        opacity,
        routeCoordinatesFilter = defaultRouteCoordinatesFilter,
        isLoading,
    } = options;
    const { map, isReady } = useMapContext();

    /** initial draw route on map */
    useEffect(() => {
        if (!isReady || !map) return () => {};
        createLayer(map, displayId, routeColor, routeType, width, opacity);
        return () => {
            removeLayer(map, displayId);
        };
    }, [routeColor, isReady, displayId, map, routeType, width, opacity]);

    /** update source data with great circle coordinates for route */
    useEffect(() => {
        if (!isReady || !map) return;
        const filteredCoordinates = routeCoordinatesFilter(greatCircleCoordinates);
        updateLayer(filteredCoordinates, displayId, map);
    }, [displayId, greatCircleCoordinates, isReady, map, routeCoordinatesFilter]);

    /** update route drawing by change of map style */
    useMapEvent("styledata", () => {
        if (!map) return;
        const filteredCoordinates = routeCoordinatesFilter(greatCircleCoordinates);
        createLayer(map, displayId, routeColor, routeType, width, opacity);
        updateLayer(filteredCoordinates, displayId, map);
    });

    /** update pointer when switching mapActionMode */
    useEffect(() => {
        if (!map || !isWaypointEditable || routeType === "template") return;

        const setCursor = () => {
            map.getCanvas().style.cursor = isLoading ? "wait" : routeType === "displayed" ? "pointer" : "crosshair";
        };

        (map as maplibregl.Map).on("mouseover", `${displayId}-layer`, setCursor);
        (map as maplibregl.Map).on("mouseleave", `${displayId}-layer`, () => {
            map.getCanvas().style.cursor = "";
        });

        setCursor();
    }, [displayId, map, routeType, isWaypointEditable, isLoading]);
};
