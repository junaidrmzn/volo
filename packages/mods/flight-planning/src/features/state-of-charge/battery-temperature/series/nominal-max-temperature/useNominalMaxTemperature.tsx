import { useEffect } from "react";
import { useChartContext } from "@voloiq/graph";
import { formatIsoString } from "../../../../../../lib/echarts";
import { useGetRouteFullEnergy } from "../../../../../api-hooks";
import { useSelectedRoute } from "../../../../selected-route";
import { MarkLineType } from "../../../types";
import { useChartTranslations } from "../../../useChartTranslations";
import { nominalMaxTemperature } from "../../constants";
import { useGetSeriesColors } from "../useGetSeriesColors";

export const useNominalMaxTemperature = (markLineData: MarkLineType[]) => {
    const { chart } = useChartContext();
    const colors = useGetSeriesColors();
    const { selectedRoute } = useSelectedRoute();
    const temperatureQuery = useGetRouteFullEnergy(selectedRoute?.id);
    const { NOMINAL_MAX_TEMPERATURE } = useChartTranslations();
    const temperatureData = temperatureQuery.data?.temperatureTimeIntervals;

    useEffect(() => {
        if (temperatureQuery.isFetching || !temperatureQuery.isSuccess || !chart) return;

        const dataRows = temperatureData?.map((interval) => [formatIsoString(interval.time), nominalMaxTemperature]);

        if (dataRows?.length === 0) return;

        const options = {
            id: "nominalMaxTemp",
            name: NOMINAL_MAX_TEMPERATURE,
            data: dataRows,
            type: "line",
            symbol: "none",
            lineStyle: {
                width: 0,
                opacity: 0.5,
            },
            areaStyle: {
                origin: "end",
                opacity: 0.5,
            },
            smooth: true,
            silent: true,
            color: colors.maximumTemperature,
        };

        chart.setOption({ series: options });
    }, [
        temperatureQuery.isFetching,
        temperatureQuery.isSuccess,
        NOMINAL_MAX_TEMPERATURE,
        colors,
        markLineData,
        temperatureData,
        chart,
    ]);
};
