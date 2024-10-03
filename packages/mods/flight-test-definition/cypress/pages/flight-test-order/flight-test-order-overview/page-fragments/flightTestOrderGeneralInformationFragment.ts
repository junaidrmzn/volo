export const FlightTestOrderGeneralInformationFragment = {
    missionTitleTextBox: () => cy.findByRole("textbox", { name: "Mission Title:" }),
    flightNumberTextBox: () => cy.findByRole("textbox", { name: "Flt#:" }),
    missionObjectiveTextEditor: () => cy.contains("label", "Mission Objective:").parent().parent().find(".ProseMirror"),
    doneButton: () => cy.findByRole("button", { name: "Done" }),
};
