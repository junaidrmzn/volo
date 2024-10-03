type TerrainData = { distance: number; terrain_altitude: number };

const terrianValues = [
    116, 111, 96, 68, 42, 39, 38, 50, 87, 66, 92, 98, 68, 68, 70, 53, 58, 65, 82, 67, 61, 63, 59, 67, 74, 80, 179, 179,
    114, 259, 242, 89, 76, 62, 83, 83, 71, 66, 71, 62, 61, 81, 69, 58, 55, 55, 55, 52, 49, 50, 50, 51, 62, 70, 71, 106,
    106, 109, 64, 94, 94, 95, 87, 88, 88, 85, 87, 91, 91, 90, 87, 81, 58, 83, 79, 78, 76, 76, 83, 83, 82, 83, 77, 73,
    71, 71,
];
const preCalculatedRouteLength = 22_261;
const arrayLength = Math.floor(preCalculatedRouteLength / 400);
export const mockTerrainData = (fixedValus: boolean, routeLength?: number) => {
    const terrainArray: TerrainData[] = [];
    if (fixedValus) {
        for (let index = 0; index < arrayLength; index++) {
            const newTerrainEntry: TerrainData = {
                distance: 400 * index,
                terrain_altitude: terrianValues[index] ?? Math.floor(Math.random() * (1200 - 50 + 1) + 50),
            };
            terrainArray.push(newTerrainEntry);
        }
        const finalEntry: TerrainData = {
            distance: preCalculatedRouteLength,
            terrain_altitude: terrianValues[arrayLength - 1] ?? Math.floor(Math.random() * (1200 - 50 + 1) + 50),
        };
        terrainArray.push(finalEntry);
    } else {
        const lengthOfRoute = routeLength ?? preCalculatedRouteLength;
        const samplingsNumber = Math.floor(lengthOfRoute / 400);
        for (let index = 0; index < samplingsNumber; index++) {
            const newTerrainEntry: TerrainData = {
                distance: 400 * index,
                terrain_altitude: Math.floor(Math.random() * (1200 - 50 + 1) + 50),
            };
            terrainArray.push(newTerrainEntry);
        }
        const finalEntry: TerrainData = {
            distance: lengthOfRoute,
            terrain_altitude: Math.floor(Math.random() * (1200 - 50 + 1) + 50),
        };
        terrainArray.push(finalEntry);
    }
    return { verticalTerrain: terrainArray };
};
