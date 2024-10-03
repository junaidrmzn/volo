export const ChangeHistoryPage = {
    changesAfterRevisionList: () => cy.findByRole("list", { name: "Change list after current revision" }),
    changesAfterRevisionListItems: () => ChangeHistoryPage.changesAfterRevisionList().findAllByRole("listitem"),
};
