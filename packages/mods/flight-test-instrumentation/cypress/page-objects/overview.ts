export const OverviewPage = {
    addButton: () => cy.findByRole("button", { name: "Add" }),
    sortButton: () => cy.findByRole("button", { name: "Sort" }),
    filterButton: () => cy.findByRole("button", { name: "Filter" }),
    updateStatusButton: () => cy.findByRole("button", { name: /update status/i }),
    importButton: () => cy.findByRole("button", { name: /import/i }),
    deleteFilterButton: () =>
        cy
            .findAllByRole("toolbar")
            .click()
            .findByRole("button", { name: /delete/i })
            .click(),

    filterTagList: () => cy.findByRole("list", { name: /filter tags/i }),
    filterTagListItems: () =>
        cy.findAllByRole("toolbar").within(() => {
            return cy.get("ul").should("have.length", 1);
        }),
    openFirstEntry: () =>
        cy
            .findByRole("list", {
                name: "Parameters",
            })
            .within(() => cy.findAllByRole("listitem").first().click()),
    overviewList: () =>
        cy.findByRole("list", {
            name: "Parameters",
        }),
    overviewListItems: (id: string) =>
        cy.findByRole("button", {
            name: `Parameter - ${id}`,
        }),
};
