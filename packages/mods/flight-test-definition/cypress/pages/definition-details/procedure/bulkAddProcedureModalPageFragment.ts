export const BulkAddProcedureModal = {
    titleTextbox: () => cy.findByRole("textbox", { name: "Title:*" }),
    nthTitleTextbox: (index: number) => cy.findAllByRole("textbox", { name: "Title:*" }).eq(index),
    deleteButton: () => cy.findByRole("button", { name: "Delete" }),
    doneButton: () => cy.findByRole("button", { name: "Done" }),
    addAnotherButton: () => cy.findByRole("button", { name: "Add Another Procedure" }),
};
