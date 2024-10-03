import { Box, HStack, Text, VStack, useToken } from "@volocopter/design-library-react";
import { Aircraft } from "@voloiq-typescript-api/aircraft-management-types";
import * as echarts from "echarts";
import { useEffect, useRef } from "react";
import { useMissionTranslations } from "../../../../translations/useMissionTranslations";

export type UseLateralEnvelopeChart = {
    aircraftData: Aircraft | undefined;
    positions: { bemMy: number; batteryMY: number; pilotMY: number; passangerMY: number; luggageMY: number };
    weights: { batteryWeight: number; pilotWeight: number; passangerWeight: number; luggageWeight: number };
};

export const useLateralEnvelopeChart = (props: UseLateralEnvelopeChart) => {
    const { t } = useMissionTranslations();
    const chartRef = useRef<HTMLDivElement | null>(null);
    const { positions, weights, aircraftData } = props;
    const { bemMy, batteryMY, luggageMY, passangerMY, pilotMY } = positions;
    const { batteryWeight, luggageWeight, passangerWeight, pilotWeight } = weights;

    const nominalEnvelopeArea = useToken("colors", "indigo.150");

    useEffect(() => {
        const chart = echarts.init(chartRef.current as HTMLDivElement);

        const lateralReferenceData = aircraftData?.massAndBalanceData?.latCgEnvelopePoints;

        const BEM = aircraftData?.massAndBalanceData?.bem ?? 1;
        const BOW = BEM + (batteryWeight || 0);
        const TOW = BOW + (pilotWeight || 0);
        const TOW1 = TOW + (passangerWeight || 0);
        const TOW2 = TOW1 + (luggageWeight || 0);

        const bemY = bemMy / BEM;
        const batteryY = batteryMY / BOW;
        const pilotY = pilotMY / TOW;
        const passangerY = passangerMY / TOW1;
        const luggageY = luggageMY / TOW2;

        const scatterSeriesDataArray = [
            {
                name: t("massAndBalanceGraph.bem"),
                value: [bemY, BEM],
                emphasis: {
                    disabled: true,
                },
            },
            {
                name: t("massAndBalanceGraph.battery"),
                value: [batteryY, BOW],
                emphasis: {
                    disabled: true,
                },
            },
            {
                name: t("massAndBalanceGraph.pilot"),
                value: [pilotY, TOW],
                emphasis: {
                    disabled: true,
                },
            },
            {
                name: t("massAndBalanceGraph.passanger"),
                value: [passangerY, TOW1],
                emphasis: {
                    disabled: true,
                },
            },
            {
                name: t("massAndBalanceGraph.luggage"),
                value: [luggageY, TOW2],
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
                right: 65,
                bottom: 120,
                left: 0,
            },
            xAxis: {
                min: Math.min(bemY, batteryY, pilotY, passangerY, luggageY) - 0.1,
                max: Math.max(bemY, batteryY, pilotY, passangerY, luggageY) + 0.1,
                name: t("aircraftTab.lateralEnvelope.xaxisLabel"),
                nameLocation: "middle",
                nameGap: 25,
                axisLine: {
                    show: false,
                },
            },
            yAxis: {
                min: Math.min(BEM, BOW, TOW, TOW, TOW2) - 10,
                max: Math.max(BEM, BOW, TOW, TOW, TOW2) + 10,
                position: "right",
                name: t("aircraftTab.lateralEnvelope.yaxisLabel"),
                nameLocation: "middle",
                nameGap: 35,
                axisLine: {
                    show: false,
                },
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
                        const points = lateralReferenceData?.map((reference) => api.coord([reference.m, reference.kg]));

                        return {
                            type: "polygon",
                            transition: ["shape"],
                            name: "Lateral Envelope",
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
                    data: lateralReferenceData,
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
        aircraftData?.massAndBalanceData?.latCgEnvelopePoints,
        batteryMY,
        batteryWeight,
        bemMy,
        luggageMY,
        luggageWeight,
        nominalEnvelopeArea,
        passangerMY,
        passangerWeight,
        pilotMY,
        pilotWeight,
        t,
    ]);

    return (
        <VStack width="100%">
            <HStack width="100%" justifyContent="flex-start">
                <Text fontSize="sm" fontWeight="bold" align="left">
                    {t("aircraftTab.lateralEnvelope.header")}
                </Text>
            </HStack>
            <Box ref={chartRef} width="25vw" height="60vh" />
        </VStack>
    );
};
