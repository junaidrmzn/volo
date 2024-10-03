export const FlightTestOrderOverviewPage = {
    addButton: () => cy.findByRole("button", { name: "Create New Order" }),
    flightTestOrderCard: (ftoId: string) => cy.findByRole("button", { name: `FTO ${ftoId}` }),
    flightTestOrderCardDetailButton: (ftoId: string) =>
        cy
            .findByRole("button", { name: `FTO ${ftoId}` })
            .siblings()
            .findByLabelText("Details"),
};
