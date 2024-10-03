export const aircraftAssignment = {
    closeButton: () => cy.findByRole("button", { name: "Close" }),
    assignButton: () => cy.findByRole("button", { name: "Assign" }),
    aircraftCard: (aircraftId: string) => cy.findByLabelText(`aircraft-${aircraftId}`),
};
