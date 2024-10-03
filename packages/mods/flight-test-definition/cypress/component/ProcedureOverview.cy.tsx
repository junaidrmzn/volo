import { anyChangeLogV2 } from "@voloiq/flight-test-definition-api/v2";
import { AppWithoutProvider as App } from "../../src/App";
import { getAllAdditionalCommentsInterceptor } from "../interceptors/additionalCommentsInterceptors";
import { getAllApplicableRequirementsInterceptor } from "../interceptors/applicableRequirementsInterceptors";
import { getAllAttachedFilesInterceptor } from "../interceptors/attachedFilesInterceptors";
import { getAllChangelogsInterceptor } from "../interceptors/changeLogsInterceptors";
import { getAllDefinitionsByAtaInterceptor, getDefinitionInterceptor } from "../interceptors/definitionsInterceptors";
import {
    getAllInstrumentationParametersInterceptor,
    getAllLinkedFtiParametersInterceptor,
} from "../interceptors/ftiParameterInterceptors";
import { getAllRevisionsInterceptor } from "../interceptors/getAllRevisionsInterceptor";
import { getAllImportantNotesInterceptor } from "../interceptors/importantNotesInterceptors";
import { getAllParametersInterceptor } from "../interceptors/parametersInterceptors";
import {
    getAllProcedureRevisionsInterceptor,
    getAllProceduresInterceptor,
    getProcedureInterceptor,
    getReleasedProcedureInterceptor,
} from "../interceptors/proceduresInterceptors";
import { getAllRequirementsInterceptor } from "../interceptors/requirementsInterceptors";
import { getAllSpecialCommentsInterceptor } from "../interceptors/specialCommentsInterceptors";
import { getAllTestPointsOfProcedureInterceptor } from "../interceptors/testPointInterceptors";
import { getAllTabCountersInterceptor, getDefinitionInterceptorV2 } from "../interceptors/v2/definitionsInterceptors";
import { getAssignedWindchillRequirementsInterceptor } from "../interceptors/windchillAssociatedRequirementsInterceptors";
import { DefinitionDetailsPage } from "../pages/definition-details/definitionDetailsPageObject";
import { ProcedureDetailsPage } from "../pages/definition-details/procedure/procedureDetailsPageObject";
import { ProcedureOverviewPage } from "../pages/definition-details/procedure/procedureOverviewPageObject";
import { DefinitionCardPageFragment } from "../pages/definition-overview/page-fragments/definitionCardPageFragment";

describe("ProcedureOverview", () => {
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
        getAllRevisionsInterceptor([
            { ftdId: "FTD-V21-05-236-A00", released: true, revision: "A00" },
            { ftdId: "FTD-V21-05-236-A01", released: false, revision: "A01" },
        ]);
    });

    it("User can select different revisions in the procedure details", () => {
        getAllDefinitionsByAtaInterceptor();
        getDefinitionInterceptor();
        getDefinitionInterceptorV2({ revision: "A01" });
        getAllTabCountersInterceptor();
        getAllParametersInterceptor();
        getAllProceduresInterceptor();
        getProcedureInterceptor();

        getAllProcedureRevisionsInterceptor([
            { ftdId: "FTD-V21-05-236-A00", released: true, revision: "A00", available: false },
            { ftdId: "FTD-V21-05-236-A01", released: false, revision: "A01", available: true },
        ]);

        cy.mount(<App />);
        DefinitionCardPageFragment.accordionButton().click();

        DefinitionCardPageFragment.detailsButton().click();
        ProcedureDetailsPage.revisionsDropdown("revision-dropdown").click();
        ProcedureDetailsPage.selectOption("FTD-V21-05-236-A01").click();

        getReleasedProcedureInterceptor("A01");
        DefinitionDetailsPage.flightGroundTestPlanTab().click();
        DefinitionDetailsPage.proceduresTab().click();
        ProcedureOverviewPage.detailsButton().click();

        ProcedureDetailsPage.revisionsDropdown("revision-dropdown").click();
        ProcedureDetailsPage.selectOption("FTD-V21-05-236-A00").click();
        cy.get("button").contains("Edit General").should("not.exist");
        cy.get("button").contains("Edit Steps").should("not.exist");
        ProcedureDetailsPage.revisionsDropdown("revision-dropdown").click();
        ProcedureDetailsPage.selectOption("FTD-V21-05-236-A01").click();
        ProcedureDetailsPage.editGeneralButton().should("be.visible");
        ProcedureDetailsPage.editStepsButton().should("be.visible");
    });

    it("User can not select an unselectable revision from the dropdown", () => {
        getAllDefinitionsByAtaInterceptor();
        getDefinitionInterceptor({ revision: "A02" });
        getDefinitionInterceptorV2();
        getAllTabCountersInterceptor();
        getAllParametersInterceptor();
        getAllProceduresInterceptor();
        getProcedureInterceptor();

        getAllProcedureRevisionsInterceptor([
            { ftdId: "FTD-V21-05-236-A02", released: false, revision: "A02", available: true },
            { ftdId: "FTD-V21-05-236-A01", released: true, revision: "A01", available: true },
            { ftdId: "FTD-V21-05-236-A00", released: true, revision: "A00", available: false },
        ]);

        cy.mount(<App />);
        DefinitionCardPageFragment.accordionButton().click();

        DefinitionCardPageFragment.detailsButton().click();
        ProcedureDetailsPage.revisionsDropdown("revision-dropdown").click();
        ProcedureDetailsPage.selectOption("FTD-V21-05-236-A01").click();

        getDefinitionInterceptorV2({ revision: "A02" });

        getReleasedProcedureInterceptor("A01");
        DefinitionDetailsPage.flightGroundTestPlanTab().click();
        DefinitionDetailsPage.proceduresTab().click();
        ProcedureOverviewPage.detailsButton().click();

        ProcedureDetailsPage.revisionsDropdown("revision-dropdown").click();
        ProcedureDetailsPage.revisionsDropdownOption("revision-option-A00").should(
            "have.attr",
            "data-disabled",
            "true"
        );
    });
});
