export const aircraftOverview = {
    addButton: () => cy.findByRole("button", { name: "Add" }),
    editButton: () => cy.findAllByRole("button", { name: "Edit" }).first(),
    aircraftCard: (aircraftMsn: string) => cy.findByRole("button", { name: aircraftMsn }),
    noEntriesFoundHeading: () => cy.findByRole("heading", { name: "No entries found" }),
};
