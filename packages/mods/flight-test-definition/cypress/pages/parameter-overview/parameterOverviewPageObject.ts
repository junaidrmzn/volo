export const ParameterOverviewPage = {
    addButton: () => cy.findByRole("button", { name: "Add" }),
    parameterCard: (parameterName: string) => cy.findByRole("button", { name: parameterName }),
    noEntriesFoundHeading: () => cy.findByRole("heading", { name: "No entries found" }),
    inactiveBadge: () => cy.findByText("Inactive"),
};
