import { CustomSeriesRenderItemAPI, CustomSeriesRenderItemParams, CustomSeriesRenderItemReturn } from "echarts";
import { CoordinateSystem } from "../types";

export const renderSeriesItem = (
    params: CustomSeriesRenderItemParams,
    api: CustomSeriesRenderItemAPI
): CustomSeriesRenderItemReturn => {
    const coordinateSystem = params.coordSys as unknown as CoordinateSystem;

    const xAxis = api.value(0);
    const yAxis = api.value(1);

    const values = [xAxis, yAxis];

    const coordinates = api.coord(values);
    const size = api.size?.([1, 10], values) as number[];

    return {
        type: "sector",
        shape: {
            cx: coordinateSystem.cx,
            cy: coordinateSystem.cy,
            r0: coordinates[2]! - size[0]! / 2,
            r: coordinates[2]! + size[0]! / 2,
            startAngle: -(coordinates[3]! + size[1]! / 2),
            endAngle: -(coordinates[3]! - size[1]! / 2),
        },
        style: { fill: api.visual("color") },
    };
};
