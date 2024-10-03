export const ProcedureOverviewPage = {
    addProceduresButton: () => cy.findAllByRole("button", { name: "Add Procedures" }).first(),
    editProceduresButton: () => cy.findByRole("button", { name: "Edit Procedures" }),
    detailsButton: () => cy.findByRole("button", { name: "Details" }),
    procedureCard: (procedureTitle: string) => cy.findByRole("button", { name: `Procedure ${procedureTitle}` }),
};
