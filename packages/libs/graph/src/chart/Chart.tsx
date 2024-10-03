import type { EChartsOption } from "echarts";
import { getInstanceByDom } from "echarts";
import { ChartContext } from "../chart-context";
import { useChart } from "./useChart";

export type ChartProps = {
    options: EChartsOption;
    chartElement: (ref: React.RefObject<HTMLDivElement>) => React.ReactElement;
};

export const Chart = (props: React.PropsWithChildren<ChartProps>) => {
    const { chartElement, children, options } = props;
    const chartRef = useChart(options);
    const chart = chartRef.current ? getInstanceByDom(chartRef.current) : undefined;
    return (
        <ChartContext.Provider value={{ chart }}>
            {children}
            {chartElement(chartRef)}
        </ChartContext.Provider>
    );
};
