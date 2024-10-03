export const CrewMemberDetailPage = {
    returnToListButton: () => cy.findByRole("button", { name: "Return to list" }),
    editButton: () => cy.findByRole("button", { name: "Edit" }),
    generalTab: () => cy.findByRole("tab", { name: "General" }),
    rolesTab: () => cy.findByRole("tab", { name: "Roles" }),
    otherTab: () => cy.findByRole("tab", { name: "Other" }),
};
