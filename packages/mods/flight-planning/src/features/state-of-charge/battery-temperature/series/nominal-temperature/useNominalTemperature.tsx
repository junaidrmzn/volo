import { useEffect } from "react";
import { useChartContext } from "@voloiq/graph";
import { formatIsoString } from "../../../../../../lib/echarts";
import { useGetRouteFullEnergy } from "../../../../../api-hooks";
import { useSelectedRoute } from "../../../../selected-route";
import { MarkLineType } from "../../../types";
import { useChartTranslations } from "../../../useChartTranslations";
import { useGetSeriesColors } from "../useGetSeriesColors";

export const useNominalTemperature = (setHasData: (hasData: boolean) => void, markLineData: MarkLineType[]) => {
    const { chart } = useChartContext();
    const colors = useGetSeriesColors();
    const { selectedRoute } = useSelectedRoute();
    const temperatureQuery = useGetRouteFullEnergy(selectedRoute?.id);
    const { NOMINAL_MISSION_TEMPERATURE } = useChartTranslations();
    const temperatureData = temperatureQuery.data?.temperatureTimeIntervals;

    useEffect(() => {
        if (temperatureQuery.isFetching || !temperatureQuery.isSuccess || !chart) return;

        setHasData(temperatureData?.length ? temperatureData?.length > 0 : false);

        const dataRows = temperatureData?.map((interval) => [
            formatIsoString(interval.time),
            interval.batteryTemperature?.toPrecision(4),
            interval.batteryTemperature,
        ]);

        if (dataRows?.length === 0) return;

        const options = {
            id: "BatteryCurve",
            name: NOMINAL_MISSION_TEMPERATURE,
            data: dataRows,
            type: "line",
            color: colors.nominalTemperature,
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
        NOMINAL_MISSION_TEMPERATURE,
        colors,
        markLineData,
        temperatureData,
        chart,
        setHasData,
    ]);
};
