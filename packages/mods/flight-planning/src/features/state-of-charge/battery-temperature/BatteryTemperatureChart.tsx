import { Box, Text } from "@volocopter/design-library-react";
import { useIsAuthorizedTo } from "@voloiq/auth";
import type { SynchronizedChartProps } from "@voloiq/graph";
import { Chart } from "@voloiq/graph";
import { useFlightPlanningTranslation } from "../../../translations";
import { useGetMarkLines } from "../mission-reference";
import { MarkLineReference } from "../types";
import {
    CsflMaxTemperature,
    CsflPdm2Temperature,
    CsflTemperature,
    NominalMaxTemperature,
    NominalTemperature,
} from "./series";
import { ConductedRouteTemperature } from "./series/conducted-route-temperature";
import { useBatteryTemperatureChart } from "./useBatteryTemperatureChart";
import { useTemperatureChartOptions } from "./useTemperatureChartOptions";

type BatteryTemperatureChartProps = {
    setIsLoading: (loading: boolean) => void;
    isModalOpen: boolean;
    markLineReference: MarkLineReference;
} & SynchronizedChartProps;

export const BatteryTemperatureChart = (props: BatteryTemperatureChartProps) => {
    const { registerLegendClickEvent, setIsLoading, isModalOpen, markLineReference } = props;
    const { t } = useFlightPlanningTranslation();
    const options = useTemperatureChartOptions(isModalOpen);
    const canReadConductedRouteGraph = useIsAuthorizedTo(["read"], ["ConductedRouteGraph"]);
    const { isTemperatureGraphDisplayed, setTemperatureGraphDisplayed } = useBatteryTemperatureChart(setIsLoading);
    const markLineData = useGetMarkLines({ markLineReference, graphType: "batteryTemperature" });

    return (
        <Box>
            <Text display="flex" justifyContent="center" size="medium" fontWeight="bold">
                {t("stateOfCharge.batteryTemperature")}
            </Text>
            <Chart
                options={options}
                chartElement={(ref) => (
                    <Box
                        ref={ref}
                        height={isModalOpen ? "23rem" : "20rem"}
                        width="100%"
                        display={isTemperatureGraphDisplayed ? "block" : "none"}
                        visibility={isTemperatureGraphDisplayed ? "visible" : "hidden"}
                    />
                )}
            >
                <NominalTemperature
                    setHasData={setTemperatureGraphDisplayed}
                    registerLegendClickEvent={registerLegendClickEvent}
                    markLineData={markLineData}
                />
                <CsflTemperature markLineData={markLineData} />
                <CsflPdm2Temperature markLineData={markLineData} />
                <NominalMaxTemperature markLineData={markLineData} />
                <CsflMaxTemperature markLineData={markLineData} />
                {canReadConductedRouteGraph && <ConductedRouteTemperature markLineData={markLineData} />}
            </Chart>
        </Box>
    );
};
