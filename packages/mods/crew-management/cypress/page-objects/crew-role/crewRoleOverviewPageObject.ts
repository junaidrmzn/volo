export const CrewRoleOverviewPage = {
    crewRoleCard: (roleKey: string) => cy.findByRole("button", { name: roleKey }),
    addButton: () => cy.findByRole("button", { name: "Add" }),
    sortButton: () => cy.findByRole("button", { name: "Sort" }),
    noEntriesFoundHeading: () => cy.findByRole("heading", { name: "No entries found" }),
};
