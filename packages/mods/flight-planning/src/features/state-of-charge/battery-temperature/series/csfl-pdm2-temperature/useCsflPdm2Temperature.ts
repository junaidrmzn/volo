import { useEffect } from "react";
import { useChartContext } from "@voloiq/graph";
import { formatIsoString } from "../../../../../../lib/echarts";
import { useGetRouteFullEnergy } from "../../../../../api-hooks";
import { useSelectedRoute } from "../../../../selected-route";
import { MarkLineType } from "../../../types";
import { useChartTranslations } from "../../../useChartTranslations";
import { useGetSeriesColors } from "../useGetSeriesColors";

export const useCsflPdm2Temperature = (markLineData: MarkLineType[]) => {
    const { chart } = useChartContext();
    const colors = useGetSeriesColors();
    const { selectedRoute } = useSelectedRoute();
    const batteryCurveQuery = useGetRouteFullEnergy(selectedRoute?.id);
    const { CSFL_PDM_2_TEMPERATURE } = useChartTranslations();
    const temperatureData = batteryCurveQuery.data?.csflTemperatureTimeIntervalsWorstCase;

    useEffect(() => {
        if (batteryCurveQuery.isFetching || !batteryCurveQuery.isSuccess || !chart) return;

        const dataRows = temperatureData?.map((interval) => [
            formatIsoString(interval.time),
            interval.bestReachableCsflSiteTemperature.toPrecision(4),
        ]);

        if (dataRows?.length === 0) return;

        const options = {
            id: "csflPdm2TemperatureCurve",
            name: CSFL_PDM_2_TEMPERATURE,
            data: dataRows,
            type: "line",
            color: colors.pdm2CsflTemperature,
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
        batteryCurveQuery.isFetching,
        batteryCurveQuery.isSuccess,
        CSFL_PDM_2_TEMPERATURE,
        colors,
        markLineData,
        temperatureData,
        chart,
    ]);
};
