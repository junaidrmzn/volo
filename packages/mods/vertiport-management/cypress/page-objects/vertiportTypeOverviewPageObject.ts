export const vertiportTypeOverview = {
    addButton: () => cy.findByRole("button", { name: "Add" }),
    editButton: () => cy.findAllByRole("button", { name: "Edit" }).first(),
    vertiportType: () => cy.findByTitle("Vertiport type"),
    vertiportTypeCard: (vertiportType: string) => cy.findByRole("button", { name: vertiportType }),
};
