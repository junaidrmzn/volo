import type { Map } from "maplibre-gl";
import { useCallback, useEffect } from "react";
import { Notam } from "@voloiq/flight-planning-api/v1";
import { useMapContext, useMapEvent } from "@voloiq/map";

export const useNotamLayer = (notam?: Notam) => {
    const { map, isReady } = useMapContext();

    const createLayer = useCallback(
        (map: Map) => {
            if (!notam?.features) return;
            const mapLayerSource = map.getSource("notam-source");
            if (mapLayerSource && Object.keys(mapLayerSource).length > 0) return;
            map.addSource("notam-source", {
                type: "geojson",
                data: {
                    type: "FeatureCollection",
                    features: notam?.features,
                },
            });

            map.addLayer({
                id: "notam-layer",
                type: "line",
                source: "notam-source",
                layout: {},
                paint: {
                    "line-color": "#fff",
                    "line-width": 2,
                },
            });
        },
        [notam?.features]
    );

    useEffect(() => {
        if (!isReady || !map || !notam) return () => {};
        createLayer(map);
        return () => {
            map.removeLayer("notam-layer");
            map.removeSource("notam-source");
        };
    }, [isReady, map, createLayer, notam, notam?.features?.length]);

    /**
     * update route drawing by change of map style
     */
    useMapEvent("styledata", () => {
        if (!map) return;
        createLayer(map);
    });
};
