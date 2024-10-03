export const notificationCard = {
    newIndication: () => cy.findByText(/new/i),
    openIndication: () => cy.findByText(/open/i),
    unmuteButton: () => cy.findByRole("button", { name: "Unmute" }),
    muteButton: () => cy.findByRole("button", { name: "Mute" }),
    deleteButton: () => cy.findByRole("button", { name: "Delete" }),
    navigateToEntityButton: (entityName: string) => cy.findByRole("button", { name: `Navigate to ${entityName}` }),
};
