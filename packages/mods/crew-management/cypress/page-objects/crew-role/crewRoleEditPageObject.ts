import type { CrewRole } from "@voloiq-typescript-api/crew-api-types";

export const CrewRoleEditPage = {
    roleKeyTextbox: () => cy.findByRole("textbox", { name: "Role Key:*" }),
    descriptionTextbox: () => cy.findByRole("textbox", { name: "Description:" }),
    saveButton: () => cy.findByRole("button", { name: "Save" }),
    returnToListButton: () => cy.findByRole("button", { name: "Return to list" }),
    edit: (crewRoleData: Partial<CrewRole>) => {
        const { description } = crewRoleData;
        if (description) {
            CrewRoleEditPage.descriptionTextbox().clear().type(description);
        }
        CrewRoleEditPage.saveButton().click();
    },
};
