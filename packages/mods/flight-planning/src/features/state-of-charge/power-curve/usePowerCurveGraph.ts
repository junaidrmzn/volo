import type { EChartsOption } from "echarts";
import { getInstanceByDom } from "echarts";
import { useCallback, useEffect, useMemo } from "react";
import { useIsAuthorizedTo } from "@voloiq/auth";
import type { CsflSite } from "@voloiq/flight-planning-api/v1";
import { useGetQueryState } from "@voloiq/flight-planning-api/v1";
import type { RegisterLegendClickEventFunctionType } from "@voloiq/graph";
import { useChart } from "@voloiq/graph";
import { formatIsoString, getTooltipContent } from "../../../../lib/echarts";
import {
    useGetConductedRouteEnergyTemperature,
    useGetRouteFullEnergy,
    useGetRoutePreliminaryEnergy,
} from "../../../api-hooks";
import { formatNumber } from "../../../utils";
import { useSelectedRoute } from "../../selected-route";
import { useGetMarkLines } from "../mission-reference";
import { MarkLineReference } from "../types";
import { useChartTranslations } from "../useChartTranslations";
import { useGetSeriesColors } from "./useGetSeriesColors";

// TODO: this hook needs to be refactored to use the new graph component and match the battery-temperature structure see VFP-906 & VFP-907
const chartOption: EChartsOption = {
    tooltip: {
        trigger: "axis",
        formatter: getTooltipContent,
    },
    xAxis: {
        type: "time",
        name: "Time (min)",
        nameLocation: "middle",
        nameGap: 20,
        axisLabel: {
            formatter: "{mm}:{ss}",
            showMinLabel: true,
        },
    },
    yAxis: {
        min: 0,
        type: "value",
        name: "Energy (kWh)",
        nameLocation: "middle",
        nameGap: 25,
    },
    grid: {
        top: "5%",
        bottom: "10%",
    },
    legend: {
        orient: "vertical",
        icon: "roundRect",
        itemWidth: 15,
    },
    animation: false,
};

export const usePowerCurveGraph = (
    isModalOpen: boolean,
    registerLegendClickEvent: RegisterLegendClickEventFunctionType,
    markLineReference: MarkLineReference,
    setIsLoading?: (loading: boolean) => void
) => {
    const colors = useGetSeriesColors();
    const markLineData = useGetMarkLines({ markLineReference, graphType: "batteryCapacity" });

    const {
        NOMINAL_MISSION_ENERGY,
        CSFL_NOMINAL_ENERGY,
        CSFL_PDM_2_ENERGY,
        UNUSABLE_ENERGY,
        FINAL_RESERVE,
        ADDITIONAL_ENERGY,
        EXTRA_ENERGY,
        DISCRETIONARY_ENERGY,
        ENERGY_CONDUCTED_ROUTE,
        CONTINGENCY_ENERGY,
    } = useChartTranslations();

    const { selectedRoute } = useSelectedRoute();

    const routePreliminaryEnergyQuery = useGetRoutePreliminaryEnergy(selectedRoute!.id);
    const routeFullEnergyQuery = useGetRouteFullEnergy(selectedRoute!.id, true);
    const canReadConductedRouteGraph = useIsAuthorizedTo(["read"], ["ConductedRouteGraph"]);

    const conductedRouteEnergyTemperatureQuery = useGetConductedRouteEnergyTemperature(
        selectedRoute?.id || 0,
        canReadConductedRouteGraph
    );
    const { data: allCsflSitesData } = useGetQueryState<CsflSite[]>([
        "routes",
        { routeId: selectedRoute?.id },
        "csfl-sites",
    ]);

    const {
        unusableEnergy,
        finalReserve,
        additionalEnergy,
        extraEnergy,
        discretionaryEnergy,
        nominalMissionEnergyCurve,
        energyConductedRouteCurve,
        contingencyEnergy,
    } = useMemo(() => {
        const energyConductedRouteCurve =
            conductedRouteEnergyTemperatureQuery.isSuccess && conductedRouteEnergyTemperatureQuery.data
                ? conductedRouteEnergyTemperatureQuery.data.mainEnergyPowercurve
                : [];
        if (routeFullEnergyQuery.isSuccess && routeFullEnergyQuery.data)
            return {
                nominalMissionEnergyCurve: routeFullEnergyQuery.data.mainEnergyPowercurve,
                csflPdm2EnergyCurve: routeFullEnergyQuery.data.csflWorstCasePowerCurve,
                energyConductedRouteCurve,

                unusableEnergy: routeFullEnergyQuery.data.unusableEnergy,
                finalReserve: routeFullEnergyQuery.data.finalReserve,
                additionalEnergy: routeFullEnergyQuery.data.additionalEnergy,
                extraEnergy: routeFullEnergyQuery.data.extraEnergy,
                discretionaryEnergy: routeFullEnergyQuery.data.discretionaryEnergy,

                contingencyEnergy: routeFullEnergyQuery.data.contingencyEnergy,
            };

        if (routePreliminaryEnergyQuery.isSuccess && routePreliminaryEnergyQuery.data)
            return {
                nominalMissionEnergyCurve: routePreliminaryEnergyQuery.data.mainEnergyPowercurve,
                energyConductedRouteCurve,

                unusableEnergy: routePreliminaryEnergyQuery.data.unusableEnergy,
                finalReserve: routePreliminaryEnergyQuery.data.finalReserve,
                additionalEnergy: routePreliminaryEnergyQuery.data.additionalEnergy,
                extraEnergy: routePreliminaryEnergyQuery.data.extraEnergy,
                discretionaryEnergy: routePreliminaryEnergyQuery.data.discretionaryEnergy,

                contingencyEnergy: routePreliminaryEnergyQuery.data.contingencyEnergy,
            };

        if (conductedRouteEnergyTemperatureQuery.isSuccess && conductedRouteEnergyTemperatureQuery.data)
            return {
                unusableEnergy: 0,
                finalReserve: 0,
                additionalEnergy: 0,
                extraEnergy: 0,
                discretionaryEnergy: 0,
                nominalMissionEnergyCurve: [],
                csflPdm2EnergyCurve: [],
                energyConductedRouteCurve,
                contingencyEnergy: 0,
            };
        return {
            unusableEnergy: 0,
            finalReserve: 0,
            additionalEnergy: 0,
            extraEnergy: 0,
            discretionaryEnergy: 0,
            nominalMissionEnergyCurve: [],
            csflPdm2EnergyCurve: [],
            energyConductedRouteCurve: [],
            contingencyEnergy: 0,
        };
    }, [routeFullEnergyQuery, routePreliminaryEnergyQuery, conductedRouteEnergyTemperatureQuery]);

    const actualOptions: EChartsOption = useMemo(
        () => ({
            ...chartOption,
            grid: { ...chartOption.grid, left: isModalOpen ? "5%" : "7%", right: isModalOpen ? "16%" : "30%" },
            legend: {
                ...chartOption.legend,
                top: "12%",
                left: isModalOpen ? "85%" : "70%",
                data: [
                    NOMINAL_MISSION_ENERGY,
                    CSFL_NOMINAL_ENERGY,
                    CSFL_PDM_2_ENERGY,
                    CONTINGENCY_ENERGY,
                    ENERGY_CONDUCTED_ROUTE,
                    DISCRETIONARY_ENERGY,
                    EXTRA_ENERGY,
                    ADDITIONAL_ENERGY,
                    FINAL_RESERVE,
                    UNUSABLE_ENERGY,
                ],
            },
        }),
        [isModalOpen]
    );
    const chartPowerCurve = useChart(actualOptions, []);

    const handleCalculate = useCallback(() => {
        if (!chartPowerCurve.current) return;
        const chart = getInstanceByDom(chartPowerCurve.current);
        if (!chart) return;
        if (
            (!routePreliminaryEnergyQuery.isSuccess || !routePreliminaryEnergyQuery.data) &&
            (!routeFullEnergyQuery.isSuccess || !routeFullEnergyQuery.data)
        )
            return;

        const energyConductedRouteData = [];
        if (energyConductedRouteCurve)
            for (const { time, remainingEnergy } of energyConductedRouteCurve) {
                const timeString = formatIsoString(time);
                energyConductedRouteData.push([timeString, +remainingEnergy.toPrecision(4)]);
            }

        const nominalMissionEnergyData = [];
        const unusableEnergyData = [];
        const finalReserveData = [];
        const additionalEnergyData = [];
        const extraEnergyData = [];
        const discretionaryEnergyData = [];
        const contingencyEnergyData = [];
        for (const { time, remainingEnergy } of nominalMissionEnergyCurve) {
            const timeString = formatIsoString(time);
            nominalMissionEnergyData.push([timeString, +remainingEnergy.toFixed(2)]);

            unusableEnergyData.push([timeString, formatNumber(unusableEnergy)]);
            finalReserveData.push([timeString, formatNumber(finalReserve)]);
            additionalEnergyData.push([timeString, formatNumber(additionalEnergy)]);
            extraEnergyData.push([timeString, formatNumber(extraEnergy)]);
            discretionaryEnergyData.push([timeString, formatNumber(discretionaryEnergy)]);
            contingencyEnergyData.push([timeString, formatNumber(contingencyEnergy)]);
        }
        const finalReserveAndUnusableEnergy = formatNumber(finalReserve) + formatNumber(unusableEnergy);
        const csflPowerCurve = routeFullEnergyQuery.data;

        const series = [
            nominalMissionEnergyData.length > 0 && {
                id: "nominalMissionEnergy",
                name: NOMINAL_MISSION_ENERGY,
                type: "line",
                smooth: false,
                symbol: "none",
                color: colors.nominalEnergy,
                data: nominalMissionEnergyData,
                silent: true,
            },
            csflPowerCurve?.csflPowerCurve &&
                csflPowerCurve.csflPowerCurve.length > 0 && {
                    id: "csflNominalEnergy",
                    name: CSFL_NOMINAL_ENERGY,
                    data: csflPowerCurve.csflPowerCurve.map((interval) => [
                        formatIsoString(interval.time),
                        formatNumber(interval.bestReachableCsflSiteEnergy + finalReserveAndUnusableEnergy),
                    ]),
                    type: "line",
                    color: colors.nominalCsflEnergy,
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
                },
            csflPowerCurve?.csflWorstCasePowerCurve &&
                csflPowerCurve.csflWorstCasePowerCurve.length > 0 && {
                    id: "csflPdm2Energy",
                    name: CSFL_PDM_2_ENERGY,
                    data: csflPowerCurve.csflWorstCasePowerCurve.map((interval) => [
                        formatIsoString(interval.time),
                        formatNumber(interval.bestReachableCsflSiteEnergy + finalReserveAndUnusableEnergy),
                    ]),
                    type: "line",
                    color: colors.pdm2CsflEnergy,
                    smooth: true,
                    symbol: "none",
                    silent: true,
                    markLine: {
                        silent: true,
                        lineStyle: {
                            color: colors,
                        },
                        symbol: ["none", "none"],
                        label: {
                            position: "insideEndBottom",
                        },
                        data: markLineData,
                    },
                },
            unusableEnergy && {
                id: "unusableEnergy",
                name: UNUSABLE_ENERGY,
                type: "line",
                symbol: "none",
                areaStyle: {},
                lineStyle: {
                    width: 0,
                },
                color: colors.unusableEnergy,
                data: unusableEnergyData,
                stack: "Total",
            },
            finalReserve && {
                id: "finalReserve",
                name: FINAL_RESERVE,
                type: "line",
                symbol: "none",
                areaStyle: {},
                lineStyle: {
                    width: 0,
                },
                color: colors.finalReserveEnergy,
                data: finalReserveData,
                stack: "Total",
            },
            additionalEnergy && {
                id: "additionalEnergy",
                name: ADDITIONAL_ENERGY,
                type: "line",
                symbol: "none",
                areaStyle: {},
                lineStyle: {
                    width: 0,
                },
                color: colors.additionalEnergy,
                data: additionalEnergyData,
                stack: "Total",
            },
            extraEnergy && {
                id: "extraEnergy",
                name: EXTRA_ENERGY,
                type: "line",
                symbol: "none",
                areaStyle: {},
                lineStyle: {
                    width: 0,
                },
                color: colors.extraEnergy,
                data: extraEnergyData,
                stack: "Total",
            },
            discretionaryEnergy && {
                id: "discretionaryEnergy",
                name: DISCRETIONARY_ENERGY,
                type: "line",
                symbol: "none",
                areaStyle: {},
                lineStyle: {
                    width: 0,
                },
                color: colors.discretionaryEnergy,
                data: discretionaryEnergyData,
                stack: "Total",
            },
            contingencyEnergy && {
                id: "contingencyEnergy",
                name: CONTINGENCY_ENERGY,
                type: "line",
                symbol: "none",
                areaStyle: {},
                lineStyle: {
                    width: 0,
                },
                color: colors.contingencyEnergy,
                data: contingencyEnergyData,
                stack: "Total",
            },

            energyConductedRouteCurve.length > 0 && {
                id: "energyConductedRoute",
                name: ENERGY_CONDUCTED_ROUTE,
                type: "line",
                symbol: "none",
                color: colors.conductedRouteEnergy,
                data: energyConductedRouteData,
            },
        ];

        chart.setOption({
            xAxis: {
                min: "dataMin",
                max: "dataMax",
            },
            series,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        chartPowerCurve,
        routePreliminaryEnergyQuery.data,
        routePreliminaryEnergyQuery.isSuccess,
        conductedRouteEnergyTemperatureQuery.data,
        conductedRouteEnergyTemperatureQuery.isSuccess,
        allCsflSitesData,
        routeFullEnergyQuery.isSuccess,
        routeFullEnergyQuery,
    ]);

    useEffect(() => {
        if (!chartPowerCurve.current) return;
        const chart = getInstanceByDom(chartPowerCurve.current);
        chart?.on("finished", () => registerLegendClickEvent(chart));
        handleCalculate();
    }, [handleCalculate, chartPowerCurve, registerLegendClickEvent]);

    useEffect(() => {
        setIsLoading?.(routeFullEnergyQuery.isFetching);
    }, [routeFullEnergyQuery.isFetching, setIsLoading]);

    useEffect(() => {
        setIsLoading?.(routeFullEnergyQuery.isFetching);
    }, [routeFullEnergyQuery.isFetching, setIsLoading]);

    return {
        chartPowerCurve,
        taxiIsValid: routeFullEnergyQuery.data?.taxi.taxiValid && routeFullEnergyQuery.data.taxi.taxiCsflValid,
        energyNeededForTaxiing: routeFullEnergyQuery.data?.taxi?.taxiEnergy?.reduce(
            (accumulator, current) => accumulator + current,
            0
        ),
    };
};
