import { Box, Text } from "@volocopter/design-library-react";
import { useFlightPlanningTranslation } from "../../../../translations";
import { formatTtoFromSeconds } from "../../../../utils";
import { useVoltageDropValidation } from "./useVoltageDropValidation";

type VoltageDropValidationMessageProps = {
    selectedRouteId?: number;
};

export const VoltageDropValidationMessage = (props: VoltageDropValidationMessageProps) => {
    const { selectedRouteId } = props;
    const { voltageDrop, voltageTimeIntervals } = useVoltageDropValidation(selectedRouteId);
    const { t } = useFlightPlanningTranslation();

    if (!voltageDrop) return null;
    const { dropBelowAtIndex, dropBelowAtTime, threshold, defaultThresholdUsed } = voltageDrop;

    let message =
        dropBelowAtIndex && dropBelowAtTime
            ? t("stateOfCharge.voltageDropText", {
                  threshold,
                  dropBelowAtTime: formatTtoFromSeconds(dropBelowAtTime.toFixed(2)),
              })
            : t("stateOfCharge.noVoltageDropText", { threshold });

    if (defaultThresholdUsed) {
        message += ` ${t("stateOfCharge.defaultValueUsedText")}`;
    }
    const takeOffVoltage = voltageTimeIntervals?.[0]?.batteryVoltage.toFixed(2);
    if (dropBelowAtIndex === 0) {
        message = t("stateOfCharge.thresholdHigherThanExpectedText", { threshold, takeOffVoltage });
    }

    return (
        <Box w="100%" textAlign="center" paddingTop="4" paddingBottom="8" paddingX="8">
            <Text>{message}</Text>
        </Box>
    );
};
