export const BulkAddAdditionalCommentsModal = {
    commentTextEditor: () => cy.contains("label", "Comment:*").parent().parent().find(".ProseMirror"),
    deleteButton: () => cy.findByRole("button", { name: "Delete" }),
    doneButton: () => cy.findByRole("button", { name: "Done" }),
};
