export const CrewMemberPreviewPageFragment = {
    editButton: () => cy.findByRole("button", { name: "Edit" }),
    detailsButton: () => cy.findByRole("button", { name: "Details" }),
    deleteButton: () => cy.findByRole("button", { name: "Delete" }),
};
