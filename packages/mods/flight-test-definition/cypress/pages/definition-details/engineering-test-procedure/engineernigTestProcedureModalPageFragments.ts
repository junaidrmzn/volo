export const EngineeringTestProcedureModal = {
    titleFormInput: () => cy.findByRole("textbox", { name: "Engineering Test Procedure Title:*" }),
    detailsFormInput: () =>
        cy.contains("label", "Engineering Test Procedure Details:*").parent().parent().find(".ProseMirror"),
    doneButton: () => cy.findByRole("button", { name: /done/i }),
    backButton: () => cy.findByRole("button", { name: "Back to overview" }),
};
