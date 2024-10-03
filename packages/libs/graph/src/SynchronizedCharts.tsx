import React from "react";
import type { RegisterLegendClickEventFunctionType, SynchronizedChartProps } from "./types";
import { useSynchronizedCharts } from "./useSynchronizedCharts";

type SynchronizedChartsProps = {
    firstChart: (
        registerLegendClickEvent: RegisterLegendClickEventFunctionType
    ) => React.ReactElement<SynchronizedChartProps>;
    secondChart: (
        registerLegendClickEvent: RegisterLegendClickEventFunctionType
    ) => React.ReactElement<SynchronizedChartProps>;
    legendMappings: { [key: string]: string };
    alwaysVisibleSeries?: string[];
};

export const SynchronizedCharts = (props: SynchronizedChartsProps) => {
    const { firstChart, secondChart, legendMappings, alwaysVisibleSeries } = props;
    const { registerLegendClickEvent } = useSynchronizedCharts(legendMappings, alwaysVisibleSeries);

    return (
        <>
            {firstChart(registerLegendClickEvent)}
            {secondChart(registerLegendClickEvent)}
        </>
    );
};
