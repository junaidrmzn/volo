export const connectionOverview = {
    findHeading: () => cy.findByRole("heading", { name: "Connections" }),
    findAddButton: () => cy.findByRole("button", { name: "Add" }),
    findList: () => cy.findByLabelText("Connections"),
    findListItem: (name: string) => connectionOverview.findList().findByLabelText(name),
};
