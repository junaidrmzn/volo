import { Divider, HStack, Text, VStack } from "@volocopter/design-library-react";
import { Booking } from "@voloiq/booking-management-api/v1";
import {
    BookingCard,
    DateTimeDisplayWithLabel,
    ItemsWithDivision,
    TextWithLabel,
} from "@voloiq/booking-management-components";
import { BookingActions } from "../actions/BookingActions";
import { useBookingTranslation } from "../translations/useBookingTranslation";
import { BookingRefundPolicy } from "./BookingRefundPolicy";

type BookingDetailProps = {
    booking: Booking;
    reloadList: () => void;
};

export const BookingDetail = (props: BookingDetailProps) => {
    const { booking } = props;
    const {
        bookingDateTime,
        bookingClass,
        departureVertiportCode,
        arrivalVertiportCode,
        bookingCode,
        passengerFirstName,
        passengerLastName,
        passengerEmail,
        price,
        currency,
    } = booking;
    const { t } = useBookingTranslation();

    return (
        <VStack width="100%" height="100%" align="flex-start">
            <HStack width="100%" justify="space-between">
                <ItemsWithDivision>
                    <Text fontWeight="bold">{bookingCode}</Text>
                    <Text>{`${passengerFirstName} ${passengerLastName}`}</Text>
                </ItemsWithDivision>
                <BookingActions {...props} />
            </HStack>
            <Divider />
            <BookingCard title={t("overview.detail.bookingInformation.title")}>
                <HStack spacing={6}>
                    <TextWithLabel label={t("overview.detail.bookingInformation.code")}>{bookingClass}</TextWithLabel>
                    <TextWithLabel label={t("overview.detail.bookingInformation.codeNumber")}>
                        {bookingCode}
                    </TextWithLabel>
                    <TextWithLabel
                        label={t("overview.detail.bookingInformation.ticketPrice")}
                    >{`${price} ${currency}`}</TextWithLabel>
                    <TextWithLabel label={t("overview.detail.bookingInformation.paymentMethod")}>-</TextWithLabel>
                    <TextWithLabel label={t("overview.detail.bookingInformation.dateOfBooking")}>
                        <DateTimeDisplayWithLabel value={bookingDateTime} />
                    </TextWithLabel>
                </HStack>
                <HStack spacing={6}>
                    <TextWithLabel label={t("overview.detail.bookingInformation.cancelledBy")}>-</TextWithLabel>
                    <TextWithLabel label={t("overview.detail.bookingInformation.dateOfCancellation")}>- </TextWithLabel>
                    <TextWithLabel label={t("overview.detail.bookingInformation.refundAmount")}>-</TextWithLabel>
                    <TextWithLabel label={t("overview.detail.bookingInformation.refundInPercentage")}>-</TextWithLabel>
                    <TextWithLabel label={t("overview.detail.bookingInformation.dateOfRefund")}>-</TextWithLabel>
                </HStack>
                <BookingRefundPolicy />
            </BookingCard>
            <BookingCard title={t("overview.detail.customerInformation.title")}>
                <HStack spacing={6}>
                    <TextWithLabel label={t("overview.detail.customerInformation.firstName")}>
                        {passengerFirstName}
                    </TextWithLabel>
                    <TextWithLabel label={t("overview.detail.customerInformation.lastName")}>
                        {passengerLastName}
                    </TextWithLabel>
                    <TextWithLabel label={t("overview.detail.customerInformation.email")}>
                        {passengerEmail}
                    </TextWithLabel>
                    <TextWithLabel label={t("overview.detail.customerInformation.dateOfBirth")}>-</TextWithLabel>
                    <TextWithLabel label={t("overview.detail.customerInformation.reason")}>-</TextWithLabel>
                    <TextWithLabel label={t("overview.detail.customerInformation.invoiceAddress")}>-</TextWithLabel>
                </HStack>
                <HStack spacing={6}>
                    <TextWithLabel
                        label={t("overview.detail.customerInformation.BookedFor")}
                    >{`${passengerFirstName} ${passengerLastName}`}</TextWithLabel>
                </HStack>
            </BookingCard>
            <BookingCard title={t("overview.detail.flightInformation.title")}>
                <HStack spacing={6}>
                    <TextWithLabel label={t("overview.detail.flightInformation.msn")}>-</TextWithLabel>
                    <TextWithLabel label={t("overview.detail.flightInformation.aircraftType")}>-</TextWithLabel>
                    <TextWithLabel label={t("overview.detail.flightInformation.acRegistration")}>-</TextWithLabel>
                    <TextWithLabel label={t("overview.detail.flightInformation.passengerSeats")}>-</TextWithLabel>
                    <TextWithLabel label={t("overview.detail.flightInformation.configurations")}>-</TextWithLabel>
                    <TextWithLabel label={t("overview.detail.flightInformation.homebase")}>-</TextWithLabel>
                </HStack>
                <HStack spacing={6}>
                    <TextWithLabel label={t("overview.detail.flightInformation.departureVertiport")}>
                        {departureVertiportCode}
                    </TextWithLabel>
                    <TextWithLabel label={t("overview.detail.flightInformation.arrivalVertiport")}>
                        {arrivalVertiportCode}
                    </TextWithLabel>
                </HStack>
            </BookingCard>
        </VStack>
    );
};
