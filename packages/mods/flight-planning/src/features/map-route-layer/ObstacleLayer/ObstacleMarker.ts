import { Obstacle } from "@voloiq/flight-planning-api/v1";
import { FeaturesCoordinates, SymbolLayerSpec, VoloiqMap } from "@voloiq/map";
import { obstacleMarkerBufferLayer } from "./ObstacleBuffer";
import { initEvents } from "./ObstacleMarkerEvents";

type ObstacleMarkerProps = {
    map: VoloiqMap;
    obstacles: Obstacle[];
};

type ObstacleDataType = {
    coordinates: FeaturesCoordinates;
    properties: Obstacle;
};
/* eslint no-underscore-dangle: 0 */

const createObstaclesData = (obstacles: Obstacle[]): ObstacleDataType[] => {
    const obstaclesData: ObstacleDataType[] = [];
    for (const obstacle of obstacles) {
        const newFeature = {
            coordinates: [obstacle.geom.lng, obstacle.geom.lat],
            properties: obstacle,
        };
        obstaclesData.push(newFeature);
    }
    return obstaclesData;
};

export const obstacleMarkerLayer = (props: ObstacleMarkerProps): void => {
    const { map, obstacles } = props;
    const obstaclesList = createObstaclesData(obstacles);
    if (map) {
        const doesLayerExist = !!map.getLayer("obstacles-layer");
        if (!doesLayerExist) {
            const options = {
                id: "obstacles-layer",
                source: "obstacles-source",
                type: "symbol",
                layout: {
                    "icon-image": [
                        "case",
                        ["==", ["get", "obstacleType"], "highest_obstacle"],
                        "highest-obstacle",
                        "obstacle",
                    ],
                    "icon-size": 1,
                    "icon-allow-overlap": true,
                },
            };
            obstacleMarkerBufferLayer({ map, obstaclesData: obstaclesList });
            map.createLayerFromGeoJson?.(map, obstaclesList, "Point", options as SymbolLayerSpec);
            initEvents(map);
        } else if (map && !map.isWaypointUpdate) {
            const layerProperties = map.getLayer("obstacles-layer");
            map.createLayerFromGeoJson?.(
                map,
                obstaclesList,
                "Point",
                layerProperties as SymbolLayerSpec,
                "obstacles-buffer-layer"
            );
            obstacleMarkerBufferLayer({ map, obstaclesData: obstaclesList });
            setTimeout(() => {
                if (doesLayerExist) {
                    const layersOrder = map.style._order;
                    map.moveLayer("obstacles-layer", layersOrder[layersOrder.length - 1]);
                    map.moveLayer("obstacles-buffer-layer", layersOrder[layersOrder.length - 2]);
                }
            }, 500);
        }
    }
};
