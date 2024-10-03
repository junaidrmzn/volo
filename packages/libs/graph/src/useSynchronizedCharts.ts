import type { EChartsType } from "echarts";
import { useCallback, useEffect, useRef } from "react";

type Params = {
    name: string;
    selected: {
        [name: string]: boolean;
    };
};

type LegendMapping = { [key: string]: string };

export function useSynchronizedCharts(legends: LegendMapping, alwaysVisibleSeries?: string[]) {
    const charts = useRef<EChartsType[]>([]);

    const handleLegendSelectChanged = useCallback(
        (firstChart: EChartsType, secondChart: EChartsType) => {
            if (!firstChart || !secondChart) return;
            firstChart.on("legendselectchanged", (params: unknown) => {
                const { name, selected } = params as Params;
                secondChart.dispatchAction({
                    type: selected[name] ? "legendSelect" : "legendUnSelect",
                    name: legends[name],
                });

                if (alwaysVisibleSeries?.includes(name) && !selected[name]) {
                    firstChart.dispatchAction({
                        type: "legendSelect",
                        name,
                    });
                }
            });
        },
        [alwaysVisibleSeries, legends]
    );

    const registerLegendClickEvent = (chart: EChartsType) => {
        if (charts.current.length >= 2) return;
        const found = charts.current.indexOf(chart);
        if (found !== -1) return;
        charts.current.push(chart);
    };

    useEffect(() => {
        if (charts.current.length !== 2) return;
        if (!charts.current[0]) return;
        if (!charts.current[1]) return;
        handleLegendSelectChanged(charts.current[0], charts.current[1]);
        handleLegendSelectChanged(charts.current[1], charts.current[0]);
    }, [charts.current.length, handleLegendSelectChanged]);

    return { registerLegendClickEvent };
}
