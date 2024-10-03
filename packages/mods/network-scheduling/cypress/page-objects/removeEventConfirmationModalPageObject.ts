export const removeEventConfirmationModal = {
    modal: () => cy.findByRole("dialog"),
    deleteButton: () => cy.findByRole("button", { name: "Delete" }),
};
