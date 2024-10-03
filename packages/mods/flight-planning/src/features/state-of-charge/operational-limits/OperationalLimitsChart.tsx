import { Box, Divider, FormLabel, HStack, NumberInput, Text, VStack } from "@volocopter/design-library-react";
import { Chart } from "@voloiq/graph";
import { useFlightPlanningTranslation } from "../../../translations";
import { OperationalLimits } from "./OperationalLimits";
import { useOperationalLimitsChartOptions } from "./useOperationalLimitsChartOptions";

type OperationalLimitsChartProps = {
    isModalOpen: boolean;
};

export const OperationalLimitsChart = (props: OperationalLimitsChartProps) => {
    const { isModalOpen } = props;
    const { t } = useFlightPlanningTranslation();
    const { options, windScenario, setWindScenario } = useOperationalLimitsChartOptions(isModalOpen);

    return (
        <Box>
            <Text display="flex" justifyContent="center" size="medium" fontWeight="bold">
                {t("stateOfCharge.operationalLimits")}
            </Text>

            <HStack h={isModalOpen ? "50rem" : "30rem"}>
                <Chart
                    options={options}
                    chartElement={(ref) => <Box ref={ref} h={isModalOpen ? "50rem" : "30rem"} w="75%" />}
                >
                    <OperationalLimits windScenario={windScenario} setWindScenario={setWindScenario} />
                </Chart>
                <VStack w="20%">
                    <VStack alignItems="start">
                        <FormLabel> {t("stateOfCharge.windSpeed")} </FormLabel>
                        <NumberInput value={windScenario.windSpeed} isDisabled variant="outline" />
                    </VStack>
                    <VStack alignItems="start">
                        <FormLabel> {t("stateOfCharge.windDirection")} </FormLabel>
                        <NumberInput value={windScenario.windDirection} isDisabled variant="outline" />
                    </VStack>
                </VStack>
            </HStack>

            <Box px={8} py={4}>
                <Divider />
            </Box>
        </Box>
    );
};
