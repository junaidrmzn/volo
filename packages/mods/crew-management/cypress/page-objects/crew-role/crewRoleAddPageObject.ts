import type { CrewRole } from "@voloiq-typescript-api/crew-api-types";

export const CrewRoleAddPage = {
    roleKeyTextbox: () => cy.findByRole("textbox", { name: "Role Key:*" }),
    descriptionTextbox: () => cy.findByRole("textbox", { name: "Description:" }),
    requiresAircraftTypeCheckbox: () => cy.findByLabelText("Requires aircraft type"),
    canBecomePilotInChargeCheckbox: () => cy.findByLabelText("Can become pilot in charge"),
    requiresLicenseCheckbox: () => cy.findByLabelText("Requires license"),
    requiresWeightCheckbox: () => cy.findByLabelText("Requires weight"),
    saveButton: () => cy.findByRole("button", { name: "Save" }),
    returnToListButton: () => cy.findByRole("button", { name: "Return to list" }),
    add: (crewRoleData: CrewRole) => {
        const { roleKey, description, requiresWeight, requiresLicense, canBecomePilotInCharge, requiresAircraftType } =
            crewRoleData;

        CrewRoleAddPage.roleKeyTextbox().clear().type(roleKey);
        CrewRoleAddPage.descriptionTextbox().clear().type(description);
        if (requiresAircraftType) CrewRoleAddPage.requiresAircraftTypeCheckbox().click({ force: true });
        if (canBecomePilotInCharge) CrewRoleAddPage.canBecomePilotInChargeCheckbox().click({ force: true });
        if (requiresLicense) CrewRoleAddPage.requiresLicenseCheckbox().click({ force: true });
        if (requiresWeight) CrewRoleAddPage.requiresWeightCheckbox().click({ force: true });
        CrewRoleAddPage.saveButton().click();
    },
};
