import { anyEngineeringTestProcedure } from "@voloiq/flight-test-definition-api/v1";
import { anyChangeLogV2, anyDefinitionByGroup } from "@voloiq/flight-test-definition-api/v2";
import { AppWithoutProvider as App } from "../../src/App";
import { getAllAdditionalCommentsInterceptor } from "../interceptors/additionalCommentsInterceptors";
import { getAllApplicableRequirementsInterceptor } from "../interceptors/applicableRequirementsInterceptors";
import { getAllAttachedFilesInterceptor } from "../interceptors/attachedFilesInterceptors";
import { getAllChangelogsInterceptor } from "../interceptors/changeLogsInterceptors";
import { getAllDefinitionsByAtaInterceptor } from "../interceptors/definitionsInterceptors";
import {
    addEngineeringTestProcedureInterceptor,
    deleteEngineeringTestProcedureInterceptor,
    editEngineeringTestProcedureInterceptor,
    getAllEngineeringTestProceduresInterceptor,
} from "../interceptors/engineeringTestProcedureInterceptors";
import {
    getAllInstrumentationParametersInterceptor,
    getAllLinkedFtiParametersInterceptor,
} from "../interceptors/ftiParameterInterceptors";
import { getAllRevisionsInterceptor } from "../interceptors/getAllRevisionsInterceptor";
import { getAllImportantNotesInterceptor } from "../interceptors/importantNotesInterceptors";
import { getAllParametersInterceptor } from "../interceptors/parametersInterceptors";
import { getAllProceduresInterceptor } from "../interceptors/proceduresInterceptors";
import { releaseRevisionInterceptor } from "../interceptors/releaseRevisionInterceptor";
import { getAllRequirementsInterceptor } from "../interceptors/requirementsInterceptors";
import { getAllSpecialCommentsInterceptor } from "../interceptors/specialCommentsInterceptors";
import { getAllTestPointsOfProcedureInterceptor } from "../interceptors/testPointInterceptors";
import {
    getAllTabCountersInterceptor,
    getDefinitionInterceptorV2,
    updateDefinitionInterceptorV2,
} from "../interceptors/v2/definitionsInterceptors";
import { getAssignedWindchillRequirementsInterceptor } from "../interceptors/windchillAssociatedRequirementsInterceptors";
import { DefinitionDetailsPage } from "../pages/definition-details/definitionDetailsPageObject";
import { DefinitionCardPageFragment } from "../pages/definition-overview/page-fragments/definitionCardPageFragment";
import { AdditionalInformationSteps } from "../steps/additionalInformationStepsObject";
import { EngineeringTestProcedureSteps } from "../steps/engineeringTestProcedureStepsObject";

const engineeringTestProcedure = anyEngineeringTestProcedure();

describe("DefinitionDetails", () => {
    beforeEach(() => {
        getAllProceduresInterceptor([]);
        getAllRequirementsInterceptor([]);
        getAllSpecialCommentsInterceptor([]);
        getAllLinkedFtiParametersInterceptor([]);
        getAllAttachedFilesInterceptor([]);
        getAllInstrumentationParametersInterceptor([]);
        getAllParametersInterceptor([]);
        getAssignedWindchillRequirementsInterceptor([]);
        getAllChangelogsInterceptor([anyChangeLogV2()]);
        getAllAdditionalCommentsInterceptor([]);
        getAllImportantNotesInterceptor([]);
        getAllTestPointsOfProcedureInterceptor([]);
        getAllApplicableRequirementsInterceptor([]);
        getAllRevisionsInterceptor();
        getAllTabCountersInterceptor();
        getAllEngineeringTestProceduresInterceptor([engineeringTestProcedure]);
    });

    it("User can create new additional information", () => {
        const definitionList = [
            {
                title: "FCS Commission flight Integration off",
                ftdId: "FTD-V21-27-041-A11",
            },
        ].map((definition) => anyDefinitionByGroup({ value: [definition] }));

        getAllDefinitionsByAtaInterceptor(definitionList);

        const definition = definitionList.shift()?.value.shift();

        cy.mount(<App />);

        getDefinitionInterceptorV2({
            ...definition,
            isReadyForRevision: true,
            safetyRecommendations: "",
            dataAnalysisPlan: "",
            specialEquipment: "",
        });
        releaseRevisionInterceptor();
        DefinitionCardPageFragment.accordionButton().click();
        DefinitionCardPageFragment.detailsButton().click();
        DefinitionDetailsPage.AdditionalInformationTab().click();
        DefinitionDetailsPage.editAdditionalInformation().click();

        updateDefinitionInterceptorV2();
        getDefinitionInterceptorV2({
            ...definition,
            isReadyForRevision: true,
            dataAnalysisPlan: "This is Standard Data Analysis Plan",
            safetyRecommendations: "This is Standard Safety Recommendations",
            specialEquipment: "This is Standard Special Equipment",
        });
        AdditionalInformationSteps.addOrEditEnfgineeringtestProcedure({
            dataAnalysisPlan: "This is Standard Data Analysis Plan",
            safetyRecommendations: "This is Standard Safety Recommendations",
            specialEquipment: "This is Standard Special Equipment",
        });
        cy.wait("@patchDefinitionV2");

        cy.findByText("This is Standard Data Analysis Plan").should("be.visible");
    });

    it("User can create an engineering test procedure", () => {
        const definitionList = [
            {
                title: "FCS Commission flight Integration off",
                ftdId: "FTD-V21-27-041-A11",
            },
        ].map((definition) => anyDefinitionByGroup({ value: [definition] }));

        const engineeringTestProcedure = anyEngineeringTestProcedure();

        getAllDefinitionsByAtaInterceptor(definitionList);

        const definition = definitionList.shift()?.value.shift();

        cy.mount(<App />);

        getAllEngineeringTestProceduresInterceptor([]);
        getDefinitionInterceptorV2(definition);
        releaseRevisionInterceptor();
        DefinitionCardPageFragment.accordionButton().click();
        DefinitionCardPageFragment.detailsButton().click();
        DefinitionDetailsPage.EngineeringTestProceduresTab().click();
        DefinitionDetailsPage.addEngineeringTestProcedures().click();

        getAllEngineeringTestProceduresInterceptor([engineeringTestProcedure]);

        addEngineeringTestProcedureInterceptor({
            title: engineeringTestProcedure.title,
            details: engineeringTestProcedure.details,
        });

        EngineeringTestProcedureSteps.addEngineeringTestProcedure({
            title: engineeringTestProcedure.title,
            details: engineeringTestProcedure.details,
        });

        cy.findByText(engineeringTestProcedure.title).should("be.visible");
    });

    it("User can edit an existing engineering test procedure", () => {
        const definitionList = [
            {
                title: "FCS Commission flight Integration off",
                ftdId: "FTD-V21-27-041-A11",
            },
        ].map((definition) => anyDefinitionByGroup({ value: [definition] }));

        const engineeringTestProcedure = anyEngineeringTestProcedure();

        getAllDefinitionsByAtaInterceptor(definitionList);

        const definition = definitionList.shift()?.value.shift();

        cy.mount(<App />);

        getDefinitionInterceptorV2(definition);
        releaseRevisionInterceptor();
        DefinitionCardPageFragment.accordionButton().click();
        DefinitionCardPageFragment.detailsButton().click();
        DefinitionDetailsPage.EngineeringTestProceduresTab().click();
        DefinitionDetailsPage.editEngineeringTestProcedures().click();

        getAllEngineeringTestProceduresInterceptor([
            {
                ...engineeringTestProcedure,
                title: "This is new Edited Title",
            },
        ]);
        editEngineeringTestProcedureInterceptor({
            title: "This is new Edited Title",
        });

        EngineeringTestProcedureSteps.editEngineeringTestProcedure({
            title: "This is new Edited Title",
        });

        cy.findByText("This is new Edited Title").should("be.visible");
    });

    it("User can delete an existing engineering test procedure", () => {
        const definitionList = [
            {
                title: "FCS Commission flight Integration off",
                ftdId: "FTD-V21-27-041-A11",
            },
        ].map((definition) => anyDefinitionByGroup({ value: [definition] }));

        const engineeringTestProcedure = anyEngineeringTestProcedure();

        getAllDefinitionsByAtaInterceptor(definitionList);

        const definition = definitionList.shift()?.value.shift();

        cy.mount(<App />);

        getDefinitionInterceptorV2(definition);
        releaseRevisionInterceptor();
        DefinitionCardPageFragment.accordionButton().click();
        DefinitionCardPageFragment.detailsButton().click();
        DefinitionDetailsPage.EngineeringTestProceduresTab().click();
        DefinitionDetailsPage.editEngineeringTestProcedures().click();
        deleteEngineeringTestProcedureInterceptor();
        getAllEngineeringTestProceduresInterceptor([]);
        EngineeringTestProcedureSteps.deleteEngineeringTestProcedure();
        cy.findByText(engineeringTestProcedure.title).should("not.exist");
    });
});
