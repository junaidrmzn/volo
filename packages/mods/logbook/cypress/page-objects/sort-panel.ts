export const SortPanel = {
    applyButton: () => cy.findByRole("button", { name: "Apply" }),
    cancelButton: () => cy.findByRole("button", { name: "Cancel" }),

    selectDateSorting: () => cy.findByLabelText("Date").click({ force: true }),

    selectAscendingSorting: () => cy.findByLabelText("Ascending").click({ force: true }),
    ascendingRadioButton: () => cy.findByLabelText("Ascending"),

    selectDescendingSorting: () => cy.findByLabelText("Descending").click({ force: true }),
    descendingRadioButton: () => cy.findByLabelText("Descending"),
};
