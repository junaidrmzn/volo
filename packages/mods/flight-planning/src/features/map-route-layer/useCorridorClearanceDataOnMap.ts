import { useMemo } from "react";
import { Obstacle, ObstacleCorridorQuery } from "@voloiq/flight-planning-api/v1";

export const useCorridorClearanceDataOnMap = (obstaclesQueryResults: ObstacleCorridorQuery) => {
    const regex = /POINT\(([\d-]+\.\d+) ([\d-]+\.\d+)\)/;
    const obstaclesQueryData: Obstacle[] = useMemo(() => {
        const obstacleMapData: Obstacle[] = [];
        if (obstaclesQueryResults.query.data) {
            for (const obstaclesData of obstaclesQueryResults.query.data.corridorObstacles) {
                const textGeom = obstaclesData.obstacleGeom;
                const altitude = obstaclesData.obstacleHeight;
                const { obstacleType } = obstaclesData;
                const { isCollision } = obstaclesData;
                const { isClearanceViolation } = obstaclesData;
                const matchWkt = textGeom.match(regex);
                if (matchWkt && matchWkt[1] && matchWkt[2])
                    obstacleMapData.push({
                        geom: {
                            lng: Number.parseFloat(matchWkt[1]),
                            lat: Number.parseFloat(matchWkt[2]),
                        },
                        altitude,
                        obstacleType,
                        isCollision,
                        isClearanceViolation,
                    });
            }
        }
        return obstacleMapData;
    }, [obstaclesQueryResults.query.data]);
    return { obstaclesQueryData };
};
