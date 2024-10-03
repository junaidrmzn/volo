import type { EChartsOption } from "echarts";
import { useMemo } from "react";
import { getTooltipContent } from "../../../../lib/echarts";

export const useTemperatureChartOptions = (isModalOpen: boolean) => {
    const options: EChartsOption = useMemo(
        () => ({
            tooltip: {
                trigger: "axis",
                formatter: getTooltipContent,
            },
            xAxis: {
                type: "time",
                name: "Time (min)",
                nameLocation: "middle",
                nameGap: 20,
                axisLabel: {
                    formatter: "{mm}:{ss}",
                    showMinLabel: true,
                },
                min: "dataMin",
                max: "dataMax",
            },
            yAxis: {
                min: 15,
                max: 100,
                type: "value",
                name: "Temperature (Celsius)",
                nameLocation: "middle",
                nameGap: 25,
            },
            grid: {
                top: "5%",
                bottom: "10%",
                left: isModalOpen ? "5%" : "7%",
                right: isModalOpen ? "16%" : "30%",
            },
            legend: {
                orient: "vertical",
                icon: "roundRect",
                itemWidth: 15,
                top: "25%",
                left: isModalOpen ? "85%" : "70%",
            },
            animation: false,
        }),
        [isModalOpen]
    );

    return options;
};
