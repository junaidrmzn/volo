import { Box, HStack, Spacer, Stack, Tag, Text } from "@volocopter/design-library-react";
import { TechnicalStatus } from "@voloiq-typescript-api/aircraft-management-types";
import type { Aircraft, Reservation } from "@voloiq-typescript-api/network-scheduling-types";
import { useEventCardResize } from "@voloiq/time-scheduler";
import { useMissionTranslations } from "../../translations/useMissionTranslations";

export type AircraftEventProps = {
    aircraftData: Aircraft;
    aircraftReservations: Reservation;
};

export const AircraftEventCard = (props: AircraftEventProps) => {
    const { aircraftData, aircraftReservations } = props;
    const { t } = useMissionTranslations();
    const { isStatusBoxVisible, isSubtitleVisible, outerStackRef, isTitleVisible } = useEventCardResize();

    const getStatusTranslationKey = (message: string | undefined) => {
        if (message === TechnicalStatus.SERVICEABLE) return "technicalStatus.SERVICEABLE";
        if (message === TechnicalStatus.UNSERVICEABLE) return "technicalStatus.UNSERVICEABLE";
        return "technicalStatus.SERVICEABLE_WITH_LIMITATIONS";
    };

    const technicalStatus = getStatusTranslationKey(aircraftData?.technicalStatus);
    return (
        <Stack ref={outerStackRef}>
            <HStack width="100%" height="100%" bg="gray.100" borderRadius="sm">
                <Box bg="darkBlue.300" width="5px" borderLeftRadius="sm" height="100%" />
                <Stack pl={5}>
                    {isTitleVisible && (
                        <Text fontSize="sm" lineHeight="short" fontWeight="bold">
                            {`${aircraftReservations.reservationType} - ${aircraftReservations.alternativeIdentifier}`}
                        </Text>
                    )}
                    {isSubtitleVisible && (
                        <Stack>
                            <Text size="sm">
                                {aircraftData.registration
                                    ? `${aircraftData.registration} - ${aircraftData.msn}`
                                    : aircraftData.msn}
                            </Text>
                        </Stack>
                    )}
                </Stack>
                <Spacer />
                {isStatusBoxVisible && (
                    <Box alignItems="self-end" pr={5}>
                        <Tag
                            colorScheme={
                                aircraftData.technicalStatus === TechnicalStatus.SERVICEABLE ? "blue" : "error-subtle"
                            }
                        >
                            <Tag.Label variant="light">{t(`${technicalStatus}`)}</Tag.Label>
                        </Tag>
                    </Box>
                )}
            </HStack>
        </Stack>
    );
};
