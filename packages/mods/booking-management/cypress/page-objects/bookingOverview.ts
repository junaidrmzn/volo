export const bookingOverview = {
    findHeading: () => cy.findByRole("heading", { name: "Bookings" }),
    findList: () => cy.findByLabelText("Bookings"),
    findListItem: (name: string) => bookingOverview.findList().findByLabelText(name),
    findDetailButton: (name: string) =>
        bookingOverview.findListItem(name).findByRole("button", { name: "bookingDetailButton" }),
};

export const bookingDetail = {
    findNotSelectedBookingTitle: () => cy.findByText("Select a Booking to get started."),
    findBookingInformation: () => cy.findByText("Booking Information"),
    findCustomerInformation: () => cy.findByText("Customer Information"),
    findFlightInformation: () => cy.findByText("Flight Information"),
    findCancelBookingButton: () => cy.findByRole("button", { name: "Cancel Booking" }),
    findRefundPolicy: () => cy.findByText("Refund Policy"),
};

export const cancelBookingModal = {
    findTitle: () => cy.findByText("Confirm"),
    findSelectionMessage: () => cy.findByText("Please select for whom you are canceling:"),
    findInformation: () => cy.findByText("By confirming Cancel Booking the Booking will be irreversibly canceled."),
    findSubInformation: () => cy.findByText("This process cannot be reversed."),
    findVolocopterSelection: () => cy.findByText("Cancel for Volocopter"),
    findPassengerEmailMessage: () =>
        cy.findByText("The Passenger will get an email with the next steps about the refunding"),
    findRefundTriggerMessage: () => cy.findByText("The refund will be automatically triggered"),
    findPassengerSelection: () => cy.findByText("Cancel for Passenger"),
    findConfirmationEmailMessage: () => cy.findByText("The Passenger will get a confirmation email"),
    findCancelBookingButton: () => cy.findByRole("button", { name: "Cancel Booking" }),
};
