export const EditStepsModal = {
    setupTextEditor: () => cy.contains("label", "Setup:").parent().parent().find(".ProseMirror"),
    procedureDetailTextEditor: () =>
        cy.contains("label", "Procedure Detail: Failure Injection:").parent().parent().find(".ProseMirror"),
    recoveryTextEditor: () => cy.contains("label", "Recovery:").parent().parent().find(".ProseMirror"),
    doneButton: () => cy.findByRole("button", { name: "Done" }),
};
