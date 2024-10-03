import { FlightTestOrderDetailsPage } from "../pages/flight-test-order/flight-test-order-details/flightTestOrderDetailsPage";

type DeclineFlightTestOrderData = {
    descriptionText: string;
};

export const DeclineFlightTestOrderSteps = {
    declineFto: (declineData: DeclineFlightTestOrderData) => {
        const { descriptionText } = declineData;
        cy.findByRole("group").find("textarea").type(descriptionText);
        FlightTestOrderDetailsPage.declineRequestButton().click();
    },
};
