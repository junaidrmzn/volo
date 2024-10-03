export const BulkAddImportantNotesModal = {
    titleTextbox: () => cy.findByRole("textbox", { name: "Title:*" }),
    descriptionTextEditor: () => cy.contains("label", "Description:*").parent().parent().find(".ProseMirror"),
    deleteButton: () => cy.findByRole("button", { name: "Delete" }),
    doneButton: () => cy.findByRole("button", { name: "Done" }),
};
