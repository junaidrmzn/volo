export const aircraftDetails = {
    detailsButton: () => cy.findByRole("button", { name: "Details" }),
    editButton: () => cy.findByRole("button", { name: "Edit" }),
};
