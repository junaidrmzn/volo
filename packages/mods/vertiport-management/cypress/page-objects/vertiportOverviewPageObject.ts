export const VertiportOverviewPage = {
    vertiportCard: (vertiportName: string) => cy.findByRole("button", { name: vertiportName }),
    addButton: () => cy.findByRole("button", { name: "Add" }),
    sortButton: () => cy.findByRole("button", { name: "Sort" }),
    noEntriesFoundHeading: () => cy.findByRole("heading", { name: "No entries found" }),
};
