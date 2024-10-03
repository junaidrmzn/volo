import { Text, useColorModeValue } from "@volocopter/design-library-react";
import { match } from "ts-pattern";
import { useFlightPlanningTranslation } from "../../../translations";
import { RouteValidationStatus } from "../../../utils";

type ValidationStatusProps = {
    validationStatus?: string;
};
export const ValidationStatus = (props: ValidationStatusProps) => {
    const { validationStatus } = props;
    const { t } = useFlightPlanningTranslation();

    const validTextColor = useColorModeValue("green.700", "green.300");
    const inValidTextColor = useColorModeValue("red.700", "red.300");
    const partiallyValidTextColor = useColorModeValue("orange.700", "orange.300");
    const notYetValidatedTextColor = useColorModeValue("gray.900", "gray.100");

    const { label, color, fontSize } = match(validationStatus)
        .with(RouteValidationStatus.VALID, () => ({
            label: t("flightStatusBar.valid"),
            color: validTextColor,
            fontSize: "md",
        }))
        .with(RouteValidationStatus.INVALID, () => ({
            label: t("flightStatusBar.invalid"),
            color: inValidTextColor,
            fontSize: "md",
        }))
        .with(RouteValidationStatus.VALIDWITHLIMITATIONS, () => ({
            label: t("flightStatusBar.validWithLimitations"),
            color: partiallyValidTextColor,
            fontSize: "xs",
        }))
        .otherwise(() => ({
            label: t("flightStatusBar.notYetValidated"),
            color: notYetValidatedTextColor,
            fontSize: "xs",
        }));

    return (
        <Text fontWeight="bold" color={color} fontSize={fontSize}>
            {label}
        </Text>
    );
};
