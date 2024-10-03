import { Card, Flex, HStack, Radio, Text, VStack } from "@volocopter/design-library-react";
import { Pad } from "@voloiq-typescript-api/vertiport-management-types";
import { ReservationTimeGrid } from "@voloiq/network-scheduling-components";

export type PadCardProps = {
    pad: Pad;
    startDate: Date;
    endDate: Date;
    reservationSlotStartDate: string;
    reservationSlotEndDate: string;
};

export const PadCard = (props: PadCardProps) => {
    const { pad, startDate, endDate, reservationSlotEndDate, reservationSlotStartDate } = props;
    const { id: padId, padKey, events } = pad;

    const returnedEvents = events?.map((event) => ({
        ...event,
        reservationType: event.blockerType ?? "UNKNOWN",
        startDateTime: event.startTime,
        endDateTime: event.endTime,
        alternativeIdentifier: event.title,
    }));

    return (
        <Card px={2} py={2} my={3}>
            <Flex borderRadius="sm">
                <HStack width="50%" alignItems="flex-start">
                    <Radio value={padId} size="sm" aria-label={`pad-${padId}`} />
                    <VStack spacing={0} alignItems="flex-start">
                        <Text fontSize="sm" lineHeight={6}>
                            {padKey}
                        </Text>
                    </VStack>
                </HStack>
            </Flex>
            <VStack py="4">
                <ReservationTimeGrid
                    startDate={startDate}
                    endDate={endDate}
                    reservedSlots={returnedEvents}
                    reservationSlotStartDate={reservationSlotStartDate}
                    reservationSlotEndDate={reservationSlotEndDate}
                />
            </VStack>
        </Card>
    );
};
