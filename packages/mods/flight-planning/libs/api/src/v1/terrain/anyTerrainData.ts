import type { VerticalTerrain } from "@voloiq-typescript-api/flight-planning-types";

export type VerticalTerrainResponse = {
    verticalTerrain: VerticalTerrain[];
};

export const anyTerrainData = (overwrites?: Partial<VerticalTerrainResponse>): VerticalTerrainResponse => ({
    verticalTerrain: [{ distance: 0, terrain_altitude: 123 }],
    ...overwrites,
});
