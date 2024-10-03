export const groundOpsTab = {
    generalActionButton: () => cy.findAllByRole("button", { name: "Ground OPs Popover" }),
    assignArrivalFatoButton: () => cy.findByRole("button", { name: "Assign Arrival FATO" }),
    assignArrivalStandButton: () => cy.findByRole("button", { name: "Assign Arrival Stand" }),
    assignDepartureFatoButton: () => cy.findByRole("button", { name: "Assign Departure FATO" }),
    assignDepartureStandButton: () => cy.findByRole("button", { name: "Assign Departure Stand" }),
};
