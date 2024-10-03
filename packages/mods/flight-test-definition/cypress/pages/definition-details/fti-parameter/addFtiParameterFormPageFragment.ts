import type { DesirabilityEnum } from "@voloiq-typescript-api/ftd-types";
import { Select } from "../../utils/select";

export const AddFtiParameterPageFragment = {
    searchTextbox: () => cy.findByRole("textbox", { name: "FTI Parameter*" }),
    saveButton: () => cy.findByRole("button", { name: "Done" }),
    checkBox: () => cy.findByRole("checkbox", { name: "Select All" }),
    searchFtiParameter: (searchText: string) => {
        AddFtiParameterPageFragment.searchTextbox().clear({ force: true }).type(searchText, { force: true });
    },
    linkFtiParameter: (ftiParameterData: { desirability: DesirabilityEnum }) => {
        const { desirability } = ftiParameterData;
        cy.findByRole("dialog")
            .should("be.visible")
            .first()
            .within(() => Select.selectByOptionName("Desirability*", desirability));
        AddFtiParameterPageFragment.checkBox().click({ force: true });
        AddFtiParameterPageFragment.saveButton().click({ force: true });
    },
};
