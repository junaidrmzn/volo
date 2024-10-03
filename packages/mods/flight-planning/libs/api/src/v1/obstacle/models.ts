import type { UseQueryResult } from "react-query";

export type Obstacle = {
    geom: {
        lng: number;
        lat: number;
    };
    altitude: number;
    obstacleType: string;
    isCollision: boolean;
    isClearanceViolation: boolean;
};
export type CorridorObstacles = {
    obstacleGeom: string;
    obstacleHeight: number;
    obstacleType: string;
    isCollision: boolean;
    isClearanceViolation: boolean;
};

export type GraphObstacles = {
    obstacleDistance: number;
    obstacleFlightAltitude: number;
    obstacleType: string;
};
export type CorridorClearanceType = {
    corridorObstacles: CorridorObstacles[];
    graphObstacles: GraphObstacles[];
};

export type ObstacleCorridorQuery = {
    query: UseQueryResult<CorridorClearanceType | undefined, unknown>;
    isFetching: boolean;
    invalidateCorridorClearanceData: () => void;
};
