export const promotionPage = {
    findTabs: () => cy.findByRole("tablist"),
    findTabItem: (tabName: string) => promotionPage.findTabs().findByRole("tab", { name: tabName }),
};

export const promotionItemPage = {
    findHeading: () => cy.findByText("Codes"),
    findTable: () => cy.findByRole("table", { name: /codes/i }),
    findTableRow: (name: string) => promotionItemPage.findTable().findByRole("row", { name }),
    findAction: (name: string) => promotionItemPage.findTableRow(name).findByRole("button", { name: /item/i }),
    findModal: () => cy.findByText(/you are about to invalidate this code/i),
    findPublishButton: () => cy.findByRole("button", { name: "Publish" }),
};
