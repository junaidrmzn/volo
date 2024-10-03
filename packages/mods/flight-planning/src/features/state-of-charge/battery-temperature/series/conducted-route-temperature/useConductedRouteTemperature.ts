import { useEffect } from "react";
import { useIsAuthorizedTo } from "@voloiq/auth";
import { useChartContext } from "@voloiq/graph";
import { formatIsoString } from "../../../../../../lib/echarts";
import { useGetConductedRouteEnergyTemperature } from "../../../../../api-hooks";
import { useSelectedRoute } from "../../../../selected-route";
import { MarkLineType } from "../../../types";
import { useChartTranslations } from "../../../useChartTranslations";
import { useGetSeriesColors } from "../useGetSeriesColors";

export const useConductedRouteTemperature = (markLineData: MarkLineType[]) => {
    const { chart } = useChartContext();
    const colors = useGetSeriesColors();
    const { TEMPERATURE_CONDUCTED_ROUTE } = useChartTranslations();
    const { selectedRoute } = useSelectedRoute();

    const canReadConductedRouteGraph = useIsAuthorizedTo(["read"], ["ConductedRouteGraph"]);
    const temperatureQuery = useGetConductedRouteEnergyTemperature(selectedRoute?.id || 0, canReadConductedRouteGraph);
    const temperatureData = temperatureQuery.data?.temperatureTimeIntervals;

    useEffect(() => {
        if (temperatureQuery.isFetching || !temperatureQuery.isSuccess || !chart) return;

        const dataRows = temperatureData?.map((interval) => [
            formatIsoString(interval.time),
            interval.batteryTemperature?.toPrecision(4),
            interval.batteryTemperature,
        ]);

        if (dataRows?.length === 0) return;

        const options = {
            id: "TemperatureConductedRoute",
            name: TEMPERATURE_CONDUCTED_ROUTE,
            data: dataRows,
            type: "line",
            color: colors.conductedRouteTemperature,
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
        TEMPERATURE_CONDUCTED_ROUTE,
        colors,
        markLineData,
        temperatureData,
        chart,
    ]);
};
