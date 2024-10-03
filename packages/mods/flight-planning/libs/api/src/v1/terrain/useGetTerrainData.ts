import type { VerticalTerrain } from "@voloiq-typescript-api/flight-planning-types";
import { useGetService } from "@voloiq/service";

export type VerticalTerrainDataType = {
    verticalTerrain: VerticalTerrain[];
};

export const useGetTerrainData = (routeId?: string | number) => {
    return useGetService<VerticalTerrainDataType>({
        route: `/routes/${routeId}/terrain`,
        resourceId: "",
        options: {},
    });
};
