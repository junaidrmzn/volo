import { Checkbox, Divider, HStack, Switch, Text, VStack } from "@volocopter/design-library-react";
import type { Parameter } from "@voloiq/flight-test-definition-api/v1";
import { TextSeparator } from "@voloiq/flight-test-definition-components";
import { SafetyOfFlightCriticalBadge } from "../SafetyOfFlightCriticalBadge";
import { useFtiParametersEditFormTranslation } from "./translations/useFtiParametersEditFormTranslation";

type WithEssentialToggle = {
    withEssentialToggle: true;
    isEssential: boolean;
    onToggleEssential: (isEssential: boolean) => void;
};
type WithoutEssentialToggle = {
    withEssentialToggle?: never;
    onToggleEssential?: never;
    isEssential?: never;
};

export type FtiParameterCardProps = {
    ftiParameter: Parameter;
    isSelected?: boolean;
    onChange: (isSelected: boolean) => void;
} & (WithEssentialToggle | WithoutEssentialToggle);

export const FtiParameterCard = (props: FtiParameterCardProps) => {
    const { ftiParameter, isSelected = true, onChange, onToggleEssential, withEssentialToggle, isEssential } = props;
    const {
        aircraftZone,
        ataIspec,
        ftiCode,
        sensorType,
        shortDescription,
        unit,
        isSafetyOfFlightCritical,
        parameterSource,
    } = ftiParameter;
    const { t } = useFtiParametersEditFormTranslation();

    return (
        <VStack spacing={1.5} px={4} py={3} bgColor="bgContentLayer" borderRadius="md">
            <HStack w="full" justify={withEssentialToggle ? "space-between" : "flex-start"}>
                <HStack spacing={3}>
                    <Checkbox
                        aria-label={
                            isSelected ? t("Unselect {ftiCode}", { ftiCode }) : t("Select {ftiCode}", { ftiCode })
                        }
                        size="md"
                        onChange={(event) => onChange(event.target.checked)}
                        isChecked={isSelected}
                    />
                    <Text fontSize="sm" fontWeight="semibold" lineHeight={6}>
                        {ftiCode}
                    </Text>

                    {isSafetyOfFlightCritical && <SafetyOfFlightCriticalBadge />}
                </HStack>

                {withEssentialToggle && (
                    <HStack spacing={1.5}>
                        <Text fontSize="xs" lineHeight={6} fontWeight="semibold" color="fontOnBgMuted">
                            {t("Essential")}
                        </Text>
                        <Switch
                            aria-label={
                                isEssential
                                    ? t("Make {ftiCode} desirable", { ftiCode })
                                    : t("Make {ftiCode} essential", { ftiCode })
                            }
                            isChecked={isEssential}
                            onChange={(event) => onToggleEssential?.(event.target.checked)}
                        />
                    </HStack>
                )}
            </HStack>

            <Divider orientation="horizontal" />

            <VStack w="full" h="full" align="flex-start" spacing={0}>
                <Text fontSize="xs" lineHeight={6} aria-label={t("Short Description")}>
                    {shortDescription ?? "-"}
                </Text>
                <HStack spacing={1.5}>
                    <Text fontSize="xs" lineHeight={6} aria-label={t("ATA iSpec 2200")}>
                        {ataIspec?.label ?? "-"}
                    </Text>
                    <TextSeparator />
                    <Text fontSize="xs" lineHeight={6} aria-label={t("Parameter Source")}>
                        {parameterSource?.label ?? "-"}
                    </Text>
                </HStack>
                <HStack spacing={1.5}>
                    <Text fontSize="xs" lineHeight={6} aria-label={t("Aircraft Zone")}>
                        {aircraftZone.label ?? "-"}
                    </Text>
                    <TextSeparator />
                    <Text fontSize="xs" lineHeight={6} aria-label={t("Sensor Type")}>
                        {sensorType?.label ?? "-"}
                    </Text>
                    <TextSeparator />
                    <Text fontSize="xs" lineHeight={6} aria-label={t("Unit")}>
                        {unit?.label ?? "-"}
                    </Text>
                </HStack>
            </VStack>
        </VStack>
    );
};
