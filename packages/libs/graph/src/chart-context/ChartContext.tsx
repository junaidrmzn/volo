import type { EChartsType } from "echarts";
import { createContext, useContext } from "react";

type ChartContextType = {
    chart?: EChartsType;
};

export const ChartContext = createContext<ChartContextType | undefined>(undefined);

export const useChartContext = () => {
    const chartContextValue = useContext(ChartContext);

    if (!chartContextValue) {
        throw new Error("useChartContext must be used within ChartContextProvider");
    }

    return chartContextValue;
};
