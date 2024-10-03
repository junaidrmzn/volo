export const Pagination = {
    paginationNavBar: () => cy.findByRole("navigation", { name: /pagination/i }),

    jumpToPage: (page: string) =>
        cy
            .findByRole("navigation", { name: /pagination/i })
            .within(() => cy.findByRole("button", { name: page }))
            .click(),

    jumpToNextPage: () => cy.findByRole("button", { name: /next page/i }).click(),

    jumpToPreviousPage: () => cy.findByRole("button", { name: /previous page/i }).click(),
};
