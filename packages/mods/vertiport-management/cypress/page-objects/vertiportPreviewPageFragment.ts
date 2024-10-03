export const VertiportPreviewPageFragment = {
    detailsButton: () => cy.findByRole("button", { name: "Details" }),
    editButton: () => cy.findByRole("button", { name: "Edit" }),
    deleteButton: () => cy.findByRole("button", { name: "Delete" }),
};
