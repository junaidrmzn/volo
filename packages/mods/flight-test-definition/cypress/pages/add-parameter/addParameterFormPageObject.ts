export const AddParameterPage = {
    nameTextbox: () => cy.findByRole("textbox", { name: "Name:*" }),
    acronymTextbox: () => cy.findByRole("textbox", { name: "Acronym:*" }),
    unitTextbox: () => cy.findByRole("textbox", { name: "Unit:*" }),
    saveButton: () => cy.findByRole("button", { name: "Save" }),
    add: (parameterData: { name: string; acronym: string; unit: string }) => {
        const { name, acronym, unit } = parameterData;

        AddParameterPage.nameTextbox().clear().type(name);
        AddParameterPage.acronymTextbox().clear().type(acronym);
        AddParameterPage.unitTextbox().clear().type(unit);

        AddParameterPage.saveButton().click();
    },
};
