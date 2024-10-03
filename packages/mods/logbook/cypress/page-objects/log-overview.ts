export const LogOverviewPage = {
    addButton: () => cy.findByRole("button", { name: "Add" }),
    sortButton: () => cy.findByRole("button", { name: "Sort" }),
    filterButton: () => cy.findByRole("button", { name: "Filter" }),
    deletePreviousFilters: () =>
        cy
            .findByRole("toolbar")
            .click()
            .get("ul li")
            .each(($li) => {
                return cy
                    .wrap($li)
                    .get('[aria-label="delete"]')
                    .each(($button) => {
                        return cy.wrap($button).click();
                    });
            }),
    openFirstLog: () =>
        cy
            .findByRole("list", {
                name: "Log",
            })
            .within(() => cy.findAllByRole("listitem").first().click()),
    overviewList: () =>
        cy.findByRole("list", {
            name: "Log",
        }),
    overviewListItems: () =>
        cy
            .findByRole("list", {
                name: "Log",
            })
            .findAllByRole("listitem"),
};
