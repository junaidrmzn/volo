import { useMemo } from "react";
import { useGetCorridorClearanceDataQuery } from "@voloiq/flight-planning-api/v1";
import { METERS_TO_FEET, METERS_TO_NAUTICAL_MILES } from "../../../utils";

export const useCorridorClearanceDataInVerticalProfile = (selectedRouteId: number) => {
    const obstaclesGraphDataQuery = useGetCorridorClearanceDataQuery(selectedRouteId);
    const obstaclesGraphData: { [key: string]: number[][] } = useMemo(() => {
        const obstaclesData: number[][] = [];
        const highestObstacleData: number[][] = [];
        if (obstaclesGraphDataQuery.query.data) {
            for (const obstaclesGraphData of obstaclesGraphDataQuery.query.data.graphObstacles) {
                if (obstaclesGraphData.obstacleType === "highest_obstacle")
                    highestObstacleData.push([
                        obstaclesGraphData.obstacleDistance * METERS_TO_NAUTICAL_MILES,
                        obstaclesGraphData.obstacleFlightAltitude * METERS_TO_FEET,
                    ]);
                else
                    obstaclesData.push([
                        obstaclesGraphData.obstacleDistance * METERS_TO_NAUTICAL_MILES,
                        obstaclesGraphData.obstacleFlightAltitude * METERS_TO_FEET,
                    ]);
            }
        }
        return { obstacles: obstaclesData, highest_obstacle: highestObstacleData };
    }, [obstaclesGraphDataQuery.query.data]);

    return { obstaclesGraphData };
};
