import * as turf from "@turf/turf";
import type { LineString, MultiLineString, Properties } from "@turf/turf";
import type { LngLat } from "maplibre-gl";
import { useEffect } from "react";
import { useMapContext, useMapEvent } from "@voloiq/map";

export const calculateGreatCircleSegment = (startCoord: turf.helpers.Position, endCoord: turf.helpers.Position) => {
    const start = turf.point(startCoord);
    const end = turf.point(endCoord);
    // add custom properties to identify route segments

    const segment = turf.greatCircle(start, end);
    return segment;
};

/**
 * calculates geodesic lines between a set of coordinates
 * @returns
 */
export const calculateGreatCircleRoute = (
    flightPath: LngLat[]
): turf.helpers.FeatureCollection<LineString | MultiLineString, Properties> => {
    // spare the heavy calculation if there is no route to calculate
    if (flightPath.length < 2) return turf.featureCollection([]);
    const flightPathAsPosition = flightPath.map((pathSegment) => [pathSegment.lng, pathSegment.lat]);
    const data = [];
    for (let index = 0; index < flightPathAsPosition.length - 1; index++) {
        const segment = calculateGreatCircleSegment(flightPathAsPosition[index]!, flightPathAsPosition[index + 1]!);
        data.push(segment);
    }
    return turf.featureCollection(data);
};

/**
 * adding source and layer of route on map
 * @returns
 */
export const createLayer = (map: maplibregl.Map, id: number | string, color: string) => {
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
            "line-opacity": 0.8,
            "line-width": 9,
        },
    });
};

export const updateLayer = (
    flightPath: turf.helpers.FeatureCollection<LineString | MultiLineString, Properties>,
    id: number | string,
    map: maplibregl.Map
) => {
    const mapLayerSource = map.getSource(`${id}-source`);
    if (mapLayerSource && Object.keys(mapLayerSource).length > 0 && flightPath.features.length > 0) {
        // @ts-ignore https://github.com/DefinitelyTyped/DefinitelyTyped/issues/14877
        mapLayerSource.setData(flightPath);
    }
};

export const removeLayer = (map: maplibregl.Map, id: number | string) => {
    if (map.getLayer(`${id}-layer`)) map.removeLayer(`${id}-layer`);
    if (map.getSource(`${id}-source`)) map.removeSource(`${id}-source`);
};

export const useDisplayFlightPathLayer = (flightPath: LngLat[], displayId: number | string, color: string) => {
    const { map, isReady } = useMapContext();
    /**
     * initial draw route on map
     *
     */
    useEffect(() => {
        if (!isReady || !map) return () => {};
        createLayer(map, displayId, color);
        return () => {
            removeLayer(map, displayId);
        };
    }, [color, isReady, displayId, map]);

    /**
     * update source data with great circle coordinates
     */
    useEffect(() => {
        if (!isReady || !map) return;
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
        updateLayer(calculateGreatCircleRoute(flightPath), displayId, map);
    }, [displayId, flightPath, isReady, map]);

    /**
     * update route drawing by change of map style
     */
    useMapEvent("styledata", () => {
        if (!map) return;
        createLayer(map, displayId, color);
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
        updateLayer(calculateGreatCircleRoute(flightPath), displayId, map);
    });
};
