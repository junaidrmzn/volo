export const ParameterPreviewPageFragment = {
    editButton: () => cy.findByRole("button", { name: "Edit" }),
    deleteButton: () => cy.findByRole("button", { name: "Delete" }),
    setActiveButton: () => cy.findByRole("button", { name: "Set Active" }),
    setInactiveButton: () => cy.findByRole("button", { name: "Set Inactive" }),
};
