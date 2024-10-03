export const AddFlightTestOrderPage = {
    missionTitleTextBox: () => cy.findByRole("textbox", { name: "Mission Title:*" }),
    aircraftMsnTextBox: () => cy.findByRole("textbox", { name: "Aircraft MSN:*" }),
    saveButton: () => cy.findByRole("button", { name: "Save" }),
};
