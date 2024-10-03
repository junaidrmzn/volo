import { Booking, anyBooking } from "@voloiq/booking-management-api/v1";
import { Route } from "@voloiq/routing";
import { BookingOverview } from "../../src/booking/BookingOverview";
import {
    getBookingInterceptor,
    getBookingsInterceptor,
    getCancelBookingInterceptor,
    getConnectionsInterceptor,
    getRegionsInterceptor,
} from "../interceptors";
import { CypressServiceProvider } from "./CypressResources";

type SetupBookingInterceptorsOptions = {
    booking?: Booking;
};

export const mountBookingOverview = () => {
    cy.mount(
        <CypressServiceProvider initialEntries={["/overview"]}>
            <Route path="overview/*" element={<BookingOverview />} />
        </CypressServiceProvider>
    );
};

export const setupBookingInterceptors = (options: SetupBookingInterceptorsOptions = {}) => {
    const { booking = anyBooking() } = options;

    getRegionsInterceptor();
    getConnectionsInterceptor();
    getBookingsInterceptor(booking);
    getBookingInterceptor(booking.id, booking);
    getCancelBookingInterceptor(booking.id);
};
