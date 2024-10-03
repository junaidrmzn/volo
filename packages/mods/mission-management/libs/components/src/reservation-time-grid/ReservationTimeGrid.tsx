import { Box } from "@volocopter/design-library-react";
import type { Reservation } from "@voloiq-typescript-api/network-scheduling-types";
import { differenceInMinutes } from "date-fns";

export type ReservationTimeGridProps = {
    startDate: Date;
    endDate: Date;
    reservedSlots?: Reservation[];
    reservationSlotStartDate: string;
    reservationSlotEndDate: string;
};

export const ReservationTimeGrid = (props: ReservationTimeGridProps) => {
    const { startDate, endDate, reservedSlots, reservationSlotStartDate, reservationSlotEndDate } = props;
    const duration = differenceInMinutes(endDate, startDate);
    const calculateSlotWidth = (startDate: Date, endDate: Date) => {
        const reservedSlotDuration = differenceInMinutes(endDate, startDate);
        return (reservedSlotDuration / duration) * 100;
    };
    const formattedReservationSlotStartDate = new Date(reservationSlotStartDate);
    const formattedReservationSlotEndDate = new Date(reservationSlotEndDate);
    let isDateOverlapping = false;

    return (
        <Box position="relative" width="100%">
            <Box position="absolute" width="100%" height={4} backgroundColor="gray.200" borderRadius="sm" />
            {reservedSlots &&
                reservedSlots.map((reservedSlot) => {
                    const formattedStartDateTime = new Date(reservedSlot.startDateTime);
                    const formattedEndDateTime = new Date(reservedSlot.endDateTime);
                    if (
                        formattedReservationSlotStartDate < formattedEndDateTime &&
                        formattedReservationSlotEndDate > formattedStartDateTime
                    ) {
                        isDateOverlapping = true;
                    }
                    return (
                        <Box
                            key={reservedSlot.id}
                            position="absolute"
                            left={`${
                                (differenceInMinutes(
                                    formattedStartDateTime < startDate ? startDate : formattedStartDateTime,
                                    startDate
                                ) /
                                    duration) *
                                100
                            }%`}
                            width={`${calculateSlotWidth(
                                formattedStartDateTime < startDate ? startDate : formattedStartDateTime,
                                formattedEndDateTime > endDate ? endDate : formattedEndDateTime
                            )}%`}
                            height={4}
                            backgroundColor="darkBlue.200"
                            borderRadius="sm"
                            textAlign="center"
                            fontSize="xxs"
                            overflow="hidden"
                            whiteSpace="nowrap"
                            textOverflow="ellipsis"
                            fontWeight="bold"
                            lineHeight={4}
                        >
                            {reservedSlot.alternativeIdentifier}
                        </Box>
                    );
                })}
            <Box
                position="absolute"
                left={`${(differenceInMinutes(formattedReservationSlotStartDate, startDate) / duration) * 100}%`}
                width={`${calculateSlotWidth(formattedReservationSlotStartDate, formattedReservationSlotEndDate)}%`}
                height={4}
                backgroundColor="tranparent"
                borderRadius="sm"
                border={1.5}
                borderColor={isDateOverlapping ? "red.500" : "darkBlue.800"}
                borderStyle="dashed"
            />
        </Box>
    );
};
