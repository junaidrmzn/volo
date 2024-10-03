import * as turf from "@turf/turf";
import { useEffect } from "react";
import type { Coordinate } from "@voloiq/flight-planning-api/v1";
import { useMapContext, useMapEvent } from "@voloiq/map";

/**
 * adding source and layer of route on map
 * @returns
 */
export const createLayer = (
    map: maplibregl.Map,
    id: number | string,
    color: string,
    routeId: number,
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
                        type: "Polygon",
                        coordinates: [],
                    },
                },
            ],
        },
    });

    // configuration for route comparison
    const fillOpacity = opacity && opacity > 0 ? opacity : 0.8;

    // prepare zoom levels to add scale for different zoom levels (0-20)
    const zoomLevels = [];
    for (let index = 0; index <= 20; index++) {
        zoomLevels.push(index);
    }

    map.addLayer(
        {
            id: `${id}-layer`,
            type: "fill",
            source: `${id}-source`,
            layout: {},
            paint: {
                "fill-color": color,
                "fill-opacity": fillOpacity,
            },
        },
        `route-layer-${routeId}-layer` // make the deviation appear underneath the actualy route
    );
};

export const updateLayer = (deviationSegmentPolygon: Coordinate[], id: number | string, map: maplibregl.Map) => {
    const mapLayerSource = map.getSource(`${id}-source`);
    if (mapLayerSource && Object.keys(mapLayerSource).length > 0 && deviationSegmentPolygon.length > 4) {
        // @ts-ignore https://github.com/DefinitelyTyped/DefinitelyTyped/issues/14877
        mapLayerSource.setData(turf.polygon([deviationSegmentPolygon]));
    }
};

export const removeLayer = (map: maplibregl.Map, id: number | string) => {
    if (map.getLayer(`${id}-layer`)) map.removeLayer(`${id}-layer`);
    if (map.getSource(`${id}-source`)) map.removeSource(`${id}-source`);
};

export const useDisplayRouteDeviationLayer = (
    routeId: number | string,
    color: string,
    opacity?: number,
    deviationSegmentPolygons?: Coordinate[][]
) => {
    const { map, isReady } = useMapContext();
    /**
     * initial draw route on map
     *
     */
    useEffect(() => {
        if (!isReady || !map || !deviationSegmentPolygons) return () => {};
        for (const [index, deviationSegmentPolygon] of deviationSegmentPolygons.entries()) {
            const layerId = `deviation-route-${routeId}-segment-${index}`;
            if (!deviationSegmentPolygon || deviationSegmentPolygon.length < 2) continue;
            createLayer(map, layerId, color, +routeId, opacity);
        }
        return () => {
            for (const [index] of deviationSegmentPolygons.entries()) {
                const layerId = `deviation-route-${routeId}-segment-${index}`;
                removeLayer(map, layerId);
            }
        };
    }, [isReady, deviationSegmentPolygons, map, routeId, color, opacity]);

    /**
     * update source data with great circle coordinates
     */
    useEffect(() => {
        if (!isReady || !map || !deviationSegmentPolygons) return;
        for (const [index, deviationSegmentPolygon] of deviationSegmentPolygons.entries()) {
            const layerId = `deviation-route-${routeId}-segment-${index}`;
            updateLayer(deviationSegmentPolygon, layerId, map);
        }
    }, [routeId, deviationSegmentPolygons, isReady]);

    /**
     * update route drawing by change of map style
     */
    useMapEvent("styledata", () => {
        if (!isReady || !map || !deviationSegmentPolygons) return;
        for (const [index, deviationSegmentPolygon] of deviationSegmentPolygons.entries()) {
            const layerId = `deviation-route-${routeId}-segment-${index}`;
            if (!deviationSegmentPolygon[index] || deviationSegmentPolygon.length < 2) continue;
            createLayer(map, layerId, color, +routeId, opacity);
        }
        for (const [index, deviationSegment] of deviationSegmentPolygons.entries()) {
            const layerId = `deviation-route-${routeId}-segment-${index}`;
            updateLayer(deviationSegment, layerId, map);
        }
    });
};
