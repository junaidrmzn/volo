export const AdditionalCommentsModal = {
    additionalCommentsTextEditor: () =>
        cy.contains("label", "Additional Comments:").parent().parent().find(".ProseMirror"),
    doneButton: () => cy.findByRole("button", { name: "Done" }),
};
