import { HStack, Spacer, Tag, Text, VStack } from "@volocopter/design-library-react";
import { useFeatureFlags } from "@voloiq/feature-flags";
import type { FlightTestOrder } from "@voloiq/flight-test-definition-api/v2";
import { useGetFlightTestOrderStatusTag } from "@voloiq/flight-test-definition-utils";
import { TextWithLabel } from "@voloiq/text-layouts";
import { useFlightTestOrderListItemV2Translation } from "./translations/useFlightTestOrderListItemV2Translation";

export type FlightTestOrderListItemTitleV2Props = {
    flightTestOrder: FlightTestOrder;
};

export const FlightTestOrderListItemTitleV2 = (props: FlightTestOrderListItemTitleV2Props) => {
    const { flightTestOrder } = props;
    const { missionTitle, ftoId, masterModel, msn, flightNumber, status } = flightTestOrder;
    const { t } = useFlightTestOrderListItemV2Translation();
    const { isFeatureFlagEnabled } = useFeatureFlags();
    const { colorScheme, label } = useGetFlightTestOrderStatusTag({ status });

    return (
        <HStack spacing={3} boxSize="full">
            <HStack spacing={6} flex={1}>
                <VStack spacing={0} alignItems="flex-start">
                    <Text fontSize="xs" lineHeight={6} fontWeight="bold">
                        {t("Flt#")}
                        {flightNumber}: {missionTitle}
                    </Text>
                    <Text fontSize="xs" lineHeight={6}>
                        {ftoId}
                    </Text>
                </VStack>
                <Spacer />
                <TextWithLabel size="small" label={t("Flt#")} text={flightNumber} unknownValueText="-" />
                <TextWithLabel size="small" label={t("Master Model")} text={masterModel} />
                <TextWithLabel size="small" label={t("MSN")} text={msn} />
                {isFeatureFlagEnabled("vte-1506") && (
                    <Tag colorScheme={colorScheme}>
                        <Tag.Label>{label}</Tag.Label>
                    </Tag>
                )}
            </HStack>
        </HStack>
    );
};
