import { useToken } from "@volocopter/design-library-react";
import type { EChartsOption, TooltipComponentFormatterCallbackParams } from "echarts";
import { useEffect, useMemo, useState } from "react";
import { useQueryClient } from "react-query";
import { RouteFullEnergy, WindScenario } from "@voloiq/flight-planning-api/v1";
import { renderSeriesItem } from "@voloiq/graph";
import { useSelectedRoute } from "../../selected-route";
import { TooltipParams } from "./types";

export const useOperationalLimitsChartOptions = (isModalOpen: boolean) => {
    const validRouteColor = useToken("colors", "orange.300");
    const invalidRouteColor = useToken("colors", "mint.500");
    const queryClient = useQueryClient();
    const { selectedRoute } = useSelectedRoute();
    const routeFullEnergyQuery = queryClient.getQueryState<RouteFullEnergy>([
        "routes",
        { routeId: selectedRoute?.id },
        "energy",
        "fullEnergy",
    ]);

    const [windScenario, setWindScenario] = useState<WindScenario>({ windSpeed: undefined, windDirection: undefined });

    useEffect(() => {
        if (routeFullEnergyQuery?.data) {
            setWindScenario({
                windSpeed: routeFullEnergyQuery.data.windSpeed,
                windDirection: routeFullEnergyQuery.data.windDirection,
            });
        }
    }, [routeFullEnergyQuery?.data]);

    const options: EChartsOption = useMemo(
        () => ({
            polar: {
                type: "pie",
                radius: isModalOpen ? "95%" : "90%",
            },
            tooltip: {
                formatter: (params: TooltipComponentFormatterCallbackParams) => {
                    if (!params) return "";

                    const { data } = params as unknown as TooltipParams;
                    const [windSpeed, windDirection] = data;

                    return `Wind Speed: ${windSpeed} kts<br/>Wind Direction: ${windDirection}°`;
                },
            },
            visualMap: {
                type: "continuous",
                show: false,
                min: 0,
                max: 1,
                inRange: { color: [validRouteColor, invalidRouteColor] },
            },
            angleAxis: {
                type: "value",
                boundaryGap: false,
                splitLine: { show: false },
                axisLabel: { formatter: "{value}°" },
                min: 0,
                max: 359,
            },
            radiusAxis: {
                type: "value",
                z: 100,
                splitLine: { show: false },
                axisLabel: { formatter: "{value} kts" },
                min: -0.01,
                max: 24,
            },
            series: [
                {
                    type: "scatter",
                    coordinateSystem: "polar",
                    symbolSize: isModalOpen ? 15 : 10,
                },
                {
                    id: "operationalLimitation",
                    name: "Operational Limitation",
                    type: "custom",
                    coordinateSystem: "polar",
                    renderItem: renderSeriesItem,
                },
            ],
        }),
        [invalidRouteColor, isModalOpen, validRouteColor]
    );

    return { options, windScenario, setWindScenario };
};
