export const SoftwareConfigurationCreationPage = {
    typeSelect: () => cy.findByLabelText("Type:*"),
    gitHashInput: () => cy.findByLabelText("Git Hash:*"),
    attachmentInput: () => cy.get<HTMLInputElement>(`input[type="file"]`),
    createButton: () => cy.findByRole("button", { name: "Create" }),
};

export const SoftwareConfigurationCreationFinishPage = {
    backToOverviewButton: () => cy.findByRole("button", { name: "Back to software configurations", timeout: 60_000 }),
};
