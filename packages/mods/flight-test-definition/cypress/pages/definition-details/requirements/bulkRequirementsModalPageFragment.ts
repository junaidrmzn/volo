export const BulkRequirementsModal = {
    titleTextboxes: () => cy.findAllByRole("textbox", { name: "Title:*" }),
    contentTextEditor: () => cy.contains("label", "Description:*").parent().parent().find(".ProseMirror"),
    passOrFailCriteriaTextEditor: () =>
        cy.contains("label", "Pass / Fail Criteria:").parent().parent().find(".ProseMirror"),
    deleteButtons: () => cy.findAllByLabelText("Delete"),
    doneButton: () => cy.findAllByRole("button", { name: "Done" }),
};
