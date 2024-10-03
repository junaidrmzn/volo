export type Currency = "EUR" | "USD" | "YEN" | "GBP";

export type BookingStatus = "VALID" | "CANCELLED" | "RESERVED";

export type CancelBookingReason = "OPERATOR" | "CUSTOMER";

export type Booking = {
    id: string;
    flightNumber: string;
    bookingCode: string;
    bookingDateTime: string;
    bookingClass: string;
    departureVertiportCode: string;
    departureVertiportShortName: string;
    departureDateTime: string;
    departureTimeZone: string;
    arrivalVertiportCode: string;
    arrivalVertiportShortName: string;
    arrivalDateTime: string;
    arrivalTimeZone: string;
    customerId: string;
    isPaid: boolean;
    bookingStatus: BookingStatus;
    tripPurpose: string;
    passengerFirstName: string;
    passengerMiddleName?: string;
    passengerLastName: string;
    passengerEmail: string;
    regionId: string;
    connectionId: string;
    connectionTitle: string;
    connectionName: string;
    paymentDateTime: string;
    price: number;
    currency: Currency;
    isForeign: boolean;
    newDepartureDateTime?: string;
    newArrivalDateTime?: string;
};

export type CancelBookingPayload = {
    cancelledBy: CancelBookingReason;
};
