import type { VerticalTerrain } from "@voloiq-typescript-api/flight-planning-types";

export const mockedVerticalTerrain: VerticalTerrain[] = [
    {
        distance: 0,
        terrain_altitude: 90.36,
    },
    {
        distance: 400,
        terrain_altitude: 101.129,
    },
    {
        distance: 800,
        terrain_altitude: 90.059,
    },
    {
        distance: 1200,
        terrain_altitude: 88.709,
    },
    {
        distance: 1600,
        terrain_altitude: 90.36,
    },
    {
        distance: 2000,
        terrain_altitude: 93.599,
    },
    {
        distance: 2400,
        terrain_altitude: 54.52,
    },
    {
        distance: 2800,
        terrain_altitude: 56.319,
    },
    {
        distance: 3200,
        terrain_altitude: 55.119,
    },
    {
        distance: 3600,
        terrain_altitude: 55.36,
    },
    {
        distance: 4000,
        terrain_altitude: 59.279,
    },
    {
        distance: 4400,
        terrain_altitude: 57.959,
    },
    {
        distance: 4800,
        terrain_altitude: 60.009,
    },
    {
        distance: 5200,
        terrain_altitude: 62.419,
    },
    {
        distance: 5600,
        terrain_altitude: 75.4,
    },
    {
        distance: 6000,
        terrain_altitude: 78.949,
    },
    {
        distance: 6400,
        terrain_altitude: 79.239,
    },
    {
        distance: 6800,
        terrain_altitude: 81.18,
    },
    {
        distance: 7200,
        terrain_altitude: 81.18,
    },
    {
        distance: 7600,
        terrain_altitude: 66.389,
    },
    {
        distance: 8000,
        terrain_altitude: 63.509,
    },
    {
        distance: 8375,
        terrain_altitude: 81.589,
    },
];

export const getVerticalTerrainResponse = (): VerticalTerrain[] => mockedVerticalTerrain;
