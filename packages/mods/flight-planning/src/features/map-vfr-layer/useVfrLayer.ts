import type { Map } from "maplibre-gl";
import { useCallback, useEffect, useState } from "react";
import { useMapContext, useMapEvent } from "@voloiq/map";

type useVfrLayerProps = {
    tilesets: string[];
    isSatellite: boolean;
};

export const useVfrLayer = (props: useVfrLayerProps) => {
    const { tilesets, isSatellite } = props;
    const [previousTileSets, setPreviousTileSets] = useState<string[]>([]);
    const { map, isReady } = useMapContext();

    const createLayer = useCallback(
        (map: Map) => {
            // set up custom request for tile data
            map.setTransformRequest((url: string) => {
                if (url.includes(BACKEND_BASE_URL))
                    return {
                        url,
                        credentials: "include",
                    };
                return {
                    url,
                };
            });

            // find the correct layer to insert the new layer
            const findLayerToInsert = (map: Map) => {
                // Get all layers in the map
                const allLayers = map.getStyle().layers;

                // Check for a layer that includes "displayed-route" or "route-layer" and return first match
                const routeLayer = allLayers.find(
                    (layer) => layer.id.includes("displayed-route") || layer.id.includes("route-layer")
                );
                if (routeLayer) {
                    // Return the ID of the first layer that matches the above condition so that route will stay on inserted chart
                    return routeLayer.id;
                }

                // Check for a layer that includes "vfr-layer" - if found attach layer at the end
                const vfrLayer = allLayers.reverse().find((layer) => layer.id.includes("vfr-layer"));
                if (vfrLayer) {
                    return "attachEnd";
                }

                // If the map is not in satellite view, return the ID of the last layer
                if (!isSatellite) {
                    return allLayers[0]?.id;
                }
                // Return the ID of the second layer to insert above map
                return allLayers[1]?.id;
            };
            const layerId = findLayerToInsert(map);

            for (const tileset of tilesets) {
                // check if layer source already exists
                const mapLayerSource = map.getSource(`vfr-source-${tileset}`);
                if (mapLayerSource && Object.keys(mapLayerSource).length > 0) continue;

                map.addSource(`vfr-source-${tileset}`, {
                    type: "raster",
                    tiles: [`${BACKEND_BASE_URL}/v1/flight-planning-tiles/tiles/${tileset}/{z}/{x}/{y}`],
                    minzoom: 8,
                    maxzoom: 14,
                });
                if (layerId !== "attachEnd") {
                    map.addLayer(
                        {
                            id: `vfr-layer-${tileset}`,
                            type: "raster",
                            source: `vfr-source-${tileset}`,
                        },
                        layerId
                    );
                } else {
                    map.addLayer(
                        {
                            id: `vfr-layer-${tileset}`,
                            type: "raster",
                            source: `vfr-source-${tileset}`,
                        },
                        undefined
                    );
                }
            }
        },
        [tilesets, isSatellite]
    );

    useMapEvent("styledata", () => {
        if (!map) return;
        createLayer(map);
    });

    // Effect to create and remove layers
    useEffect(() => {
        if (!isReady || !map) return () => {};

        // filter previousTileSets to only include removed tilesets
        const removedTileSets = previousTileSets.filter((tileset) => !tilesets.includes(tileset));

        for (const removedTileSet of removedTileSets) {
            if (map.getLayer(`vfr-layer-${removedTileSet}`)) {
                map.removeLayer(`vfr-layer-${removedTileSet}`);
                map.removeSource(`vfr-source-${removedTileSet}`);
            }
        }

        createLayer(map);
        setPreviousTileSets(tilesets);
        return () => {};
    }, [tilesets, isReady, map, createLayer]);

    useEffect(() => {
        // cleanup function that runs when component unmounts
        return () => {
            // filter layers to only include those with id that includes "vfr-layer-"
            const layersToRemove = map?.getStyle()?.layers?.filter((layer) => layer.id.includes("vfr-layer-"));
            // if filtered layers exist remove them and their source
            if (layersToRemove && map) {
                for (const layer of layersToRemove) {
                    const sourceId = map.getLayer(layer.id)?.source;
                    map?.removeLayer(layer.id);
                    if (sourceId) map?.removeSource(sourceId);
                }
            }
        };
    }, [map]);
};
