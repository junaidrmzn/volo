import { anyRevision } from "@voloiq/flight-test-definition-api/v1";
import { anyChangeLogV2, anyDefinition, anyDefinitionByGroup } from "@voloiq/flight-test-definition-api/v2";
import { AppWithoutProvider as App } from "../../src/App";
import { getAllAdditionalCommentsInterceptor } from "../interceptors/additionalCommentsInterceptors";
import { getAllApplicableRequirementsInterceptor } from "../interceptors/applicableRequirementsInterceptors";
import { getAllAttachedFilesInterceptor } from "../interceptors/attachedFilesInterceptors";
import { bulkEditRevisionsInterceptor } from "../interceptors/bulkEditRevisionsInterceptor";
import { getAllChangelogsInterceptor } from "../interceptors/changeLogsInterceptors";
import { getAllDefinitionsByAtaInterceptor } from "../interceptors/definitionsInterceptors";
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
    getDefinitionRevisionInterceptorV2,
} from "../interceptors/v2/definitionsInterceptors";
import { getAssignedWindchillRequirementsInterceptor } from "../interceptors/windchillAssociatedRequirementsInterceptors";
import { DefinitionDetailsPage } from "../pages/definition-details/definitionDetailsPageObject";
import { DefinitionCardPageFragment } from "../pages/definition-overview/page-fragments/definitionCardPageFragment";

describe("DefinitionChangeHistory", () => {
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
    });

    it("User can see a definition with multiple changelog releases", () => {
        const definitionList = [
            {
                title: "FCS Commission flight Integration off",
                ftdId: "FTD-V21-27-041-A11",
            },
        ].map((definition) => anyDefinitionByGroup({ value: [definition] }));
        getAllDefinitionsByAtaInterceptor(definitionList);
        const definition = definitionList.shift()?.value.shift();

        const changeLogV2 = [
            {
                revision: "A00",
            },
            {
                revision: "A01",
            },
        ].map((changeLog) => anyChangeLogV2(changeLog));

        getDefinitionInterceptorV2({ ...definition, isReadyForRevision: true });
        getAllChangelogsInterceptor(changeLogV2);

        cy.mount(<App />);

        getAllDefinitionsByAtaInterceptor(definitionList.slice(0, 1));
        releaseRevisionInterceptor();
        DefinitionCardPageFragment.accordionButton().click();
        DefinitionCardPageFragment.detailsButton().click();
        DefinitionDetailsPage.approvalAndVersionsTab().click();

        cy.findByText("Revision A00 (Unreleased)").should("be.visible");
        cy.findByRole("button", { name: "Release as new revision" }).should("be.visible");
        cy.findByText("Revision A01").should("be.visible");
        cy.findByRole("button", { name: "See document in this revision" }).should("be.visible");
    });

    it("User can release a new revision if it is ready for Revision", () => {
        const definitionList = [
            {
                title: "FCS Commission flight Integration off",
                ftdId: "FTD-V21-27-041-A11",
            },
        ].map((definition) => anyDefinitionByGroup({ value: [definition] }));
        getAllDefinitionsByAtaInterceptor(definitionList);
        const definition = definitionList.shift()?.value.shift();

        getDefinitionInterceptorV2({ ...definition, isReadyForRevision: true });

        cy.mount(<App />);

        getAllDefinitionsByAtaInterceptor(definitionList.slice(0, 1));
        releaseRevisionInterceptor();
        DefinitionCardPageFragment.accordionButton().click();
        DefinitionCardPageFragment.detailsButton().click();
        DefinitionDetailsPage.approvalAndVersionsTab().click();
        getDefinitionInterceptorV2({ ...definition, isReadyForRevision: false });
        DefinitionDetailsPage.releaseAsANewRevisionButton().click();

        cy.contains("label", "Revision Description:*")
            .parent()
            .parent()
            .find(".ProseMirror")
            .type("This is Revision A00");
        cy.findByRole("button", { name: "Confirm" }).click({ force: true });

        cy.wait("@getDefinitionV2");
        DefinitionDetailsPage.releaseAsANewRevisionButton().should("be.disabled");
    });

    it("User can edit revisions which are already released", () => {
        const definitionList = [
            {
                title: "FCS Commission flight Integration off",
                ftdId: "FTD-V21-27-041-A11",
            },
        ].map((definition) => anyDefinitionByGroup({ value: [definition] }));
        const revisionList = anyRevision();
        getAllDefinitionsByAtaInterceptor(definitionList);
        const definition = definitionList.shift()?.value.shift();

        getDefinitionInterceptorV2({ ...definition, isReadyForRevision: true });

        cy.mount(<App />);

        getAllDefinitionsByAtaInterceptor(definitionList.slice(0, 1));
        getAllRevisionsInterceptor([revisionList, { ...revisionList, released: true }]);
        bulkEditRevisionsInterceptor();
        DefinitionCardPageFragment.accordionButton().click();
        DefinitionCardPageFragment.detailsButton().click();
        DefinitionDetailsPage.approvalAndVersionsTab().click();
        getDefinitionInterceptorV2({ ...definition, isReadyForRevision: false });
        DefinitionDetailsPage.editRevisionInfoButton().click();

        cy.contains("label", "Revision Description:*")
            .parent()
            .parent()
            .find(".ProseMirror")
            .type("This is Revision A00");
        cy.findByRole("button", { name: "Done" }).click({ force: true });

        DefinitionDetailsPage.editRevisionInfoButton().should("be.visible");
    });

    it("User can not release a new revision if it is not ready for Revision", () => {
        const definitionList = [
            {
                title: "FCS Commission flight Integration off",
                ftdId: "FTD-V21-27-041-A11",
                isReadyForRevision: false,
            },
        ].map((definition) => anyDefinitionByGroup({ value: [definition] }));
        getAllDefinitionsByAtaInterceptor(definitionList);
        const definition = definitionList.shift()?.value.shift();
        getDefinitionInterceptorV2(definition);
        cy.mount(<App />);
        getAllDefinitionsByAtaInterceptor(definitionList.slice(0, 1));
        releaseRevisionInterceptor();
        DefinitionCardPageFragment.accordionButton().click();
        DefinitionCardPageFragment.detailsButton().click();
        DefinitionDetailsPage.approvalAndVersionsTab().click();
        DefinitionDetailsPage.releaseAsANewRevisionButton().should("be.disabled");
    });

    it("User can choose between draft and released revisions from the dropdown", () => {
        const draftRevision = "A02";
        const latestReleasedRevision = "A01";
        const firstReleasedRevision = "A00";
        // eslint-disable-next-line unicorn/consistent-function-scoping
        const definitionId = (revision: string) => `FTD-V21-27-041-${revision}`;
        const definition = anyDefinition({
            title: "FCS Commission flight Integration off",
            ftdId: definitionId(draftRevision),
            isReadyForRevision: false,
            revision: draftRevision,
            releasedRevisions: [latestReleasedRevision, firstReleasedRevision],
        });
        const ataDefinitionGroup = [
            anyDefinitionByGroup({
                value: [definition],
            }),
        ];
        const revisions = [
            { ftdId: definitionId(draftRevision), released: false, revision: draftRevision },
            { ftdId: definitionId(latestReleasedRevision), released: true, revision: latestReleasedRevision },
            { ftdId: definitionId(firstReleasedRevision), released: true, revision: firstReleasedRevision },
        ].map((revision) => anyRevision(revision));

        getAllDefinitionsByAtaInterceptor(ataDefinitionGroup);

        getAllRevisionsInterceptor(revisions);
        getDefinitionRevisionInterceptorV2({ revision: latestReleasedRevision }, latestReleasedRevision);

        cy.mount(<App />);
        DefinitionCardPageFragment.accordionButton().click();
        DefinitionCardPageFragment.detailsButton().click();

        DefinitionDetailsPage.selectedFtdRevision(definitionId(latestReleasedRevision)).should("be.visible");
        cy.findByText(latestReleasedRevision);

        DefinitionDetailsPage.isReadOnly();

        getDefinitionRevisionInterceptorV2({ revision: firstReleasedRevision }, firstReleasedRevision);
        DefinitionDetailsPage.selectRevisionFromDropdown(definitionId(firstReleasedRevision));

        DefinitionDetailsPage.selectedFtdRevision(definitionId(firstReleasedRevision)).should("be.visible");
        cy.findByText(firstReleasedRevision);

        DefinitionDetailsPage.isReadOnly();

        getDefinitionInterceptorV2(definition);
        DefinitionDetailsPage.selectRevisionFromDropdown(definitionId(draftRevision));

        DefinitionDetailsPage.selectedFtdRevision(definitionId(draftRevision)).should("be.visible");
        cy.findByText(draftRevision);

        DefinitionDetailsPage.isEditable();
    });
});
