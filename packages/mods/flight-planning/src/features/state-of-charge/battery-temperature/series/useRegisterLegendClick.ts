import { useEffect } from "react";
import { RegisterLegendClickEventFunctionType, useChartContext } from "@voloiq/graph";

export const useRegisterLegendClick = (registerLegendClickEvent: RegisterLegendClickEventFunctionType) => {
    const { chart } = useChartContext();
    useEffect(() => {
        if (chart) chart.on("finished", () => registerLegendClickEvent?.(chart));
    }, [chart, registerLegendClickEvent]);
};
