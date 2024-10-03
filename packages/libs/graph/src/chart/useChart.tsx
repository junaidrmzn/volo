import type { EChartsOption, EChartsType } from "echarts";
import { getInstanceByDom, init } from "echarts";
import { useEffect, useRef } from "react";

export function useChart(
    option: EChartsOption,
    resizeTriggers?: boolean[],
    notMerge?: boolean,
    lazyUpdate?: boolean,
    theme?: Object | string,
    loading?: boolean
) {
    const chartRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let chart: EChartsType;
        if (chartRef.current) {
            chart = init(chartRef.current, theme, { renderer: "canvas" });
        }
        // ResizeObserver is leading to a bit janky UX
        function resizeChart() {
            chart?.resize();
        }
        window.addEventListener("resize", resizeChart);
        return () => {
            chart?.dispose();
            window.removeEventListener("resize", resizeChart);
        };
    }, [theme]);

    useEffect(() => {
        if (chartRef.current) {
            const chart = getInstanceByDom(chartRef.current);
            chart?.setOption(option, notMerge, lazyUpdate);
            chart?.resize();
        }
    }, [option, notMerge, lazyUpdate, theme]); // Whenever theme changes we need to add option and setting due to it being deleted in cleanup function

    useEffect(() => {
        if (chartRef.current) {
            const chart = getInstanceByDom(chartRef.current);
            if (loading) chart?.showLoading();
            else chart?.hideLoading();
        }
    }, [loading, theme]);

    useEffect(() => {
        if (chartRef.current) {
            const chart = getInstanceByDom(chartRef.current);
            chart?.resize();
        }
    }, [resizeTriggers]);

    return chartRef;
}
