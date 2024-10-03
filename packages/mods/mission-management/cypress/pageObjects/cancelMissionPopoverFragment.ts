export const cancelMission = {
    yesButton: () => cy.findByRole("button", { name: "Yes" }),
    noButton: () => cy.findByRole("button", { name: "No" }),
};
