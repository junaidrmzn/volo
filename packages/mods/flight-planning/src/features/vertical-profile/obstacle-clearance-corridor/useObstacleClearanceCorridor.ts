import { useToken } from "@volocopter/design-library-react";
import { getInstanceByDom } from "echarts";
import { RefObject, useEffect } from "react";
import { useFeatureFlags } from "@voloiq/feature-flags";
import { calculateObstacleClearanceCorridor } from "./calculateObstacleClearanceCorridor";

type UseObstacleClearanceCorridorOptions = {
    chartRef: RefObject<HTMLDivElement>;
    routeAltitudes: [number, number][];
    verticalObstacleClearance?: number;
};
export const useObstacleClearanceCorridor = (options: UseObstacleClearanceCorridorOptions) => {
    const { chartRef, routeAltitudes, verticalObstacleClearance } = options;

    const obstacleAreaColor = useToken("colors", "orange.200");
    const obstacleLineColor = useToken("colors", "orange.500");
    const defaultVerticalClearanceSetting = 10;
    const lastDistanceTupleObject = routeAltitudes.at(-1);
    const routeLength = lastDistanceTupleObject ? lastDistanceTupleObject[0] : 0;
    const corridorDistanceInNM = 1.823;
    const { isFeatureFlagEnabled } = useFeatureFlags();
    const vfp1311 = isFeatureFlagEnabled("vfp-1311");
    const series = [
        {
            id: "obstacleClearanceCorridor",
            name: "Obstacle Clearance Corridor",
            type: "line",
            symbol: "none",
            lineStyle: {
                color: obstacleLineColor,
                width: 1.5,
                type: "dashed",
            },
            areaStyle: {
                color: obstacleAreaColor,
            },
            smooth: false,
            data:
                vfp1311 && routeAltitudes.length > 0 && routeLength > corridorDistanceInNM * 2
                    ? calculateObstacleClearanceCorridor(
                          routeAltitudes,
                          verticalObstacleClearance ?? defaultVerticalClearanceSetting
                      )
                    : [],
            z: 2,
        },
    ];

    useEffect(() => {
        if (!chartRef.current) return;
        const chart = getInstanceByDom(chartRef.current);
        if (!chart) return;

        chart.setOption({ series });
    }, [chartRef, series]);
};
