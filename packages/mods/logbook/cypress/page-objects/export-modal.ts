export const ExportModal = {
    startDateDatePicker: () => cy.findByLabelText("Start Date:*"),
    endDateDatePicker: () => cy.findByLabelText("End Date:*"),
    exportFileTypeRadioGroup: () => cy.findByRole("radiogroup"),
    sampleRateNumberInput: () => cy.findByLabelText("Sample Rate (Hz):"),
    descriptionInput: () => cy.findByLabelText("Description:"),
    ftiParameterInput: () => cy.findByRole("combobox"),
    cancelButton: () => cy.findByRole("button", { name: /cancel/i }),
    confirmButton: () => cy.findByRole("button", { name: /confirm/i }),
    header: () => cy.findByRole("banner"),
    tagSelectList: () => cy.findByRole("listbox"),
    tagSelectListItems: () => cy.findByRole("listbox").findAllByRole("option"),
};
