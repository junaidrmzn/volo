import {
    anyApplicableRequirement,
    anyAttachedFile,
    anyChangeLog,
    anyFtiLink,
    anyFtiParameter,
    anyImportantNote,
    anyProcedure,
    anyRequirement,
    anyRevision,
    anySpecialComment,
    anyTestPointParameter,
    anyWindchillRequirement,
} from "@voloiq/flight-test-definition-api/v1";
import { anyDefinition } from "@voloiq/flight-test-definition-api/v2";
import { AppWithoutProvider as App } from "../../src/App";
import {
    bulkCreateAdditionalCommentsInterceptor,
    bulkDeleteAdditionalCommentsInterceptor,
    bulkUpdateAdditionalCommentsInterceptor,
    getAllAdditionalCommentsInterceptor,
} from "../interceptors/additionalCommentsInterceptors";
import {
    bulkSetApplicableRequirementsInterceptor,
    getAllApplicableRequirementsInterceptor,
} from "../interceptors/applicableRequirementsInterceptors";
import {
    addAttachedFileInterceptor,
    deleteAttachedFileInterceptor,
    downloadAttachedFileInterceptor,
    getAllAttachedFilesInterceptor,
} from "../interceptors/attachedFilesInterceptors";
import { getAllChangelogsInterceptor } from "../interceptors/changeLogsInterceptors";
import { getAllDefinitionsByAtaInterceptor, getDefinitionInterceptor } from "../interceptors/definitionsInterceptors";
import { exportPdfFileInterceptor } from "../interceptors/exportPdfFileInterceptors";
import {
    bulkAddLinkedFtiParameterInterceptor,
    bulkDeleteLinkedFtiParameterInterceptor,
    bulkEditLinkedFtiParameterInterceptor,
    getAllAircraftZonesInterceptor,
    getAllInstrumentationParametersInterceptor,
    getAllLinkedFtiParametersInterceptor,
    getAllWorkgroupsInterceptor,
} from "../interceptors/ftiParameterInterceptors";
import { getAllRevisionsInterceptor } from "../interceptors/getAllRevisionsInterceptor";
import {
    bulkCreateImportantNotesInterceptor,
    bulkDeleteImportantNotesInterceptor,
    bulkUpdateImportantNotesInterceptor,
    getAllImportantNotesInterceptor,
} from "../interceptors/importantNotesInterceptors";
import { getAllParameterGroupsInterceptor } from "../interceptors/parameterGroupInterceptors";
import { getAllParametersInterceptor } from "../interceptors/parametersInterceptors";
import {
    bulkCreateProcedureInterceptor,
    bulkDeleteProcedureInterceptor,
    bulkUpdateProcedureInterceptor,
    getAllProcedureRevisionsInterceptor,
    getAllProceduresInterceptor,
    getAllProceduresV2Interceptor,
    getProcedureInterceptor,
    updateProcedureInterceptor,
} from "../interceptors/proceduresInterceptors";
import {
    bulkCreateRequirementsInterceptor,
    bulkDeleteRequirementsInterceptor,
    bulkUpdateRequirementsInterceptor,
    getAllRequirementsInterceptor,
} from "../interceptors/requirementsInterceptors";
import {
    createSpecialCommentsInterceptor,
    deleteSpecialCommentsInterceptor,
    getAllSpecialCommentsInterceptor,
    updateSpecialCommentsInterceptor,
} from "../interceptors/specialCommentsInterceptors";
import {
    bulkCreateTestPointInterceptor,
    getAllTestPointsOfProcedureInterceptor,
} from "../interceptors/testPointInterceptors";
import {
    getAllTabCountersInterceptor,
    getDefinitionInterceptorV2,
    updateDefinitionInterceptorV2,
} from "../interceptors/v2/definitionsInterceptors";
import { patchProcedureInterceptorV2 } from "../interceptors/v2/proceduresInterceptor";
import {
    assignWindchillRequirementsInterceptor,
    getAssignedWindchillRequirementsInterceptor,
    patchWindchillAssociatedRequirementsInterceptor,
    unassignWindchillRequirementsInterceptor,
} from "../interceptors/windchillAssociatedRequirementsInterceptors";
import {
    getAllWindchillRequirementsInterceptor,
    patchWindchillRequirementsInterceptor,
} from "../interceptors/windchillRequirementsInterceptors";
import { ChangeHistoryPage } from "../pages/definition-details/change-history/changeHistoryPage";
import { DefinitionDetailsPage } from "../pages/definition-details/definitionDetailsPageObject";
import { FilterBarFtiParameterPageFragment } from "../pages/definition-details/fti-parameter/FilterBarFtiParameterPageFragment";
import { FtiParametersOverviewPage } from "../pages/definition-details/fti-parameter/ftiParametersOverviewPageObject";
import { LinkFtiParametersModal } from "../pages/definition-details/fti-parameter/linkFtiParametersModalPageFragment";
import { PdfExportModal } from "../pages/definition-details/pdf-export/pdfExportModalPageFragment";
import { AddTestPointModal } from "../pages/definition-details/procedure/addTestPointModalPageFragment";
import { EditApplicableRequirementsModal } from "../pages/definition-details/procedure/editApplicableRequirementsModalPageFragment";
import { EditGeneralModal } from "../pages/definition-details/procedure/editGeneralModalPageFragment";
import { EditStepsModal } from "../pages/definition-details/procedure/editStepsModalPageFragment";
import { ProcedureDetailsPage } from "../pages/definition-details/procedure/procedureDetailsPageObject";
import { ProcedureOverviewPage } from "../pages/definition-details/procedure/procedureOverviewPageObject";
import { BulkRequirementsModal } from "../pages/definition-details/requirements/bulkRequirementsModalPageFragment";
import { DefinitionCardPageFragment } from "../pages/definition-overview/page-fragments/definitionCardPageFragment";
import { Select } from "../pages/utils/select";
import { AdditionalCommentsSteps } from "../steps/additionalCommentsStepObject";
import { DefinitionSteps } from "../steps/definitionStepObject";
import { ImportantNotesSteps } from "../steps/importantNotesStepObject";
import { ProcedureSteps } from "../steps/procedureStepObject";
import { RequirementSteps } from "../steps/requirementsStepsObject";
import { SpecialCommentsSteps } from "../steps/specialCommentsStepsObject";
import { WindchillRequirementsSteps } from "../steps/windchillRequirementsStepsObject";

describe("App", () => {
    beforeEach(() => {
        getAllProceduresInterceptor([]);
        getAllRequirementsInterceptor([]);
        getAllSpecialCommentsInterceptor([]);
        getAllLinkedFtiParametersInterceptor([]);
        getAllAttachedFilesInterceptor([]);
        getAllInstrumentationParametersInterceptor([]);
        getAllParametersInterceptor([]);
        getAssignedWindchillRequirementsInterceptor([]);
        getAllChangelogsInterceptor([anyChangeLog()]);
        getAllAdditionalCommentsInterceptor([]);
        getAllImportantNotesInterceptor([]);
        getAllTestPointsOfProcedureInterceptor([]);
        getAllApplicableRequirementsInterceptor([]);
        getAllRevisionsInterceptor();
        getAllProcedureRevisionsInterceptor();
        getAllTabCountersInterceptor();
        getAllProceduresInterceptor([]);
        getAllProceduresV2Interceptor();
        getAllParameterGroupsInterceptor([]);
        getAllAircraftZonesInterceptor([]);
        getAllWorkgroupsInterceptor([]);
    });

    it("User can attach, download, and delete a file to a definition", () => {
        const attachedFile = anyAttachedFile({ fileName: "file.pdf" });

        addAttachedFileInterceptor(attachedFile);
        getAllAttachedFilesInterceptor([attachedFile]);
        deleteAttachedFileInterceptor();
        getAllDefinitionsByAtaInterceptor();
        downloadAttachedFileInterceptor();
        getDefinitionInterceptor();
        getDefinitionInterceptorV2();

        cy.mount(<App />);

        DefinitionCardPageFragment.accordionButton().click();
        DefinitionCardPageFragment.detailsButton().click();
        DefinitionDetailsPage.AttachedFilesTab().click();

        DefinitionDetailsPage.uploadFile();
        cy.findByText("file.pdf").should("be.visible");
        DefinitionDetailsPage.actionsForFileButton("file.pdf").click();

        getAllAttachedFilesInterceptor([]);
        DefinitionDetailsPage.deleteFileButton().click({ force: true });
        cy.findByText("file.pdf").should("not.exist");

        getAllAttachedFilesInterceptor([attachedFile]);
        DefinitionDetailsPage.uploadFile();
        cy.findByText("file.pdf").should("be.visible");

        DefinitionDetailsPage.actionsForFileButton("file.pdf").click();
        DefinitionDetailsPage.downloadFileButton().click({ force: true });
        cy.wait("@getAttachedFile");
    });

    it("User can create pdf export of a definition", () => {
        getAllDefinitionsByAtaInterceptor();
        getAllProceduresInterceptor([{ procedureId: "Some Procedure Id" }]);
        getDefinitionInterceptor();
        getDefinitionInterceptorV2();
        exportPdfFileInterceptor();

        cy.mount(<App />);

        DefinitionCardPageFragment.accordionButton().click();
        DefinitionCardPageFragment.detailsButton().click();
        DefinitionDetailsPage.exportDefinitionButton().click();
        PdfExportModal.procedureCheckbox("Some Procedure Id").click({ force: true });
        PdfExportModal.exportButton().click();
        cy.wait("@exportPdfFile");

        const downloadsFolder = Cypress.config("downloadsFolder");
        cy.readFile([downloadsFolder, "FTD-V21-27-041-A00.FCS Commission flight Integration off.pdf"].join("/"))
            .should("exist")
            .should("eq", "Hi folks");
    });

    it("User can create, edit, and delete procedures", () => {
        const testPointParameter = anyTestPointParameter({ name: "Pressure" });
        const procedure = { title: "Hover Turn", testPointParameters: [testPointParameter.name] };

        getAllParametersInterceptor([testPointParameter]);
        getAllDefinitionsByAtaInterceptor();
        getDefinitionInterceptor();
        getDefinitionInterceptorV2();
        bulkCreateProcedureInterceptor();
        bulkUpdateProcedureInterceptor();
        bulkDeleteProcedureInterceptor();

        cy.mount(<App />);
        DefinitionCardPageFragment.accordionButton().click();
        DefinitionCardPageFragment.detailsButton().click();
        DefinitionDetailsPage.flightGroundTestPlanTab().click();
        DefinitionDetailsPage.proceduresTab().click();

        getAllProceduresInterceptor([anyProcedure({ ...procedure, testPointParameters: [testPointParameter] })]);
        ProcedureSteps.addProcedure(procedure);
        ProcedureOverviewPage.procedureCard("Hover Turn").should("be.visible");

        getAllProceduresInterceptor([anyProcedure({ title: "Looping", testPointParameters: [testPointParameter] })]);
        ProcedureSteps.editProcedure({ title: "Looping" });
        ProcedureOverviewPage.procedureCard("Looping").should("be.visible");

        getAllProceduresInterceptor([]);
        ProcedureSteps.deleteProcedures();
        ProcedureOverviewPage.procedureCard("Looping").should("not.exist");
    });

    it("User can create, edit, and delete manual requirements", () => {
        const createdRequirement = anyRequirement({ title: "Created Requirement" });
        const editedRequirement = anyRequirement({ title: "Edited Requirement" });

        getAllDefinitionsByAtaInterceptor();
        getDefinitionInterceptor();
        getDefinitionInterceptorV2();
        bulkCreateRequirementsInterceptor();
        bulkUpdateRequirementsInterceptor();
        bulkDeleteRequirementsInterceptor();
        getAllRequirementsInterceptor([]);
        getAllWindchillRequirementsInterceptor([]);
        getAllTabCountersInterceptor();

        cy.mount(<App />);
        DefinitionCardPageFragment.accordionButton().click();
        DefinitionCardPageFragment.detailsButton().click();
        DefinitionDetailsPage.RequirementsTab(0).click();

        DefinitionDetailsPage.addOrEditRequirementsButton("Add").click();
        getAllRequirementsInterceptor([createdRequirement]);
        RequirementSteps.addOrEditRequirement(createdRequirement);
        DefinitionDetailsPage.requirementListItem(createdRequirement.title).should("be.visible");

        DefinitionDetailsPage.addOrEditRequirementsButton("Edit").click();
        // Check if the text from the previously created requirement is in the 'Title' text input.
        BulkRequirementsModal.titleTextboxes().first().should("have.value", createdRequirement.title);
        getAllRequirementsInterceptor([editedRequirement]);
        RequirementSteps.addOrEditRequirement({ title: editedRequirement.title });
        DefinitionDetailsPage.requirementListItem(editedRequirement.title).should("be.visible");
        DefinitionDetailsPage.addOrEditRequirementsButton("Edit").click();
        getAllRequirementsInterceptor([]);
        RequirementSteps.deleteRequirement();
        DefinitionDetailsPage.requirementListItem(editedRequirement.title).should("not.exist");
    });

    it("User can assign, remove, and edit windchill requirements", () => {
        getAllDefinitionsByAtaInterceptor();
        getDefinitionInterceptor();
        getDefinitionInterceptorV2();
        patchWindchillRequirementsInterceptor();
        patchWindchillAssociatedRequirementsInterceptor();
        assignWindchillRequirementsInterceptor();
        unassignWindchillRequirementsInterceptor();
        getAssignedWindchillRequirementsInterceptor([]);
        getAllTabCountersInterceptor();

        cy.mount(<App />);

        const firstSelectedWindchillRequirement = anyWindchillRequirement({
            id: "first-selected-0",
            documentId: "First Selected",
            windchillId: "0",
            passOrFailCriteria: undefined,
        });
        const updatedFirstSelectedWindchillRequirement = anyWindchillRequirement({
            ...firstSelectedWindchillRequirement,
            passOrFailCriteria: "Updated P/FC 1",
        });
        const secondSelectedWindchillRequirement = anyWindchillRequirement({
            id: "second-selected-1",
            documentId: "Second Selected",
            windchillId: "1",
            passOrFailCriteria: "P/FC 2",
        });
        const updatedSecondSelectedWindchillRequirement = anyWindchillRequirement({
            ...secondSelectedWindchillRequirement,
            passOrFailCriteria: "Updated P/FC 2",
        });
        const unselectedWindchillRequirement = anyWindchillRequirement({
            id: "unselected--1",
            documentId: "Unselected",
            windchillId: "-1",
            passOrFailCriteria: undefined,
        });

        getAllWindchillRequirementsInterceptor([
            firstSelectedWindchillRequirement,
            secondSelectedWindchillRequirement,
            unselectedWindchillRequirement,
        ]);
        DefinitionCardPageFragment.accordionButton().click();
        DefinitionCardPageFragment.detailsButton().click();
        DefinitionDetailsPage.RequirementsTab(0).click();

        DefinitionDetailsPage.addOrEditWindchillRequirementsButton("Add").click();
        getAllWindchillRequirementsInterceptor([firstSelectedWindchillRequirement]);
        WindchillRequirementsSteps.searchWindchillRequirement(firstSelectedWindchillRequirement.documentId);
        cy.wait("@getAllWindchillRequirements");
        WindchillRequirementsSteps.assignWindchillRequirement(
            firstSelectedWindchillRequirement.documentId,
            firstSelectedWindchillRequirement.windchillId
        );
        WindchillRequirementsSteps.editWindchillRequirementPassOrFailCriteria(
            firstSelectedWindchillRequirement.documentId,
            firstSelectedWindchillRequirement.windchillId,
            "Updated P/FC 1"
        );
        getAssignedWindchillRequirementsInterceptor([firstSelectedWindchillRequirement]);
        WindchillRequirementsSteps.submit();

        DefinitionDetailsPage.windchillRequirementListItem(
            `#${firstSelectedWindchillRequirement.documentId} ➝ #${firstSelectedWindchillRequirement.windchillId}`
        ).should("be.visible");

        DefinitionDetailsPage.addOrEditWindchillRequirementsButton("Edit").click();
        WindchillRequirementsSteps.assignWindchillRequirement(
            secondSelectedWindchillRequirement.documentId,
            secondSelectedWindchillRequirement.windchillId
        );
        WindchillRequirementsSteps.editWindchillRequirementPassOrFailCriteria(
            secondSelectedWindchillRequirement.documentId,
            secondSelectedWindchillRequirement.windchillId,
            "Updated P/FC 2"
        );
        getAssignedWindchillRequirementsInterceptor([
            updatedFirstSelectedWindchillRequirement,
            updatedSecondSelectedWindchillRequirement,
        ]);
        WindchillRequirementsSteps.submit();

        DefinitionDetailsPage.windchillRequirementListItem(
            `#${updatedSecondSelectedWindchillRequirement.documentId} ➝ #${updatedSecondSelectedWindchillRequirement.windchillId}`
        ).should("be.visible");

        DefinitionDetailsPage.addOrEditWindchillRequirementsButton("Edit").click();
        WindchillRequirementsSteps.unassignWindchillRequirement(
            updatedSecondSelectedWindchillRequirement.documentId,
            updatedSecondSelectedWindchillRequirement.windchillId
        );
        getAssignedWindchillRequirementsInterceptor([updatedFirstSelectedWindchillRequirement]);
        WindchillRequirementsSteps.submit();

        DefinitionDetailsPage.windchillRequirementListItem(
            `#${updatedSecondSelectedWindchillRequirement.documentId} ➝ #${updatedSecondSelectedWindchillRequirement.windchillId}`
        ).should("not.exist");
    });

    it("User can load more windchill requirement without rerender", () => {
        getAllDefinitionsByAtaInterceptor();
        getDefinitionInterceptor();
        getDefinitionInterceptorV2();
        patchWindchillRequirementsInterceptor();
        patchWindchillAssociatedRequirementsInterceptor();
        assignWindchillRequirementsInterceptor();
        unassignWindchillRequirementsInterceptor();
        getAssignedWindchillRequirementsInterceptor([]);
        getAllTabCountersInterceptor();

        cy.mount(<App />);

        const firstSelectedWindchillRequirement = anyWindchillRequirement({
            id: "first-selected-0",
            documentId: "First Selected",
            windchillId: "0",
            passOrFailCriteria: undefined,
        });

        const secondSelectedWindchillRequirement = anyWindchillRequirement({
            id: "second-selected-1",
            documentId: "Second Selected",
            windchillId: "1",
            passOrFailCriteria: "P/FC 2",
        });

        const bulkWindChillRequirementWithFirstObject = {
            ...firstSelectedWindchillRequirement,
        };

        const bulkWindChillRequirementWithSecondObject = {
            ...secondSelectedWindchillRequirement,
        };

        const firstObjectSlicedArray = Array.from({ length: 30 }, () => bulkWindChillRequirementWithFirstObject);
        const secondObjectSlicedArray = Array.from({ length: 30 }, () => bulkWindChillRequirementWithSecondObject);

        DefinitionCardPageFragment.accordionButton().click();
        DefinitionCardPageFragment.detailsButton().click();
        DefinitionDetailsPage.RequirementsTab(0).click();

        DefinitionDetailsPage.addOrEditWindchillRequirementsButton("Add").click();
        getAllWindchillRequirementsInterceptor(firstObjectSlicedArray);
        cy.wait("@getAllWindchillRequirements");

        DefinitionDetailsPage.showMoreButton().click();
        getAllWindchillRequirementsInterceptor([...firstObjectSlicedArray, ...secondObjectSlicedArray]);
        DefinitionDetailsPage.windChillContainer("Windchill Requirement Container").should("exist");
    });

    it("User can edit a definition", () => {
        const testDefinition = anyDefinition();
        const testRevision = anyRevision();
        getAllDefinitionsByAtaInterceptor([{ value: [testDefinition] }]);
        getDefinitionInterceptor(testDefinition);
        getDefinitionInterceptorV2(testDefinition);
        getAllRevisionsInterceptor([testRevision]);
        updateDefinitionInterceptorV2();

        cy.mount(<App />);
        DefinitionCardPageFragment.accordionButton().click();
        DefinitionCardPageFragment.detailsButton().click();
        DefinitionDetailsPage.actionsButton().click();
        DefinitionDetailsPage.editTestRequestSection().click();
        getDefinitionInterceptorV2({ ...testDefinition, title: "Test Flight 123" });

        DefinitionSteps.editDefinition({ title: "Test Flight 123" });
        cy.wait("@patchDefinitionV2");
        cy.findAllByText("Test Flight 123").should("be.visible");
    });

    it("User sees text from before enabling the new text editor without any errors", () => {
        // This error happens for values that were already in the database before their input fields started using the new text editor.
        const testRevision = anyRevision();
        getAllRevisionsInterceptor([testRevision]);

        getAllDefinitionsByAtaInterceptor();
        getDefinitionInterceptor({ summary: "Test Summary" });
        getDefinitionInterceptorV2({ summary: "Test Summary" });
        updateDefinitionInterceptorV2();
        cy.mount(<App />);
        DefinitionCardPageFragment.accordionButton().click();
        DefinitionCardPageFragment.detailsButton().click();
        DefinitionDetailsPage.actionsButton().click();
        DefinitionDetailsPage.editTestRequestSection().click();
        DefinitionSteps.editDefinition({});
        cy.wait("@patchDefinitionV2");
        cy.findAllByText("Test Summary").should("be.visible");
    });

    it("User can create, edit, and delete special comments", () => {
        const specialComment = anySpecialComment({ comment: "Created Special Comment" });
        const editedSpecialComment = { ...specialComment, comment: "Edited Special Comment" };

        createSpecialCommentsInterceptor();
        updateSpecialCommentsInterceptor();
        deleteSpecialCommentsInterceptor();
        getAllSpecialCommentsInterceptor([]);
        getAllDefinitionsByAtaInterceptor();
        getDefinitionInterceptor();
        getDefinitionInterceptorV2();

        cy.mount(<App />);
        DefinitionCardPageFragment.accordionButton().click();

        DefinitionCardPageFragment.detailsButton().click();
        DefinitionDetailsPage.SpecialCommentsTab().click();
        DefinitionDetailsPage.addOrEditSpecialCommentsButton("Add").click();
        getAllSpecialCommentsInterceptor([specialComment]);
        SpecialCommentsSteps.addOrEditSpecialComment(specialComment);
        DefinitionDetailsPage.specialCommentListItem(specialComment.comment).should("be.visible");

        DefinitionDetailsPage.addOrEditSpecialCommentsButton("Edit").click();
        getAllSpecialCommentsInterceptor([editedSpecialComment]);
        SpecialCommentsSteps.addOrEditSpecialComment(editedSpecialComment);
        DefinitionDetailsPage.specialCommentListItem(editedSpecialComment.comment).should("be.visible");

        DefinitionDetailsPage.addOrEditSpecialCommentsButton("Edit").click();
        getAllSpecialCommentsInterceptor([]);
        SpecialCommentsSteps.deleteSpecialComment(); // Deletes the first special comment
        DefinitionDetailsPage.specialCommentListItem(editedSpecialComment.comment).should("not.exist");
    });

    it("User can edit a procedure's general information in the procedure details", () => {
        getAllDefinitionsByAtaInterceptor();
        getDefinitionInterceptor();
        getDefinitionInterceptorV2();
        getAllParametersInterceptor();
        getAllProceduresInterceptor();
        getProcedureInterceptor();
        cy.mount(<App />);
        DefinitionCardPageFragment.accordionButton().click();

        DefinitionCardPageFragment.detailsButton().click();
        DefinitionDetailsPage.flightGroundTestPlanTab().click();
        DefinitionDetailsPage.proceduresTab().click();
        ProcedureOverviewPage.detailsButton().click();

        ProcedureDetailsPage.editGeneralButton().click();
        Select.selectByOptionName("Safety Approval:", "Medium");
        EditGeneralModal.objectivesTextEditor().clear().type("Objectives Hover Turn");
        EditGeneralModal.prerequisitesTextEditor().clear().type("Prerequisites Hover Turn");
        EditGeneralModal.passFailCriteriaTextEditor().clear().type("Pass Fail Hover Turn");
        updateProcedureInterceptor();
        getProcedureInterceptor({
            safetyApprovalLevel: "MEDIUM",
            objectives: "Objectives Hover Turn",
            prerequisites: "Prerequisites Hover Turn",
            passFailCriteria: "Pass Fail Hover Turn",
        });
        EditGeneralModal.doneButton().click({ force: true });

        cy.findByText("Objectives Hover Turn").should("be.visible");
    });

    it("User can edit a procedure's steps information in the procedure details", () => {
        getAllDefinitionsByAtaInterceptor();
        getDefinitionInterceptor();
        getDefinitionInterceptorV2();
        getAllParametersInterceptor();
        getAllProceduresInterceptor();
        getProcedureInterceptor();

        cy.mount(<App />);
        DefinitionCardPageFragment.accordionButton().click();

        DefinitionCardPageFragment.detailsButton().click();
        DefinitionDetailsPage.flightGroundTestPlanTab().click();
        DefinitionDetailsPage.proceduresTab().click();
        ProcedureOverviewPage.detailsButton().click();
        ProcedureDetailsPage.editStepsButton().click();
        EditStepsModal.setupTextEditor().clear().type("Setup Foo");
        updateProcedureInterceptor();
        getProcedureInterceptor({
            stepSetup: "Setup Foo",
        });
        EditStepsModal.doneButton().click({ force: true });

        cy.findByText("Setup Foo").should("be.visible");
    });

    it("User can edit a procedure's test points", () => {
        const testPointParameter = anyTestPointParameter({ name: "Pressure" });
        const testPointParameters = [testPointParameter];
        const procedure = { title: "Hover Turn", testPointParameters: [testPointParameter.name] };
        getAllDefinitionsByAtaInterceptor();
        getDefinitionInterceptor();
        getDefinitionInterceptorV2();
        getAllParametersInterceptor();
        getAllProceduresInterceptor();
        getProcedureInterceptor();
        getAllParametersInterceptor(testPointParameters);
        getAllProceduresInterceptor([anyProcedure({ ...procedure, testPointParameters })]);
        patchProcedureInterceptorV2();
        bulkCreateTestPointInterceptor();

        cy.mount(<App />);
        DefinitionCardPageFragment.accordionButton().click();

        DefinitionCardPageFragment.detailsButton().click();
        DefinitionDetailsPage.flightGroundTestPlanTab().click();
        DefinitionDetailsPage.proceduresTab().click();
        ProcedureOverviewPage.detailsButton().click();
        ProcedureDetailsPage.addTestPointButton().click();
        Select.selectByOptionName(
            `Test Point Parameters (${testPointParameters.length} parameter(s))`,
            testPointParameter.name
        );

        AddTestPointModal.grossWeightFormInput(0).type("test");
        AddTestPointModal.centerOfGravityFormInput(0).type("-1");
        AddTestPointModal.testPointParameterFormInput(0, testPointParameter.id).type("2");
        AddTestPointModal.commentsFormInput(0).type("test comment");
        AddTestPointModal.isApplicableForDevelopmentFormInput("DEVELOPMENT").check({ force: true });
        AddTestPointModal.doneButton().click();

        cy.wait("@patchProcedureInterceptor")
            .its("request.body.testPointParameters")
            .should("include.members", [testPointParameter.id]);
        cy.wait("@bulkCreateTestPoint").as("bulkCreateTestPointCall");
        cy.get("@bulkCreateTestPointCall").its("request.body[0]").should("contain", {
            centerOfGravity: "-1",
            comments: "test comment",
            grossWeight: "test",
            applicability: "DEVELOPMENT",
        });
        cy.get("@bulkCreateTestPointCall")
            .its("request.body[0].testPointParameters[1]")
            .should("contain", { id: testPointParameter.id, value: "2" });
    });

    it.skip("User can create, edit, and delete important notes", () => {
        const procedure = anyProcedure({
            title: "Hover Turn",
            status: "FLIGHT TEST REVIEW",
        });
        const importantNote = anyImportantNote({
            title: "Important Note Foo",
            note: "This is important!",
        });

        getAllDefinitionsByAtaInterceptor();
        getDefinitionInterceptor();
        getDefinitionInterceptorV2();
        getAllParametersInterceptor();
        getAllProceduresInterceptor();
        getProcedureInterceptor(procedure);
        bulkCreateImportantNotesInterceptor();
        bulkUpdateImportantNotesInterceptor();
        bulkDeleteImportantNotesInterceptor();

        cy.mount(<App />);

        DefinitionCardPageFragment.accordionButton().click();
        DefinitionCardPageFragment.detailsButton().click();
        DefinitionDetailsPage.flightGroundTestPlanTab().click();
        DefinitionDetailsPage.proceduresTab().click();
        ProcedureOverviewPage.detailsButton().click();

        getAllImportantNotesInterceptor([importantNote]);
        ImportantNotesSteps.addImportantNotes({ title: "Important Note Foo", description: "This is important!" });
        cy.findByText("Important Note Foo").should("be.visible");

        getAllImportantNotesInterceptor([{ ...importantNote, title: "Important Note Bar" }]);
        ImportantNotesSteps.editImportantNotes({ title: "Important Note Bar" });
        cy.findByText("Important Note Bar").should("be.visible");

        getAllImportantNotesInterceptor([]);
        ImportantNotesSteps.deleteImportantNotes();
        cy.findByText("Important Note Bar").should("not.exist");
    });

    it.skip("User can create, edit, and delete additional comments", () => {
        getAllDefinitionsByAtaInterceptor();
        getDefinitionInterceptor();
        getDefinitionInterceptorV2();
        getAllParametersInterceptor();
        getAllProceduresInterceptor();
        getProcedureInterceptor();
        bulkCreateAdditionalCommentsInterceptor();
        bulkUpdateAdditionalCommentsInterceptor();
        bulkDeleteAdditionalCommentsInterceptor();

        cy.mount(<App />);

        DefinitionCardPageFragment.accordionButton().click();
        DefinitionCardPageFragment.detailsButton().click();
        DefinitionDetailsPage.flightGroundTestPlanTab().click();
        DefinitionDetailsPage.proceduresTab().click();
        ProcedureOverviewPage.detailsButton().click();

        getAllAdditionalCommentsInterceptor([{ comment: "Additional Comment Foo" }]);
        AdditionalCommentsSteps.addAdditionalComments({
            comment: "Additional Comment Foo",
        });
        cy.findByText("Additional Comment Foo").should("be.visible");

        getAllAdditionalCommentsInterceptor([{ comment: "Additional Comment Bar" }]);
        AdditionalCommentsSteps.editAdditionalComments({ comment: "Additional Comment Bar" });
        cy.findByText("Additional Comment Bar").should("be.visible");

        getAllAdditionalCommentsInterceptor([]);
        AdditionalCommentsSteps.deleteAdditionalComments();
        cy.findByText("Additional Comment Bar").should("not.exist");
    });

    it("User can enable and disable applicable requirements", () => {
        const applicableRequirement = anyApplicableRequirement({ title: "Requirement A" });

        getAllDefinitionsByAtaInterceptor();
        getDefinitionInterceptor();
        getDefinitionInterceptorV2();
        getAllParametersInterceptor();
        getAllProceduresInterceptor();
        getProcedureInterceptor();
        bulkSetApplicableRequirementsInterceptor();
        getAllApplicableRequirementsInterceptor([applicableRequirement]);
        getAllRequirementsInterceptor();
        getAllTabCountersInterceptor();

        cy.mount(<App />);
        DefinitionCardPageFragment.accordionButton().click();

        DefinitionCardPageFragment.detailsButton().click();
        DefinitionDetailsPage.flightGroundTestPlanTab().click();
        DefinitionDetailsPage.proceduresTab().click();
        ProcedureOverviewPage.detailsButton().click();
        ProcedureDetailsPage.editApplicableRequirementsButton().click();
        EditApplicableRequirementsModal.disableRequirementButton(applicableRequirement.title).click({ force: true });

        getAllApplicableRequirementsInterceptor([{ ...applicableRequirement, applicable: false }]);
        EditApplicableRequirementsModal.doneButton().click({ force: true });
        EditApplicableRequirementsModal.doneButton().should("not.exist");
        cy.findByText(applicableRequirement.title).should("not.exist");

        ProcedureDetailsPage.editApplicableRequirementsButton().click();
        EditApplicableRequirementsModal.enableRequirementButton(applicableRequirement.title).click({ force: true });
        getAllApplicableRequirementsInterceptor([{ ...applicableRequirement, applicable: true }]);
        EditApplicableRequirementsModal.doneButton().click({ force: true });
        EditApplicableRequirementsModal.doneButton().should("not.exist");
        cy.findByText(applicableRequirement.title).should("be.visible");
    });

    it("User can link and unlink FTI parameters", () => {
        const epuFtiParameters = Array.from({ length: 3 })
            .fill(undefined)
            .map((_, index) =>
                anyFtiParameter({
                    ftiCode: `11110111${index}`,
                    workgroup: {
                        label: "EPU",
                    },
                    shortDescription: "EPU",
                })
            );
        const coreAvionicsFtiParameters = Array.from({ length: 3 })
            .fill(undefined)
            .map((_, index) =>
                anyFtiParameter({
                    ftiCode: `21110111${index}`,
                    workgroup: {
                        label: "Core Avionics",
                    },
                    shortDescription: "Core Avionics",
                    isSafetyOfFlightCritical: index === 0,
                })
            );
        const epuFtiParameter = epuFtiParameters[0]!;

        const epuFtiLink = anyFtiLink({
            instrumentationId: epuFtiParameter.id,
            desirability: "ESSENTIAL",
            instrumentationParameter: epuFtiParameter,
        });
        const coreAvionicsFtiLinks = coreAvionicsFtiParameters.map((instrumentationParameter) =>
            anyFtiLink({
                instrumentationId: instrumentationParameter.id,
                desirability: "DESIRABLE",
                instrumentationParameter,
            })
        );

        getAllDefinitionsByAtaInterceptor();
        // TODO: Remove masterModel from the getDefinition interceptors below once pre-filtering by master model is implemented.
        // See ticket VTE-1276 for more information.
        getDefinitionInterceptor({ masterModel: "VC2-1" });
        getDefinitionInterceptorV2({ masterModel: "VC2-1" });
        bulkAddLinkedFtiParameterInterceptor();
        bulkDeleteLinkedFtiParameterInterceptor();
        bulkEditLinkedFtiParameterInterceptor();

        cy.mount(<App />);
        DefinitionCardPageFragment.accordionButton().click();

        DefinitionCardPageFragment.detailsButton().click();
        DefinitionDetailsPage.FtiParametersTab().click();

        getAllInstrumentationParametersInterceptor([...epuFtiParameters, ...coreAvionicsFtiParameters]);
        FtiParametersOverviewPage.editFtiParametersButton().click({ force: true });
        LinkFtiParametersModal.searchIndication().should("exist");
        FilterBarFtiParameterPageFragment.filter({ ftiCode: "111" });
        LinkFtiParametersModal.workgroupButton("EPU").click({ force: true });
        LinkFtiParametersModal.selectedTitle(0).should("be.visible");
        LinkFtiParametersModal.selectFtiParameterCheckbox(epuFtiParameter.ftiCode ?? "").click({ force: true });
        LinkFtiParametersModal.selectedTitle(1).should("be.visible");
        LinkFtiParametersModal.makeFtiParameterDesirable(epuFtiParameter.ftiCode ?? "").click({ force: true });
        LinkFtiParametersModal.makeFtiParameterEssential(epuFtiParameter.ftiCode ?? "").click({ force: true });
        LinkFtiParametersModal.ftiParameterSelectionIndicator(3, 1).should("be.visible");

        getAllInstrumentationParametersInterceptor(coreAvionicsFtiParameters);
        FilterBarFtiParameterPageFragment.filter({ shortDescription: "Core Avionics" });
        LinkFtiParametersModal.unselectFtiParameterCheckbox(epuFtiParameter.ftiCode ?? "").should("exist");
        LinkFtiParametersModal.selectAllFtiParametersOfWorkgroupCheckbox("Core Avionics").click({ force: true });
        LinkFtiParametersModal.ftiParameterSelectionIndicator(3, 3).should("be.visible");
        LinkFtiParametersModal.selectedTitle(4).should("be.visible");
        LinkFtiParametersModal.actionsForWorkgroup("Core Avionics").click({ force: true });
        LinkFtiParametersModal.makeAllDesirableButton().click({ force: true });
        LinkFtiParametersModal.makeFtiParameterEssential("211101111").should("exist");
        LinkFtiParametersModal.unselectAllFtiParametersOfWorkgroupCheckbox("Core Avionics").click({ force: true });
        LinkFtiParametersModal.ftiParameterSelectionIndicator(3, 0).should("be.visible");
        LinkFtiParametersModal.selectedTitle(1).should("be.visible");
        LinkFtiParametersModal.selectAllFtiParametersOfWorkgroupCheckbox("Core Avionics").click({ force: true });
        LinkFtiParametersModal.actionsForWorkgroup("Core Avionics").click({ force: true });
        LinkFtiParametersModal.makeAllDesirableButton().click({ force: true });
        LinkFtiParametersModal.safetyOfFlightCriticalButtons().its("length").should("eq", 2);

        getAllInstrumentationParametersInterceptor([epuFtiParameter, ...coreAvionicsFtiParameters]);
        getAllLinkedFtiParametersInterceptor([epuFtiLink, ...coreAvionicsFtiLinks]);
        LinkFtiParametersModal.doneButton().click();
        cy.wait("@bulkPostLinkedFtiParameter");
        FtiParametersOverviewPage.workgroupCard("EPU").should("be.visible");
        FtiParametersOverviewPage.workgroupCard("Core Avionics").should("be.visible");
        FtiParametersOverviewPage.workgroupCard("Core Avionics").click({ force: true });
        FtiParametersOverviewPage.safetyOfFlightCriticalBadges().its("length").should("eq", 1);

        FtiParametersOverviewPage.editFtiParametersButton().click();
        LinkFtiParametersModal.searchIndication().should("exist");
        LinkFtiParametersModal.selectedTitle(4).should("be.visible");
        LinkFtiParametersModal.unselectFtiParameterCheckbox(epuFtiParameter.ftiCode ?? "").click({ force: true });
        LinkFtiParametersModal.selectedTitle(3).should("be.visible");

        getAllInstrumentationParametersInterceptor(coreAvionicsFtiParameters);
        getAllLinkedFtiParametersInterceptor(coreAvionicsFtiLinks);
        LinkFtiParametersModal.doneButton().click();
        cy.wait("@bulkDeleteLinkedFtiParameter");
        FtiParametersOverviewPage.workgroupCard("EPU").should("not.exist");
        FtiParametersOverviewPage.workgroupCard("Core Avionics").should("be.visible");

        FtiParametersOverviewPage.editFtiParametersButton().click();
        LinkFtiParametersModal.searchIndication().should("exist");
        LinkFtiParametersModal.selectedTitle(3).should("be.visible");
        LinkFtiParametersModal.actionsForWorkgroup("Core Avionics").click({ force: true });
        LinkFtiParametersModal.makeAllEssentialButton().click({ force: true });

        getAllInstrumentationParametersInterceptor(coreAvionicsFtiParameters);
        getAllLinkedFtiParametersInterceptor(
            coreAvionicsFtiLinks.map((ftiLink) => ({ ...ftiLink, desirability: "ESSENTIAL" }))
        );
        LinkFtiParametersModal.doneButton().click();
        cy.wait("@bulkPatchLinkedFtiParameter");

        FtiParametersOverviewPage.editFtiParametersButton().click();
        for (const ftiParameter of coreAvionicsFtiParameters) {
            LinkFtiParametersModal.unselectFtiParameterCheckbox(ftiParameter.ftiCode ?? "").click({ force: true });
        }
        LinkFtiParametersModal.selectedTitle(0).should("be.visible");

        getAllInstrumentationParametersInterceptor([]);
        getAllLinkedFtiParametersInterceptor([]);
        LinkFtiParametersModal.doneButton().click();
        cy.wait("@bulkDeleteLinkedFtiParameter");
        FtiParametersOverviewPage.workgroupCard("EPU").should("not.exist");
        FtiParametersOverviewPage.workgroupCard("Core Avionics").should("not.exist");
    });

    it("User can edit multiple procedure details with the same editSessionId", () => {
        getAllDefinitionsByAtaInterceptor();
        getDefinitionInterceptor();
        getDefinitionInterceptorV2();
        getAllParametersInterceptor();
        getAllProceduresInterceptor();
        getProcedureInterceptor();
        updateProcedureInterceptor();

        cy.mount(<App />);
        DefinitionCardPageFragment.accordionButton().click();

        DefinitionCardPageFragment.detailsButton().click();
        DefinitionDetailsPage.flightGroundTestPlanTab().click();
        DefinitionDetailsPage.proceduresTab().click();
        ProcedureOverviewPage.detailsButton().click();

        ProcedureDetailsPage.editGeneralButton().click();
        Select.selectByOptionName("Safety Approval:", "Medium");
        EditGeneralModal.objectivesTextEditor().clear().type("Objectives Hover Turn");
        EditGeneralModal.prerequisitesTextEditor().clear().type("Prerequisites Hover Turn");
        EditGeneralModal.passFailCriteriaTextEditor().clear().type("Pass Fail Hover Turn");

        getProcedureInterceptor({
            safetyApprovalLevel: "MEDIUM",
            objectives: "Objectives Hover Turn",
            prerequisites: "Prerequisites Hover Turn",
            passFailCriteria: "Pass Fail Hover Turn",
        });
        EditGeneralModal.doneButton().click({ force: true });

        cy.findByText("Objectives Hover Turn").should("be.visible");

        ProcedureDetailsPage.editStepsButton().click();
        EditStepsModal.setupTextEditor().clear().type("Setup Foo");

        getProcedureInterceptor({
            stepSetup: "Setup Foo",
        }).as("procedurePatch");
        EditStepsModal.doneButton().click({ force: true });

        cy.findByText("Setup Foo").should("be.visible");

        cy.wait("@patchProcedure").its("request.query.editSessionId").as("generalEditSessionId");
        cy.wait("@patchProcedure").its("request.query.editSessionId").as("stepsEditSessionId");

        cy.get("@generalEditSessionId").then((generalEditSessionId) => {
            cy.get("@stepsEditSessionId").then((stepsEditSessionId) => {
                expect(generalEditSessionId).to.equal(stepsEditSessionId);
            });
        });
    });

    it("User is using a new edit session if he leaves and reopens the procedure detail view", () => {
        getAllDefinitionsByAtaInterceptor();
        getDefinitionInterceptor();
        getDefinitionInterceptorV2();
        getAllParametersInterceptor();
        getAllProceduresInterceptor();
        getProcedureInterceptor();
        updateProcedureInterceptor();

        cy.mount(<App />);

        DefinitionCardPageFragment.accordionButton().click();

        DefinitionCardPageFragment.detailsButton().click();
        DefinitionDetailsPage.flightGroundTestPlanTab().click();
        DefinitionDetailsPage.proceduresTab().click();
        ProcedureOverviewPage.detailsButton().click();

        ProcedureDetailsPage.editGeneralButton().click();
        EditGeneralModal.objectivesTextEditor().clear().type("Objectives Hover Turn");
        EditGeneralModal.prerequisitesTextEditor().clear().type("Prerequisites Hover Turn");
        EditGeneralModal.passFailCriteriaTextEditor().clear().type("Pass Fail Hover Turn");

        getProcedureInterceptor({
            safetyApprovalLevel: "MEDIUM",
            objectives: "Objectives Hover Turn",
            prerequisites: "Prerequisites Hover Turn",
            passFailCriteria: "Pass Fail Hover Turn",
        });
        EditGeneralModal.doneButton().click({ force: true });

        cy.wait("@patchProcedure").its("request.query.editSessionId").as("generalEditSessionId1");

        cy.findByText("Objectives Hover Turn").should("be.visible");

        ProcedureDetailsPage.backButton().click();

        DefinitionDetailsPage.flightGroundTestPlanTab().click();
        DefinitionDetailsPage.proceduresTab().click();
        ProcedureOverviewPage.detailsButton().click();

        ProcedureDetailsPage.editGeneralButton().click();
        EditGeneralModal.objectivesTextEditor().clear().type("Objectives Hover Turn");
        EditGeneralModal.prerequisitesTextEditor().clear().type("Prerequisites Hover Turn");
        EditGeneralModal.passFailCriteriaTextEditor().clear().type("Pass Fail Hover Turn");
        getProcedureInterceptor({
            safetyApprovalLevel: "MEDIUM",
            objectives: "Objectives Hover Turn",
            prerequisites: "Prerequisites Hover Turn",
            passFailCriteria: "Pass Fail Hover Turn",
        });
        EditGeneralModal.doneButton().click({ force: true });

        cy.wait("@patchProcedure").its("request.query.editSessionId").as("generalEditSessionId2");
        cy.findByText("Objectives Hover Turn").should("be.visible");

        cy.get("@generalEditSessionId1").then((generalEditSessionId1) => {
            cy.get("@generalEditSessionId2").then((generalEditSessionId2) => {
                expect(generalEditSessionId1).not.to.equal(generalEditSessionId2);
            });
        });
    });

    it("User can view the definition history log", () => {
        getAllDefinitionsByAtaInterceptor();
        getDefinitionInterceptor();
        getDefinitionInterceptorV2();
        getAllParametersInterceptor();
        getAllProceduresInterceptor();
        getProcedureInterceptor();
        getAllChangelogsInterceptor([
            anyChangeLog({ entityType: "procedure", title: "Flight Test Review", status: "ENGINEERING REVIEW" }),
        ]);

        cy.mount(<App />);

        DefinitionCardPageFragment.accordionButton().click();

        DefinitionCardPageFragment.detailsButton().click();
        DefinitionDetailsPage.approvalAndVersionsTab().click();
        ChangeHistoryPage.changesAfterRevisionListItems().should("have.length", 1);
        ChangeHistoryPage.changesAfterRevisionListItems()
            .first()
            .should("contain.text", "Status Change")
            .should("contain.text", "Flight Test Review")
            .should("contain.text", "Engineering Review");
    });
});
