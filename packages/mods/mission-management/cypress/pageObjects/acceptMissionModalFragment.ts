export const acceptMission = {
    closeButton: () => cy.findByRole("button", { name: "Close" }),
    confirmButton: () => cy.findByRole("button", { name: "Confirm" }),
};
