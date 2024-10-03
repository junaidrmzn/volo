import { HStack, Text, VStack } from "@volocopter/design-library-react";
import type { Parameter } from "@voloiq/flight-test-definition-api/v1";
import { TextWithLabel } from "@voloiq/text-layouts";
import { EssentialOrDesirableBadge } from "./EssentialOrDesirableBadge";
import { SafetyOfFlightCriticalBadge } from "./SafetyOfFlightCriticalBadge";
import { useFtiParametersTranslation } from "./translations/useFtiParametersTranslation";

export type FtiParameterCardProps = {
    ftiParameter: Parameter;
    isEssential?: boolean;
};

export const FtiParameterCard = (props: FtiParameterCardProps) => {
    const { ftiParameter, isEssential } = props;
    const { aircraftZone, ataIspec, ftiCode, sensorType, shortDescription, unit, isSafetyOfFlightCritical } =
        ftiParameter;
    const { t } = useFtiParametersTranslation();

    return (
        <HStack bgColor="gray300Gray800" spacing={6} px={6} py={1} borderRadius="sm">
            <HStack flex={9} justifyContent="space-between">
                <VStack spacing={0} alignItems="flex-start">
                    <Text fontSize="xs" fontWeight="bold" lineHeight={6}>
                        {ftiCode}
                    </Text>
                    <Text fontSize="xs" lineHeight={6}>
                        {ataIspec?.label} • {t("FTI")}
                    </Text>
                    <Text fontSize="xs" lineHeight={6}>
                        {aircraftZone.label} • {sensorType?.label}
                    </Text>
                </VStack>
                <TextWithLabel label={t("Unit")} text={unit?.label} size="small" unknownValueText="-" />
                <TextWithLabel
                    label={t("Short Description")}
                    text={shortDescription}
                    size="small"
                    unknownValueText="-"
                />
            </HStack>
            <HStack flex={1} justifyContent="flex-end">
                {isSafetyOfFlightCritical && <SafetyOfFlightCriticalBadge />}
                <EssentialOrDesirableBadge isEssential={isEssential} />
            </HStack>
        </HStack>
    );
};
