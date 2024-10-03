export const routeOptionMetaInfo = {
    selectAircraftType: (option: string) =>
        cy.findByRole("combobox").click({ force: true }).type(option).type("{enter}"),
};
