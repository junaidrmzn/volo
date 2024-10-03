export const LogCreationSelectProductLinePage = {
    voloregionButton: () => cy.findByRole("button", { name: /voloregion/i }),
    volodroneButton: () => cy.findByRole("button", { name: /volodrone/i }),
    backButton: () => cy.findByRole("button", { name: "Back" }),
    nextButton: () => cy.findByRole("button", { name: "Next" }),
};

export const LogCreationFileSelectPage = {
    backButton: () => cy.findByRole("button", { name: "Back" }),
    nextButton: () => cy.findByRole("button", { name: "Next" }),
};

export const LogCreationMetadataPage = {
    timeOfFlightDatePicker: () => cy.findByLabelText("Time of flight:*"),
    aircraftSelect: () => cy.findByLabelText("Aircraft:*"),
    locationSelect: () => cy.findByLabelText("Location:*"),
    crewPilotMultiSelect: () => cy.findByRole("combobox", { name: "Pilots:" }),
    crewSupervisorMultiSelect: () => cy.findByRole("combobox", { name: "Supervisors:" }),
    remarksInput: () => cy.findByLabelText("Remarks:"),
    backButton: () => cy.findByRole("button", { name: "Back" }),
    nextButton: () => cy.findByRole("button", { name: /next/i }),
};

export const LogCreationReminderModal = {
    headline: () => cy.findByText("Default time of flight detected"),
    confirmButton: () => cy.findByRole("button", { name: "Continue" }),
};

export const LogCreationFinishStepPage = {
    backToOverviewButton: () => cy.findByRole("button", { name: "Back to overview", timeout: 60_000 }),
    viewCreatedLogButton: () => cy.findByRole("button", { name: /view created log/i, timeout: 60_000 }),
};
