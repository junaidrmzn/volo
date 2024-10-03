export const aircraftTypePreviewPageFragment = {
    detailsButton: () => cy.findByRole("button", { name: "Details" }),
    editButton: () => cy.findByRole("button", { name: "Edit" }),
    deleteButton: () => cy.findByRole("button", { name: "Delete" }),
};
