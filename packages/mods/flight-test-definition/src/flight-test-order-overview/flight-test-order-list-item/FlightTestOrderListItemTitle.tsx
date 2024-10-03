import { HStack, Spacer, Text, VStack } from "@volocopter/design-library-react";
import type { FlightTestOrder } from "@voloiq/flight-test-definition-api/v1";
import { TextWithLabel } from "@voloiq/text-layouts";
import { useFlightTestOrderListItemTranslation } from "./translations/useFlightTestOrderListItemTranslation";

export type FlightTestOrderListItemTitleProps = {
    flightTestOrder: FlightTestOrder;
};

export const FlightTestOrderListItemTitle = (props: FlightTestOrderListItemTitleProps) => {
    const { flightTestOrder } = props;
    const { missionTitle, ftoId, masterModel, msn, flightNumber } = flightTestOrder;
    const { t } = useFlightTestOrderListItemTranslation();

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
            </HStack>
        </HStack>
    );
};
