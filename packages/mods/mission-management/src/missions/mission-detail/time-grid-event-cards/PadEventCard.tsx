import { Box, HStack, Spacer, Stack, Text } from "@volocopter/design-library-react";
import type { Pad, Reservation } from "@voloiq-typescript-api/network-scheduling-types";
import { useEventCardResize } from "@voloiq/time-scheduler";

export type PadEventProps = {
    padData: Pad;
    padReservations: Reservation;
};

export const PadEventCard = (props: PadEventProps) => {
    const { padData, padReservations } = props;
    const { isSubtitleVisible, outerStackRef, isTitleVisible } = useEventCardResize();

    return (
        <Stack ref={outerStackRef}>
            <HStack width="100%" height="100%" bg="gray.100" borderRadius="sm">
                <Box bg="darkBlue.300" width="5px" borderLeftRadius="sm" height="100%" />
                <Stack pl={5}>
                    {isTitleVisible && (
                        <Text fontSize="sm" lineHeight="short" fontWeight="bold">
                            {`${padReservations.reservationType} - ${padReservations.alternativeIdentifier}`}
                        </Text>
                    )}
                    {isSubtitleVisible && (
                        <Stack>
                            <Text size="sm">{`${padData.padKey}`}</Text>
                        </Stack>
                    )}
                </Stack>
                <Spacer />
            </HStack>
        </Stack>
    );
};
