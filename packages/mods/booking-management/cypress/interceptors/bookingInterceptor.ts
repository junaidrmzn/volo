import { Booking, anyBooking } from "@voloiq/booking-management-api/v1";
import { bookingUrl } from "./endPoints";
import { paramsRegex } from "./regex";

export const getBookingsInterceptor = (overwrites?: Partial<Booking>) => {
    const url = new RegExp(`^${bookingUrl}/internal-booking-data${paramsRegex}$`);

    cy.intercept("GET", url, {
        statusCode: 200,
        body: {
            data: [anyBooking(overwrites)],
            error: null,
            meta: null,
            pagination: { page: 1, size: 1, totalPages: 1, totalElements: 1 },
        },
    }).as("getBookings");
};

export const getBookingInterceptor = (bookingId: string, overwrites?: Partial<Booking>) => {
    const url = new RegExp(`^${bookingUrl}/internal-booking-data/${bookingId}${paramsRegex}$`);

    cy.intercept("GET", url, {
        statusCode: 200,
        body: {
            data: anyBooking(overwrites),
            error: null,
            meta: null,
            pagination: null,
        },
    }).as("getBooking");
};

export const getCancelBookingInterceptor = (bookingId: string) => {
    const url = `${bookingUrl}/internal-bookings/${bookingId}`;

    cy.intercept("DELETE", url, {
        statusCode: 204,
    }).as("cancelBooking");
};
