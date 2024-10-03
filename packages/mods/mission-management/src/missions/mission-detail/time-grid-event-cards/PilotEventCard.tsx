import { Box, HStack, Spacer, Stack, Tag, Text } from "@volocopter/design-library-react";
import type { CrewMember, Reservation } from "@voloiq-typescript-api/network-scheduling-types";
import { useEventCardResize } from "@voloiq/time-scheduler";
import { useMissionTranslations } from "../../translations/useMissionTranslations";

export type PilotEventProps = {
    pilotReservations: Reservation;
    pilotData: CrewMember;
};

export const PilotEventCard = (props: PilotEventProps) => {
    const { pilotReservations, pilotData } = props;
    const { t } = useMissionTranslations();
    const { isStatusBoxVisible, isSubtitleVisible, outerStackRef, isTitleVisible } = useEventCardResize();

    return (
        <Stack ref={outerStackRef}>
            <HStack width="100%" height="100%" bg="gray.100" borderRadius="sm">
                <Box bg="darkBlue.300" width="5px" borderLeftRadius="sm" height="100%" />
                <Stack pl={5}>
                    {isTitleVisible && (
                        <Text fontSize="sm" lineHeight="short" fontWeight="bold">
                            {pilotReservations.reservationType}
                        </Text>
                    )}
                    {isSubtitleVisible && (
                        <Stack>
                            <Text size="sm">{pilotReservations.alternativeIdentifier}</Text>
                        </Stack>
                    )}
                </Stack>
                <Spacer />
                {isStatusBoxVisible && (
                    <Box alignItems="self-end" pr={5}>
                        <Stack>
                            <Tag colorScheme={pilotData.available ? "blue" : "error-subtle"}>
                                <Tag.Label variant="light">
                                    {pilotData.available ? t("available") : t("unavailable")}
                                </Tag.Label>
                            </Tag>
                            <Text align="center" size="sm">
                                {pilotData.flightHours}
                            </Text>
                        </Stack>
                    </Box>
                )}
            </HStack>
        </Stack>
    );
};
