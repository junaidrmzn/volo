export const ExportList = {
    exportList: () => cy.get("[data-testid='export-list']"),
    exportListItems: () => ExportList.exportList().findAllByRole("listitem"),
    exportButton: () => cy.findByRole("button", { name: /^export$/i }),
    exportFilterSelect: () => cy.findByRole("combobox"),
};
