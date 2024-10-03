import { useMemo } from "react";
import { useGetRouteTerrainData } from "../../../api-hooks";
import { METERS_TO_FEET, METERS_TO_NAUTICAL_MILES } from "../../../utils";

export const useTerrainDataInVerticalProfile = (selectedRouteId: number, distance: number) => {
    const terrainDataQuery = useGetRouteTerrainData(selectedRouteId);
    const terrainData: number[][] = useMemo(() => {
        const xyData: number[][] = [];
        if (terrainDataQuery.data) {
            for (const [index, verticalTerrainData] of terrainDataQuery.data.verticalTerrain.entries()) {
                if (terrainDataQuery.data.verticalTerrain.length - 1 === index && distance > 0)
                    xyData.push([distance, verticalTerrainData.terrain_altitude * METERS_TO_FEET]);
                else
                    xyData.push([
                        verticalTerrainData.distance * METERS_TO_NAUTICAL_MILES,
                        verticalTerrainData.terrain_altitude * METERS_TO_FEET,
                    ]);
            }
        }
        return xyData;
    }, [terrainDataQuery.data]);
    return { terrainData };
};
