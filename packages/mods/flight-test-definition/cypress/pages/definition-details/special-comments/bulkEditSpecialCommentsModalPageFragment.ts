export const BulkSpecialCommentsModal = {
    commentTextEditor: () => cy.contains("label", "Comment:*").parent().parent().find(".ProseMirror"),
    deleteButtons: () => cy.findAllByLabelText("Delete"),
    doneButton: () => cy.findAllByRole("button", { name: "Done" }),
};
