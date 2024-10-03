export const FlightTestOrderAircraftConfigurationFragment = {
    allUpMassTextBox: () => cy.findByRole("textbox", { name: "AUM:" }),
    centerOfGravityTextBox: () => cy.findByRole("textbox", { name: "CG:" }),
    massAndBalanceCategory: () => cy.findByRole("textbox", { name: "M&B Cat.:" }),
    ballatsTextBox: () => cy.findByRole("textbox", { name: "Ballasts:" }),
    chargingTextBox: () => cy.findByRole("textbox", { name: "Charging:" }),
    bingoTextBox: () => cy.findByRole("textbox", { name: "Bingo:" }),
    totalDurationTextBox: () => cy.findByRole("textbox", { name: "Total Duration:" }),
    setupSheetTextBox: () => cy.findByRole("textbox", { name: "Setup Sheet:" }),
    notesToAircraftTextEditor: () =>
        cy.contains("label", "Notes to Aircraft & Configuration:").parent().parent().find(".ProseMirror"),
    doneButton: () => cy.findByRole("button", { name: "Done" }),
};
