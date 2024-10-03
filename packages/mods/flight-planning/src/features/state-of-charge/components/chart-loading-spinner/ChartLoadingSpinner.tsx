import { Box, HStack, Text } from "@volocopter/design-library-react";
import { LoadingSpinner } from "../../../../components";
import { useFlightPlanningTranslation } from "../../../../translations";

export const ChartLoadingSpinner = () => {
    const { t } = useFlightPlanningTranslation();
    return (
        <HStack w="100%" textAlign="center" py="8" justify="center">
            <Box width="10">
                <LoadingSpinner size="xs" />
            </Box>
            <Text size="sm">{t("stateOfCharge.calculatingCsflPowerCurve")}</Text>
        </HStack>
    );
};
