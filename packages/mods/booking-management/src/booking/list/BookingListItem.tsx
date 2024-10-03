import {
    Card,
    CardListItemProps,
    Divider,
    HStack,
    Icon,
    IconButton,
    Text,
    VStack,
} from "@volocopter/design-library-react";
import { Booking } from "@voloiq/booking-management-api/v1";
import { BookingStatusTag, DateTimeDisplayWithLabel, ItemsWithDivision } from "@voloiq/booking-management-components";
import { useBookingTranslation } from "../translations/useBookingTranslation";

export type BookingListItemProps = {
    booking: Booking;
} & CardListItemProps;

export const BookingListItem = (props: BookingListItemProps) => {
    const { booking, onClick, isSelected } = props;
    const {
        bookingCode,
        bookingStatus,
        flightNumber,
        customerId,
        departureVertiportCode,
        arrivalVertiportCode,
        departureDateTime,
        arrivalDateTime,
        bookingDateTime,
    } = booking;
    const { t } = useBookingTranslation();

    return (
        <Card ariaLabel={bookingCode} status="base" isSelected={isSelected} onClick={() => {}}>
            <VStack alignItems="flex-start" boxSize="full" width="100%" spacing={1}>
                <HStack>
                    <Text fontWeight="bold">{bookingCode}</Text>
                    <BookingStatusTag status={bookingStatus} />
                </HStack>
                <HStack>
                    <Text>{flightNumber}</Text>
                    <Text fontWeight="light">{customerId}</Text>
                </HStack>
                <Divider />
                <ItemsWithDivision>
                    <Text>{departureVertiportCode}</Text>
                    <Text>{arrivalVertiportCode}</Text>
                </ItemsWithDivision>
                <ItemsWithDivision>
                    <DateTimeDisplayWithLabel value={departureDateTime} />
                    <DateTimeDisplayWithLabel value={arrivalDateTime} />
                </ItemsWithDivision>
                <HStack alignItems="flex-start" boxSize="full" justify="space-between" width="100%">
                    <DateTimeDisplayWithLabel label={t("overview.list.bookedOn")} value={bookingDateTime} />
                    <IconButton aria-label="bookingDetailButton" variant="ghost" size="md" onClick={onClick}>
                        <Icon icon="chevronRight" />
                    </IconButton>
                </HStack>
            </VStack>
        </Card>
    );
};
