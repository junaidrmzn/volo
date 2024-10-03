import { METERS_TO_FEET, METERS_TO_NAUTICAL_MILES } from "../../../../utils";
import { formatAirspaceIntersectionData } from "../formatAirspaceIntersectionData";
import { anyAirspaceIntersection } from "./__mocks__/airspaceIntersections";

describe("formatAirspaceIntersectionData", () => {
    it("should format airspaces correctly", () => {
        const leftBorder = 0;
        const rightBorder = 1048;
        const highestPoint = 500;
        const airspaceSeries = formatAirspaceIntersectionData(
            [
                [leftBorder, 0],
                [rightBorder / 2, highestPoint],
                [rightBorder, 0],
            ],
            [
                anyAirspaceIntersection({
                    leftBorder,
                    rightBorder,
                    upperLimit: highestPoint,
                }),
            ]
        );
        expect(airspaceSeries).toHaveLength(1);
        expect(airspaceSeries[0]).toBeDefined();
        expect(airspaceSeries[0]?.data).toHaveLength(5);
        expect(airspaceSeries[0]?.data).toBeInstanceOf(Array);
        const airspaceSeriesData: number[][] = airspaceSeries[0]?.data as number[][];
        expect(airspaceSeriesData[0]).toHaveLength(2);
        expect(airspaceSeriesData[1]).toHaveLength(2);
        // Check bottom right x
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        expect(airspaceSeriesData[0]![0]).toEqual(rightBorder * METERS_TO_NAUTICAL_MILES);
        // Check upper right y
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        expect(airspaceSeriesData[1]![1]).toEqual(highestPoint * METERS_TO_FEET);
    });
});
