import { Box, HStack, Text, VStack } from "@volocopter/design-library-react";
import type { FlightTestCrewPatch } from "@voloiq/flight-test-definition-api/v1";
import { FlightTestCrewAndOccupantsTableRow } from "./FlightTestCrewAndOccupantsTableRow";
import { useFlightTestCrewAndOccupantsTranslation } from "./translations/useFlightTestCrewAndOccupantsTranslation";

export type FlightTestCrewAndOccupantsTableProps = {
    flightTestCrewMembers: Partial<FlightTestCrewPatch>[];
};

export const FlightTestCrewAndOccupantsTable = (props: FlightTestCrewAndOccupantsTableProps) => {
    const { flightTestCrewMembers } = props;

    const { t } = useFlightTestCrewAndOccupantsTranslation();

    return (
        <VStack w="full" borderWidth={1} borderColor="bgNavigationLayer2" borderRadius="sm" spacing={0}>
            <HStack
                w="full"
                lineHeight={6}
                fontSize="xs"
                spacing={2}
                borderBottomWidth={2}
                borderColor="actionableDefaultSecondary"
            >
                <Box flex={1} />
                <HStack flex={9} spacing={2}>
                    <Text fontSize="xs" fontWeight="semibold" lineHeight={8} textAlign="start" flex={1}>
                        {t("Name")}
                    </Text>
                    <Text fontSize="xs" fontWeight="semibold" lineHeight={8} textAlign="start" flex={1}>
                        {t("Role")}
                    </Text>
                    <Text fontSize="xs" fontWeight="semibold" lineHeight={8} textAlign="start" flex={1}>
                        {t("Category")}
                    </Text>
                    <Text fontSize="xs" fontWeight="semibold" lineHeight={8} textAlign="start" flex={1}>
                        {t("Position")}
                    </Text>
                </HStack>
            </HStack>
            {flightTestCrewMembers.length > 0 ? (
                flightTestCrewMembers.map((flightTestCrewMember, index) => {
                    const { id, role, position } = flightTestCrewMember;

                    return (
                        <FlightTestCrewAndOccupantsTableRow
                            key={`${role}-${position}-${id}`}
                            index={index + 1}
                            flightTestCrewMember={flightTestCrewMember}
                            showDivider={index < flightTestCrewMembers.length - 1}
                        />
                    );
                })
            ) : (
                <>
                    <FlightTestCrewAndOccupantsTableRow
                        index={1}
                        flightTestCrewMember={{ role: t("Pilot in Command") }}
                    />
                    <FlightTestCrewAndOccupantsTableRow
                        index={2}
                        flightTestCrewMember={{ role: t("Test Conductor") }}
                        showDivider={false}
                    />
                </>
            )}
        </VStack>
    );
};
