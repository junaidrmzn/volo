export const eventOverview = {
    addButton: () => cy.findByRole("button", { name: "Add" }),
    editButton: () => cy.findAllByRole("button", { name: "Edit" }).first(),
    deleteButton: () => cy.findAllByRole("button", { name: "Delete" }).first(),

    sortButton: () => cy.findByRole("button", { name: "Sort" }),

    selectAscendingSorting: () => cy.findByLabelText(/ascending/i).click({ force: true }),
    ascendingRadioButton: () => cy.findByLabelText(/ascending/i),

    selectDescendingSorting: () => cy.findByLabelText(/descending/i).click({ force: true }),
    descendingRadioButton: () => cy.findByLabelText(/descending/i),

    eventCard: (event: string) => cy.findByText(event),
    applyButton: () => cy.findByRole("button", { name: "Apply" }),
};
