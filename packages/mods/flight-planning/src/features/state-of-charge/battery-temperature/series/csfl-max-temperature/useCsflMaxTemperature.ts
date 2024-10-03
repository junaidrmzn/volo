import { useEffect } from "react";
import { useChartContext } from "@voloiq/graph";
import { formatIsoString } from "../../../../../../lib/echarts";
import { useGetRouteFullEnergy } from "../../../../../api-hooks";
import { useSelectedRoute } from "../../../../selected-route";
import { MarkLineType } from "../../../types";
import { useChartTranslations } from "../../../useChartTranslations";
import { csflMaximumTemperature } from "../../constants";
import { useGetSeriesColors } from "../useGetSeriesColors";

export const useCsflMaxTemperature = (markLineData: MarkLineType[]) => {
    const { chart } = useChartContext();
    const colors = useGetSeriesColors();
    const { selectedRoute } = useSelectedRoute();
    const temperatureQuery = useGetRouteFullEnergy(selectedRoute?.id);
    const { CSFL_MAX_TEMPERATURE } = useChartTranslations();
    const temperatureData = temperatureQuery.data?.csflTemperatureTimeIntervalsWorstCase;

    useEffect(() => {
        if (temperatureQuery.isFetching || !temperatureQuery.isSuccess || !chart) return;

        const dataRows = temperatureData?.map((interval) => [formatIsoString(interval.time), csflMaximumTemperature]);

        if (dataRows?.length === 0) return;

        const options = {
            id: "csflMaxTemp",
            name: CSFL_MAX_TEMPERATURE,
            data: dataRows,
            type: "line",
            symbol: "none",
            lineStyle: {
                width: 0,
            },
            areaStyle: {
                origin: "end",
                opacity: 0.7,
            },
            smooth: true,
            silent: true,
            color: colors.csflMaximumTemperature,
        };

        chart.setOption({ series: options });
    }, [
        temperatureQuery.isFetching,
        temperatureQuery.isSuccess,
        CSFL_MAX_TEMPERATURE,
        colors,
        markLineData,
        temperatureData,
        chart,
    ]);
};
