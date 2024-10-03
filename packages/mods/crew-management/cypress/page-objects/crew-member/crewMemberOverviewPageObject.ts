export const CrewMemberOverviewPage = {
    crewMemberCard: (crewMemberId: string) => cy.findByRole("button", { name: crewMemberId }),
    addButton: () => cy.findByRole("button", { name: "Add" }),
    sortButton: () => cy.findByRole("button", { name: "Sort" }),
    noEntriesFoundHeading: () => cy.findByRole("heading", { name: "No entries found" }),
};
