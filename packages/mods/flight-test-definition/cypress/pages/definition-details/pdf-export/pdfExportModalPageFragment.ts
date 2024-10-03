export const PdfExportModal = {
    procedureCheckbox: (procedureId: string) => cy.findByRole("checkbox", { name: `Select Procedure ${procedureId}` }),
    exportButton: () => cy.findByRole("button", { name: "Export" }),
};
