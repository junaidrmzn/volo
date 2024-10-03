export const DefinitionOverviewPage = {
    addButton: () => cy.findByRole("button", { name: "Add" }),
    definitionCard: (definitionName: string) => cy.findByRole("button", { name: definitionName }),
    noEntriesFoundHeading: () => cy.findByRole("heading", { name: "No entries found" }),
};
