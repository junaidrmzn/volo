export const ExportModalOld = {
    startDateDatePicker: () => cy.findByLabelText("Start date:*"),
    endDateDatePicker: () => cy.findByLabelText("End date:*"),
    sampleRateNumberInput: () => cy.findByLabelText("Sample rate (Hz):*"),
    descriptionInput: () => cy.findByLabelText("Description:"),
    ftiParameterInput: () => cy.findByLabelText("FTI Parameters:*"),
    cancelButton: () => cy.findByRole("button", { name: /cancel/i }),
    confirmButton: () => cy.findByRole("button", { name: /confirm/i }),
    header: () => cy.findByRole("banner"),
};
