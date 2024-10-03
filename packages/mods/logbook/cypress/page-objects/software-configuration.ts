export const SoftwareConfigurationPage = {
    addButton: () => cy.findByRole("button", { name: "Add" }),
    firstSoftwareConfiguration: () =>
        cy
            .findByRole("list", {
                name: "Software configuration entries",
            })
            .within(() => cy.findByRole("listitem")),
};
