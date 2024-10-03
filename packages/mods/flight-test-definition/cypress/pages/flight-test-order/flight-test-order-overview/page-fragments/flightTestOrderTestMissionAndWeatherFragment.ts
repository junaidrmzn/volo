export const FlightTestOrderTestMissionAndWeatherFragment = {
    maxTestAltitudeTextBox: () => cy.findByRole("textbox", { name: "Max Test Alt.:" }),
    flightRuleTextBox: () => cy.findByRole("textbox", { name: "Flight Rule:" }),
    departureDateInput: () => cy.findByLabelText("Departure:"),
    arrivalDateInput: () => cy.findByLabelText("Arrival:"),
    frequencyOperationsTextBox: () => cy.findByRole("textbox", { name: "Frequency OPS:" }),
    frequencyTowerTextBox: () => cy.findByRole("textbox", { name: "Frequency TWR:" }),
    optionalFrequencyTextBox: () => cy.findByRole("textbox", { name: "Optional Frequency:" }),
    airspaceRequestedTextBox: () => cy.findByRole("textbox", { name: "Airspace Requested:" }),
    flightConditionsWeatherLimitsTextEditor: () =>
        cy.contains("label", "Flight Conditions Weather Limits:").parent().parent().find(".ProseMirror"),
    weatherObservedTextEditor: () => cy.contains("label", "Weather Observed:").parent().parent().find(".ProseMirror"),
    doneButton: () => cy.findByRole("button", { name: "Done" }),
};
