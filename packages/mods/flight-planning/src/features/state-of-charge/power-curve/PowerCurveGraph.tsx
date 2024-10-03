import { Box, Divider, Text } from "@volocopter/design-library-react";
import type { SynchronizedChartProps } from "@voloiq/graph";
import { useFlightPlanningTranslation } from "../../../translations";
import { MarkLineReference } from "../types";
import { usePowerCurveGraph } from "./usePowerCurveGraph";

type PowerCurveGraphProps = {
    setIsLoading: (loading: boolean) => void;
    isModalOpen: boolean;
    markLineReference: MarkLineReference;
} & SynchronizedChartProps;

export const PowerCurveGraph = (props: PowerCurveGraphProps) => {
    const { registerLegendClickEvent, setIsLoading, isModalOpen, markLineReference } = props;
    const { t } = useFlightPlanningTranslation();
    const { chartPowerCurve } = usePowerCurveGraph(
        isModalOpen,
        registerLegendClickEvent,
        markLineReference,
        setIsLoading
    );

    return (
        <Box>
            <Text display="flex" justifyContent="center" size="medium" fontWeight="bold">
                {t("stateOfCharge.batteryCapacity")}
            </Text>
            <Box ref={chartPowerCurve} height={isModalOpen ? "23rem" : "20rem"} width="100%" />
            <Box px={8} py={4}>
                <Divider />
            </Box>
        </Box>
    );
};
