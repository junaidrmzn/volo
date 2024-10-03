export const vertiportBulkEdit = {
    selectAllText: (text: string) => cy.findAllByText(text),
    selectLabelText: (text: string) => cy.findByLabelText(text),
    selectText: (text: string) => cy.findByText(text),
    bulkEditButton: () => cy.findByRole("button", { name: "Bulk Edit" }),
    doneButton: () => cy.findByRole("button", { name: "Done" }),
    confirmButton: () => cy.findByRole("button", { name: "Confirm" }),
};
