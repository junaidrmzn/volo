import { length } from "@turf/turf";
import type { Feature, Map, MapMouseEvent } from "maplibre-gl";
import { useEffect, useMemo, useState } from "react";
import { useMapEvent } from "../../Map/hooks";

type FeatureCollection = {
    type: "FeatureCollection";
    features: Feature[];
};

const pointsSourceId = "points-geojson";
const pointsLayerId = "measure-points";
const linesSourceId = "lines-geojson";
const linesLayerId = "measure-lines";

export const useMeasurementTool = (isReady: boolean, map?: Map) => {
    const [totalDistance, setTotalDistance] = useState<number>(0);
    const [features, setFeatures] = useState<Feature[]>([]);
    const geojson = useMemo<FeatureCollection>(
        () => ({
            type: "FeatureCollection",
            features,
        }),
        [features]
    );
    const lineString = useMemo(
        () => ({
            type: "Feature",
            geometry: {
                type: "LineString",
                // @ts-ignore https://github.com/DefinitelyTyped/DefinitelyTyped/issues/14877
                coordinates: geojson.features.map((point) => point.geometry?.coordinates),
            },
        }),
        [geojson]
    );
    const lineGeoJson = useMemo<FeatureCollection>(
        () => ({
            type: "FeatureCollection",
            // @ts-ignore https://github.com/DefinitelyTyped/DefinitelyTyped/issues/14877
            features: [lineString],
        }),
        [lineString]
    );

    const clickHandler = (clickEvent: MapMouseEvent) => {
        if (!map) return;

        const features = map.queryRenderedFeatures(clickEvent.point, {
            layers: [pointsLayerId],
        });

        if (features.length > 0 && features[0]) {
            const id = features[0].properties?.id;
            setFeatures((previousFeatures) => previousFeatures.filter((point) => point.properties?.id !== id));
        } else {
            const point = {
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: [clickEvent.lngLat.lng, clickEvent.lngLat.lat],
                },
                properties: {
                    id: String(Date.now()),
                },
            };
            // @ts-ignore https://github.com/DefinitelyTyped/DefinitelyTyped/issues/14877
            setFeatures((previousFeatures) => [...previousFeatures, point]);
        }
    };

    useEffect(() => {
        if (!map) return;

        if (geojson.features.length > 1) {
            const linestring = {
                type: "Feature",
                geometry: {
                    type: "LineString",
                    // @ts-ignore https://github.com/DefinitelyTyped/DefinitelyTyped/issues/14877
                    coordinates: geojson.features.map((point) => point.geometry?.coordinates),
                },
            };

            // @ts-ignore https://github.com/DefinitelyTyped/DefinitelyTyped/issues/14877
            const lineDistance = length(linestring);

            setTotalDistance(lineDistance);
        } else {
            setTotalDistance(0);
        }

        const geojsonSource = map.getSource(pointsSourceId);

        // @ts-ignore https://github.com/DefinitelyTyped/DefinitelyTyped/issues/14877
        if (geojsonSource) geojsonSource.setData(geojson);
    }, [geojson, map]);

    useEffect(() => {
        if (!map || !isReady) return () => {};
        map.addSource(pointsSourceId, {
            type: "geojson",
            data: geojson,
        });

        map.addSource(linesSourceId, {
            type: "geojson",
            data: lineGeoJson,
        });

        // Add Layer for the linestrings
        map.addLayer({
            id: linesLayerId,
            type: "line",
            source: linesSourceId,
            layout: {
                "line-cap": "round",
                "line-join": "round",
            },
            paint: {
                "line-color": "#00143C", // darkBlue.800
                "line-width": 7.5,
                "line-opacity": 1,
            },
        });

        // Add Layer for the points
        map.addLayer({
            id: pointsLayerId,
            type: "circle",
            source: pointsSourceId,
            paint: {
                "circle-radius": 5,
                "circle-color": "#fff",
                "circle-stroke-color": "#00143C", // darkBlue.800
                "circle-stroke-width": 3,
            },
            filter: ["in", "$type", "Point"],
        });

        // Clean up
        return () => {
            if (map.getLayer(pointsLayerId)) map.removeLayer(pointsLayerId);
            if (map.getLayer(linesLayerId)) map.removeLayer(linesLayerId);
            if (map.getSource(pointsSourceId)) map.removeSource(pointsSourceId);
            if (map.getSource(linesSourceId)) map.removeSource(linesSourceId);
            map.getCanvas().style.cursor = "grab";
        };
    }, [map, geojson, isReady]);

    useMapEvent("click", clickHandler);

    useMapEvent("mousemove", (mouseMoveEvent: MapMouseEvent) => {
        if (!map) return;
        if (!map.getLayer(pointsLayerId)) return;

        const features = map.queryRenderedFeatures(mouseMoveEvent.point, {
            layers: [pointsLayerId],
        });
        map.getCanvas().style.cursor = features.length > 0 ? "pointer" : "crosshair";
    });

    return { totalDistance };
};
