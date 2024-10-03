export const EditAircraftReleaseOtherInformationModalFragment = {
    temporaryLimitationsTextEditor: () =>
        cy
            .contains("label", "Temporary Limitations due to Aircraft Configuration:")
            .parent()
            .parent()
            .find(".ProseMirror"),
    referenceSubstantiationTextEditor: () =>
        cy.contains("label", "Reference / Substantiation:").parent().parent().find(".ProseMirror"),
    aircraftConfigurationStatus: () => cy.findByLabelText("Aircraft Configuration Status:"),
    date: () => cy.findByLabelText("Date:"),
    issuedApprovedlimitations: () => cy.findByLabelText("Issued approved Limitations:"),
    doneButton: () => cy.findByRole("button", { name: "Done" }),
};
