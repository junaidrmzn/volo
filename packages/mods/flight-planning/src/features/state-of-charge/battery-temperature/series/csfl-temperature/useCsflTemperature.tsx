import { useEffect } from "react";
import { useChartContext } from "@voloiq/graph";
import { formatIsoString } from "../../../../../../lib/echarts";
import { useGetRouteFullEnergy } from "../../../../../api-hooks";
import { useSelectedRoute } from "../../../../selected-route";
import { MarkLineType } from "../../../types";
import { useChartTranslations } from "../../../useChartTranslations";
import { useGetSeriesColors } from "../useGetSeriesColors";

export const useCsflTemperature = (markLineData: MarkLineType[]) => {
    const { chart } = useChartContext();
    const colors = useGetSeriesColors();
    const { selectedRoute } = useSelectedRoute();
    const temperatureQuery = useGetRouteFullEnergy(selectedRoute?.id);
    const { CSFL_NOMINAL_TEMPERATURE } = useChartTranslations();
    const temperatureData = temperatureQuery.data?.csflTemperatureTimeIntervals;

    useEffect(() => {
        if (temperatureQuery.isFetching || !temperatureQuery.isSuccess || !chart) return;

        const dataRows = temperatureData?.map((interval) => [
            formatIsoString(interval.time),
            interval.bestReachableCsflSiteTemperature.toPrecision(4),
        ]);

        if (dataRows?.length === 0) return;

        const options = {
            id: "csflTemperatureCurve",
            name: CSFL_NOMINAL_TEMPERATURE,
            data: dataRows,
            type: "line",
            color: colors.csflTemperature,
            smooth: true,
            symbol: "none",
            silent: true,
            markLine: {
                silent: true,
                lineStyle: {
                    color: colors.markLine,
                },
                symbol: ["none", "none"],
                label: {
                    position: "insideEndBottom",
                },
                data: markLineData,
            },
        };

        chart.setOption({ series: options });
    }, [
        temperatureQuery.isFetching,
        temperatureQuery.isSuccess,
        CSFL_NOMINAL_TEMPERATURE,
        colors,
        markLineData,
        temperatureData,
        chart,
    ]);
};
