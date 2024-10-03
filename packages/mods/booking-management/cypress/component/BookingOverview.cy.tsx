import { BookingStatus, anyBooking } from "@voloiq/booking-management-api/v1";
import { bookingDetail, bookingOverview, cancelBookingModal } from "../page-objects";
import { mountBookingOverview, setupBookingInterceptors } from "../resources/BookingCypressResources";

describe("BookingOverview", () => {
    const bookingCode = "BC1234";
    const flightNumber = "FN1234";
    const bookingStatus: BookingStatus = "VALID";
    const booking = anyBooking({ bookingCode, flightNumber, bookingStatus });
    it("render booking overview", () => {
        setupBookingInterceptors({ booking });

        mountBookingOverview();

        bookingOverview.findHeading().should("be.visible");
        bookingOverview.findList().should("be.visible");
        bookingOverview.findListItem(bookingCode);
    });

    it("render booking split preview", () => {
        setupBookingInterceptors({ booking });

        mountBookingOverview();

        bookingDetail.findNotSelectedBookingTitle().should("be.visible");
        bookingOverview.findDetailButton(bookingCode).click();
        cy.wait("@getBooking").its("response.statusCode").should("eq", 200);
        bookingDetail.findBookingInformation().should("be.visible");
        bookingDetail.findCustomerInformation().should("be.visible");
        bookingDetail.findFlightInformation().should("be.visible");
        bookingDetail.findCancelBookingButton().should("be.visible");
        bookingDetail.findRefundPolicy().should("be.visible");
    });

    it("cancel a booking", () => {
        setupBookingInterceptors({ booking });

        mountBookingOverview();

        bookingDetail.findNotSelectedBookingTitle().should("be.visible");
        bookingOverview.findDetailButton(bookingCode).click();
        bookingDetail.findCancelBookingButton().click();
        cancelBookingModal.findTitle().should("be.visible");
        cancelBookingModal.findSelectionMessage().should("be.visible");
        cancelBookingModal.findInformation().should("be.visible");
        cancelBookingModal.findSubInformation().should("be.visible");
        cancelBookingModal.findPassengerSelection().should("be.visible");
        cancelBookingModal.findConfirmationEmailMessage().should("be.visible");
        cancelBookingModal.findVolocopterSelection().should("be.visible").click();
        cancelBookingModal.findPassengerEmailMessage().should("be.visible");
        cancelBookingModal.findRefundTriggerMessage().should("be.visible");
        cancelBookingModal.findCancelBookingButton().click();
        cy.wait("@cancelBooking").its("response.statusCode").should("eq", 204);
    });
});
