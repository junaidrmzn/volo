import { Box, HStack, Text, VStack, useToken } from "@volocopter/design-library-react";
import { MassAndBalancePoint } from "@voloiq-typescript-api/aircraft-management-types";
import * as echarts from "echarts";
import { useEffect, useRef } from "react";
import { useMissionTranslations } from "../../../translations/useMissionTranslations";
import { LongitudinalEnvelope } from "./useGetEnvelopesData";

export type UseLateralEnvelopeChart = {
    envelopes: LongitudinalEnvelope;
    latCgEnvelopePoints: MassAndBalancePoint[];
};

export const useLateralEnvelopeChart = (props: UseLateralEnvelopeChart) => {
    const { envelopes, latCgEnvelopePoints } = props;

    const mValues = Object.values(latCgEnvelopePoints).map((entry) => entry.m);
    const kgValues = Object.values(latCgEnvelopePoints).map((entry) => entry.kg);

    const cgXValues = Object.values(envelopes).map((entry) => entry[0]);
    const cgYValues = Object.values(envelopes).map((entry) => entry[1]);

    const { t } = useMissionTranslations();
    const chartRef = useRef<HTMLDivElement | null>(null);
    const nominalEnvelopeArea = useToken("colors", "indigo.150");

    useEffect(() => {
        const chart = echarts.init(chartRef.current as HTMLDivElement);

        const scatterSeriesDataArray = [
            {
                name: t("massAndBalanceGraph.bem"),
                value: envelopes.bem,
                emphasis: { disabled: true },
            },
            {
                name: t("massAndBalanceGraph.battery"),
                value: envelopes.bom,
                emphasis: { disabled: true },
            },
            {
                name: t("massAndBalanceGraph.pilot"),
                value: envelopes.tom,
                emphasis: { disabled: true },
            },
            {
                name: t("massAndBalanceGraph.passanger"),
                value: envelopes.tom1,
                emphasis: { disabled: true },
            },
            {
                name: t("massAndBalanceGraph.luggage"),
                value: envelopes.tom2,
                emphasis: { disabled: true },
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
                min: Math.min(...cgXValues, ...mValues) - 0.1,
                max: Math.max(...cgXValues, ...mValues) + 0.1,
                name: t("aircraftTab.lateralEnvelope.xaxisLabel"),
                nameLocation: "middle",
                nameGap: 25,
                axisLine: {
                    show: false,
                },
            },
            yAxis: {
                min: Math.min(...cgYValues, ...kgValues) - 10,
                max: Math.max(...cgYValues, ...kgValues) + 10,
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
                        const points = latCgEnvelopePoints?.map((reference) => api.coord([reference.m, reference.kg]));

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
                    data: latCgEnvelopePoints,
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
    }, [t]);

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
