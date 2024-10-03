export const TestPointAttemptModalPage = {
    ftoInput: () => cy.findByLabelText("FTO"),
    dateInput: () => cy.findByLabelText("Date"),
    planningStatusSelect: () => cy.findByLabelText("Planning Status"),
    flightStatusSelect: () => cy.findByLabelText("Flight Status"),
    flightTestFlightTestStatusSelect: () => cy.findByLabelText("Flight Test Evaluation Status"),
    engineeringStatusSelect: () => cy.findByLabelText("Engineering Status"),
    engineeringActionSelect: () => cy.findByLabelText("Engineering Action"),
    submitButton: () => cy.findByRole("button", { name: "Submit edit" }),
    cancelButton: () => cy.findByRole("button", { name: "Cancel edit" }),
};

export const TestPointAttemptModalV2Page = {
    ftoInput: () => cy.findByLabelText("FTO"),
    dateInput: () => cy.findByLabelText("Date"),
    planningStatusSelect: () => cy.findByLabelText("Planning Status"),
    flightStatusSelect: () => cy.findByLabelText("Flight Status"),
    flightTestFlightTestStatusSelect: () => cy.findByLabelText("Flight Test Status"),
    engineeringStatusSelect: () => cy.findByLabelText("Test Point Engineering Status"),
    engineeringActionSelect: () => cy.findByLabelText("Test Point Engineering Action"),
    submitButton: () => cy.findByRole("button", { name: "Submit edit" }),
    cancelButton: () => cy.findByRole("button", { name: "Cancel edit" }),
};
