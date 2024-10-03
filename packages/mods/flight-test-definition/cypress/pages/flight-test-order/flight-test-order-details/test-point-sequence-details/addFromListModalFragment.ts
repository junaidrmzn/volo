export const AddFromListModalFragment = {
    searchInput: () => cy.findByRole("textbox", { name: "Search" }),
    detailsButton: () => cy.findByRole("button", { name: "Details" }).first(),
    selectedTab: (selectedCount: number) => cy.findByRole("tab", { name: `Selected (${selectedCount})` }),
    procedureListItemExpandButton: (procedureTitle: string) => cy.findByRole("button", { name: procedureTitle }),
    testPointCheckbox: () => cy.findByRole("checkbox"),
    testPointCheckboxes: () => cy.findAllByRole("checkbox"),
    doneButton: () => cy.findByRole("button", { name: "Done" }),
};
