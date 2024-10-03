import { Box, HStack, Spacer, Stack, Tag, Text } from "@volocopter/design-library-react";
import { Reservation, ReservationBlockerType } from "@voloiq-typescript-api/aircraft-management-types";
import { match } from "ts-pattern";
import { useAircraftTranslation } from "../translations/useAircraftTranslation";

type AircraftCardProps = {
    event: Reservation;
};

export const AircraftEventCard = (props: AircraftCardProps) => {
    const { event } = props;
    const { alternativeIdentifier, reservationType } = event;
    const { t } = useAircraftTranslation();

    const getStatusTranslationKey = (message: ReservationBlockerType) => {
        return match(message)
            .with(ReservationBlockerType.EVENT, () => t("reservationType.event"))
            .with(ReservationBlockerType.MISSION, () => t("reservationType.mission"))
            .with(ReservationBlockerType.VERTIPORT, () => t("reservationType.vertiport"))
            .with(ReservationBlockerType.UNKNOWN, () => t("reservationType.unknown"))
            .exhaustive();
    };

    const reservationDisplayType = getStatusTranslationKey(reservationType || ReservationBlockerType.UNKNOWN);

    return (
        <Stack>
            <HStack width="100%" height="100%" bg="gray.100" borderRadius="sm">
                <Box bg="darkBlue.300" width="5px" borderLeftRadius="sm" height="100%" />
                <Stack pl={5}>
                    <Text fontSize="sm" lineHeight="short" fontWeight="bold">
                        {alternativeIdentifier || "-"}
                    </Text>
                </Stack>
                <Spacer />
                <Box alignItems="self-end" pr={5}>
                    <Tag colorScheme="blue">
                        <Tag.Label variant="light">{reservationDisplayType}</Tag.Label>
                    </Tag>
                </Box>
            </HStack>
        </Stack>
    );
};
