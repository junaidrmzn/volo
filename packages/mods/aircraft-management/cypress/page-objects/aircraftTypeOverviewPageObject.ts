export const aircraftTypeOverview = {
    addButton: () => cy.findByRole("button", { name: "Add" }),
    editButton: () => cy.findAllByRole("button", { name: "Edit" }).first(),
    aircraftType: () => cy.findByTitle("Aircraft type"),
    aircraftTypeCard: (aircraftType: string) => cy.findByRole("button", { name: aircraftType }),
};
