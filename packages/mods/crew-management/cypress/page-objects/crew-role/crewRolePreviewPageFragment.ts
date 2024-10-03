export const CrewRolePreviewPageFragment = {
    editButton: () => cy.findByRole("button", { name: "Edit" }),
    deleteButton: () => cy.findByRole("button", { name: "Delete" }),
};
