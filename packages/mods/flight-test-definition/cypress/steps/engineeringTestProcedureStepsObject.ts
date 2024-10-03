import { EngineeringTestProcedureInsert } from "@voloiq/flight-test-definition-api/v1";
import { DefinitionDetailsPage } from "../pages/definition-details/definitionDetailsPageObject";
import { EngineeringTestProcedureModal } from "../pages/definition-details/engineering-test-procedure/engineernigTestProcedureModalPageFragments";

export const EngineeringTestProcedureSteps = {
    addEngineeringTestProcedure: (engineeringTestProcedureData: EngineeringTestProcedureInsert) => {
        const { title, details } = engineeringTestProcedureData;
        EngineeringTestProcedureModal.titleFormInput().type(title);
        EngineeringTestProcedureModal.detailsFormInput().type(details);
        EngineeringTestProcedureModal.doneButton().click();
    },
    editEngineeringTestProcedure: (engineeringTestProcedureData: Partial<EngineeringTestProcedureInsert>) => {
        const { title, details } = engineeringTestProcedureData;
        if (title) {
            EngineeringTestProcedureModal.titleFormInput().clear().type(title);
        }
        if (details) {
            EngineeringTestProcedureModal.detailsFormInput().clear().type(details);
        }

        EngineeringTestProcedureModal.doneButton().click();
    },

    deleteEngineeringTestProcedure: () => {
        DefinitionDetailsPage.deleteEngineeringTestProcedureButton().click();
        EngineeringTestProcedureModal.doneButton().click();
    },
};
