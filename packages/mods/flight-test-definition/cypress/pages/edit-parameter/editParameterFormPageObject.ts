export const EditParameterPage = {
    nameTextbox: () => cy.findByRole("textbox", { name: "Name:*" }),
    acronymTextbox: () => cy.findByRole("textbox", { name: "Acronym:*" }),
    unitTextbox: () => cy.findByRole("textbox", { name: "Unit:*" }),
    saveButton: () => cy.findByRole("button", { name: "Save" }),
    edit: (parameterData: Partial<{ name: string; acronym: string; unit: string }>) => {
        const { name, acronym, unit } = parameterData;

        if (name) {
            EditParameterPage.nameTextbox().clear().type(name);
        }
        if (acronym) {
            EditParameterPage.acronymTextbox().clear().type(acronym);
        }
        if (unit) {
            EditParameterPage.unitTextbox().clear().type(unit);
        }

        EditParameterPage.saveButton().click();
    },
};
