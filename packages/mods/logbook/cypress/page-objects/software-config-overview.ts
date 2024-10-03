export const SoftwareConfigOverviewPage = {
    addButton: () => cy.findByRole("button", { name: "Add" }),
    sortButton: () => cy.findByRole("button", { name: "Sort" }),

    overviewList: () =>
        cy.findByRole("list", {
            name: "Software Config entries",
        }),
    overviewListItems: () => SoftwareConfigOverviewPage.overviewList().findAllByRole("listitem"),
    openFirstLog: () => SoftwareConfigOverviewPage.overviewListItems().first().click(),
};
