export const FlightTestOrderTestAircraftFragment = {
    missionTitleTextBox: () => cy.findByRole("textbox", { name: "Model:" }),
    msnTextBox: () => cy.findByRole("textbox", { name: "MSN:*" }),
    aircraftCallsignTextBox: () => cy.findByRole("textbox", { name: "Aircraft Callsign:" }),
    flightConditionsTextBox: () => cy.findByRole("textbox", { name: "Flight Conditions:" }),
    revisionTextBox: () => cy.findByRole("textbox", { name: "Rev.:" }),
    issueDateForFlightConditionsDateInput: () => cy.findByLabelText("Issue Date for Flight Conditions:"),
    permitToFlyTextBox: () => cy.findByRole("textbox", { name: "Permit to Fly:" }),
    issueDateForPermitToFlyDateInput: () => cy.findByLabelText("Issue Date for Permit to Fly:"),
    validUntilDateInput: () => cy.findByLabelText("Valid Until:"),
    doneButton: () => cy.findByRole("button", { name: "Done" }),
};
