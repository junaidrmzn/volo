import { Box, HStack, Spacer, Stack, Tag, Text } from "@volocopter/design-library-react";
import type { CrewMember, Reservation } from "@voloiq-typescript-api/network-scheduling-types";
import { useEventCardResize } from "@voloiq/time-scheduler";
import { useMissionTranslations } from "../../translations/useMissionTranslations";

export type CrewEventProps = {
    crewReservations: Reservation;
    crewData: CrewMember;
};

export const CrewEventCard = (props: CrewEventProps) => {
    const { crewData, crewReservations } = props;
    const { t } = useMissionTranslations();

    const { isStatusBoxVisible, isTitleVisible, isSubtitleVisible, outerStackRef } = useEventCardResize();

    return (
        <Stack>
            <HStack ref={outerStackRef} width="100%" height="100%" bg="gray.100" borderRadius="sm">
                <Box bg="darkBlue.300" width="5px" borderLeftRadius="sm" height="100%" />
                <Stack pl={5}>
                    {isTitleVisible && (
                        <Text fontSize="sm" lineHeight="short" fontWeight="bold">
                            {crewReservations.reservationType}
                        </Text>
                    )}
                    {isSubtitleVisible && (
                        <Stack>
                            <Text size="sm">{crewReservations.alternativeIdentifier}</Text>
                        </Stack>
                    )}
                </Stack>
                <Spacer />
                {isStatusBoxVisible && (
                    <Box alignItems="self-end" pr={5}>
                        <Tag colorScheme={crewData.available ? "blue" : "error-subtle"}>
                            <Tag.Label variant="light">
                                {crewData.available ? t("available") : t("unavailable")}
                            </Tag.Label>
                        </Tag>
                    </Box>
                )}
            </HStack>
        </Stack>
    );
};
