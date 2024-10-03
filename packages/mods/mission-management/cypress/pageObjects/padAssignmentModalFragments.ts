export const padAssignment = {
    closeButton: () => cy.findByRole("button", { name: "Close" }),
    assignButton: () => cy.findByRole("button", { name: "Assign" }),
    padCard: (padId: string) => cy.findByLabelText(`pad-${padId}`),
};
