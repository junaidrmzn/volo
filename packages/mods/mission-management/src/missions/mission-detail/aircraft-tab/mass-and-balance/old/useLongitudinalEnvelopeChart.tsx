import { Box, HStack, Text, VStack, useToken } from "@volocopter/design-library-react";
import { Aircraft } from "@voloiq-typescript-api/aircraft-management-types";
import * as echarts from "echarts";
import { useEffect, useRef } from "react";
import { useMissionTranslations } from "../../../../translations/useMissionTranslations";

export type UseLongitudinalEnvelopeChartProps = {
    aircraftData: Aircraft | undefined;
    positions: { bemMx: number; batteryMX: number; pilotMX: number; passangerMX: number; luggageMX: number };
    weights: { batteryWeight: number; pilotWeight: number; passangerWeight: number; luggageWeight: number };
};

export const useLongitudinalEnvelopeChart = (props: UseLongitudinalEnvelopeChartProps) => {
    const { t } = useMissionTranslations();
    const { positions, weights, aircraftData } = props;
    const { bemMx, batteryMX, luggageMX, passangerMX, pilotMX } = positions;
    const { batteryWeight, luggageWeight, passangerWeight, pilotWeight } = weights;
    const chartRef = useRef<HTMLDivElement | null>(null);
    const nominalEnvelopeArea = useToken("colors", "indigo.150");

    useEffect(() => {
        const chart = echarts.init(chartRef.current as HTMLDivElement);

        const longitudinalReferenceData = aircraftData?.massAndBalanceData?.longCgEnvelopePoints;

        const BEM = aircraftData?.massAndBalanceData?.bem ?? 1;
        const BOW = BEM + (batteryWeight || 0);
        const TOW = BOW + (pilotWeight || 0);
        const TOW1 = TOW + (passangerWeight || 0);
        const TOW2 = TOW1 + (luggageWeight || 0);

        const bemX = bemMx / BEM;
        const batteryX = batteryMX / BOW;
        const pilotX = pilotMX / TOW;
        const passangerX = passangerMX / TOW1;
        const luggageX = luggageMX / TOW2;

        const scatterSeriesDataArray = [
            {
                name: t("massAndBalanceGraph.bem"),
                value: [bemX, BEM],
                emphasis: {
                    disabled: true,
                },
            },
            {
                name: t("massAndBalanceGraph.battery"),
                value: [batteryX, BOW],
                emphasis: {
                    disabled: true,
                },
            },
            {
                name: t("massAndBalanceGraph.pilot"),
                value: [pilotX, TOW],
                emphasis: {
                    disabled: true,
                },
            },
            {
                name: t("massAndBalanceGraph.passanger"),
                value: [passangerX, TOW1],
                emphasis: {
                    disabled: true,
                },
            },
            {
                name: t("massAndBalanceGraph.luggage"),
                value: [luggageX, TOW2],
                emphasis: {
                    disabled: true,
                },
            },
        ];

        const getScatterData = () =>
            scatterSeriesDataArray.map((scatterPoint) => ({
                name: scatterPoint.name,
                symbolSize: 10,
                data: [scatterPoint],
                type: "scatter",
            }));

        const option = {
            tooltip: {
                trigger: "axis",
            },
            legend: {
                itemWidth: 10,
                itemHeight: 10,
                bottom: 0,
            },
            grid: {
                top: 50,
                right: 0,
                bottom: 120,
                left: 65,
            },
            xAxis: {
                min: Math.min(bemX, batteryX, pilotX, passangerX, luggageX) - 0.1,
                max: Math.max(bemX, batteryX, pilotX, passangerX, luggageX) + 0.1,
                name: t("aircraftTab.longitudinalEnvelope.xaxisLabel"),
                nameLocation: "middle",
                nameGap: 25,
            },
            yAxis: {
                min: Math.min(BEM, BOW, TOW, TOW, TOW2) - 10,
                max: Math.max(BEM, BOW, TOW, TOW, TOW2) + 10,
                name: t("aircraftTab.longitudinalEnvelope.yaxisLabel"),
                nameLocation: "middle",
                nameGap: 35,
            },
            series: [
                {
                    type: "custom",
                    z: 0,
                    renderItem: (
                        params: { context: { rendered: boolean } },
                        api: { coord: (data: number[]) => number[][] }
                    ) => {
                        if (params.context.rendered) {
                            return null;
                        }
                        params.context.rendered = true;
                        const points = longitudinalReferenceData?.map((reference) =>
                            api.coord([reference.m, reference.kg])
                        );

                        return {
                            type: "polygon",
                            transition: ["shape"],
                            name: "Longitudinal Envelope",
                            shape: {
                                points,
                            },
                            style: {
                                fill: nominalEnvelopeArea,
                                stroke: echarts.color.lift(nominalEnvelopeArea, 0.1),
                            },
                            silent: true,
                            emphasis: {
                                disabled: true,
                            },
                        };
                    },
                    clip: true,
                    data: longitudinalReferenceData,
                },
                ...getScatterData(),
            ],
        };

        chart.setOption(option);

        window.addEventListener("resize", () => {
            chart.resize({ width: "auto" });
        });

        return () => {
            chart.dispose();
        };
    }, [
        aircraftData?.aircraftResources,
        aircraftData?.massAndBalanceData?.bem,
        aircraftData?.massAndBalanceData?.longCgEnvelopePoints,
        batteryMX,
        batteryWeight,
        bemMx,
        luggageMX,
        luggageWeight,
        nominalEnvelopeArea,
        passangerMX,
        passangerWeight,
        pilotMX,
        pilotWeight,
        t,
    ]);

    return (
        <VStack width="100%">
            <HStack width="100%" justifyContent="flex-start">
                <Text fontSize="sm" fontWeight="bold" align="left">
                    {t("aircraftTab.longitudinalEnvelope.header")}
                </Text>
            </HStack>
            <Box ref={chartRef} aria-label="graph-box" width="25vw" height="60vh" />
        </VStack>
    );
};
