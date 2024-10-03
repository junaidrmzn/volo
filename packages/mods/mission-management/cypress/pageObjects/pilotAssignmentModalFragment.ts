export const pilotAssignment = {
    closeButton: () => cy.findByRole("button", { name: "Close" }),
    assignButton: () => cy.findByRole("button", { name: "Assign" }),
    pilotCard: (pilotId: string) => cy.findByLabelText(`pilot-${pilotId}`),
};
