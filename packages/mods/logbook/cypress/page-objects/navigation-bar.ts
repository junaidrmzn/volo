export const NavigationBar = {
    logbookButton: () => cy.findByRole("button", { name: "Logbook" }),
    overviewButton: () => cy.findByRole("menuitem", { name: "Overview" }),
    softwareConfigurationButton: () => cy.findByRole("menuitem", { name: "SW Configs" }),
};
