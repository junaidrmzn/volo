import { CorridorClearanceType, CorridorObstacles, Obstacle } from "./models";

export const anyObstacle = (overwrites?: Partial<Obstacle>): Obstacle => ({
    geom: {
        lng: 2.355_424_4,
        lat: 48.224_552,
    },
    altitude: 253,
    obstacleType: "corridor_obstacle",
    isCollision: false,
    isClearanceViolation: true,
    ...overwrites,
});

export const anyCorridorObstacles = (overwrites?: Partial<CorridorObstacles>): CorridorObstacles => ({
    obstacleGeom: "POINT(2.3554244 48.224552)",
    obstacleHeight: 253,
    obstacleType: "corridor_obstacle",
    isCollision: false,
    isClearanceViolation: true,
    ...overwrites,
});

export const anyCorridorClearanceType = (overwrites?: Partial<CorridorClearanceType>): CorridorClearanceType => ({
    corridorObstacles: [
        {
            obstacleGeom: "POINT(2.3554244 48.224552)",
            obstacleHeight: 253,
            obstacleType: "corridor_obstacle",
            isCollision: false,
            isClearanceViolation: true,
        },
    ],
    graphObstacles: [
        {
            obstacleDistance: 352,
            obstacleFlightAltitude: 663,
            obstacleType: "corridor_obstacle",
        },
    ],
    ...overwrites,
});
