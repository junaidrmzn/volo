import { HStack, Text } from "@volocopter/design-library-react";
import type { FlightTestCrewInsert } from "@voloiq/flight-test-definition-api/v1";
import { useFlightTestCrewAndOccupantsTranslation } from "./translations/useFlightTestCrewAndOccupantsTranslation";

export type FlightTestCrewAndOccupantsTableRowProps = {
    index: number;
    flightTestCrewMember: Partial<FlightTestCrewInsert>;
    showDivider?: boolean;
};

export const FlightTestCrewAndOccupantsTableRow = (props: FlightTestCrewAndOccupantsTableRowProps) => {
    const { index, flightTestCrewMember, showDivider = true } = props;

    const { t } = useFlightTestCrewAndOccupantsTranslation();

    return (
        <HStack
            w="full"
            borderBottomWidth={showDivider ? 1 : 0}
            borderColor="actionableDefaultSecondary"
            role="listitem"
            aria-label={`${t("Flight Test Crew & Occupants table row")} #${index}`}
        >
            <Text flex={1} fontSize="xs" textAlign="center" fontWeight="semibold">
                {`${index}.`}
            </Text>
            <HStack flex={9} spacing={2}>
                <Text flex={1} fontSize="xs" textAlign="start" lineHeight={8}>
                    {flightTestCrewMember?.name ?? "-"}
                </Text>
                <Text flex={1} fontSize="xs" textAlign="start" lineHeight={8}>
                    {flightTestCrewMember?.role ?? "-"}
                </Text>
                <Text flex={1} fontSize="xs" textAlign="start" lineHeight={8}>
                    {flightTestCrewMember?.category ?? "-"}
                </Text>
                <Text flex={1} fontSize="xs" textAlign="start" lineHeight={8}>
                    {flightTestCrewMember?.position ?? "-"}
                </Text>
            </HStack>
        </HStack>
    );
};
