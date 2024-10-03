export const RegionOverviewPage = {
    regionCard: (regionName: string) => cy.findByRole("button", { name: regionName }),
    addButton: () => cy.findByRole("button", { name: "Add" }),
    filterButton: () => cy.findByRole("button", { name: "Filter" }),
    sortButton: () => cy.findByRole("button", { name: "Sort" }),
    noEntriesFoundHeading: () => cy.findByRole("heading", { name: "No entries found" }),
    editButton: () => cy.findByRole("button", { name: "Edit" }),
};
