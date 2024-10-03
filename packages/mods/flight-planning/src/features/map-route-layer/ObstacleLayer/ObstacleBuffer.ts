import { buffer, point } from "@turf/turf";
import { Obstacle } from "@voloiq/flight-planning-api/v1";
import { FeaturesCoordinates, FillLayerSpec, VoloiqMap } from "@voloiq/map";

type ObstacleDataType = {
    coordinates: FeaturesCoordinates;
    properties: Obstacle;
};

const createBufferLayer = (obstacles: ObstacleDataType[]) => {
    const obstaclesData: { coordinates: FeaturesCoordinates; properties: ObstacleDataType }[] = [];
    for (const obstacle of obstacles) {
        const obstaclePoint = point([obstacle.properties.geom.lng, obstacle.properties.geom.lat]);
        const obstacleBuffer = buffer(obstaclePoint, 300, { units: "meters" });
        const newFeature = {
            coordinates: obstacleBuffer.geometry.coordinates,
            properties: obstacle,
        };
        obstaclesData.push(newFeature);
    }
    return obstaclesData;
};

export const obstacleMarkerBufferLayer = (props: { map: VoloiqMap; obstaclesData: ObstacleDataType[] }) => {
    const { map, obstaclesData } = props;
    const obstaclesBufferData = createBufferLayer(obstaclesData);
    if (map) {
        const doesLayerExist = !!map.getLayer("obstacles-buffer-layer");
        if (!doesLayerExist) {
            const options = {
                id: "obstacles-buffer-layer",
                source: "obstacles-buffer-source",
                type: "fill",
                paint: {
                    "fill-color": "#F5656570",
                },
            };
            map.createLayerFromGeoJson?.(map, obstaclesBufferData, "Polygon", options as FillLayerSpec);
        } else if (map && !map.isWaypointUpdate) {
            const layerProperties = map.getLayer("obstacles-buffer-layer");
            map.createLayerFromGeoJson?.(map, obstaclesBufferData, "Polygon", layerProperties as FillLayerSpec);
        }
    }
};
