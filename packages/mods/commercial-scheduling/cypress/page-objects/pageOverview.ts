export const pageOverview = {
    findByText: (text: string | RegExp) => cy.findByText(text),
    findAllByText: (text: string | RegExp) => cy.findAllByText(text),
    findToastByText: (text: string) => cy.findAllByText(new RegExp(`^${text}$`, "i")),
    findTabs: () => cy.findByRole("tablist"),
    findTabItem: (tabName: string | RegExp) => pageOverview.findTabs().findByRole("tab", { name: tabName }),
};
