import {
    Procedure,
    ProcedurePatch,
    ProcedureRead,
    ProcedureStatus,
    SafetyLevel,
    anyProcedure,
} from "@voloiq/flight-test-definition-api/v1";
import { AppWithoutProvider as App } from "../../src/App";
import { getAllAdditionalCommentsInterceptor } from "../interceptors/additionalCommentsInterceptors";
import { getAllApplicableRequirementsInterceptor } from "../interceptors/applicableRequirementsInterceptors";
import { getAllAttachedFilesInterceptor } from "../interceptors/attachedFilesInterceptors";
import { getAllDefinitionsByAtaInterceptor, getDefinitionInterceptor } from "../interceptors/definitionsInterceptors";
import { getAllRevisionsInterceptor } from "../interceptors/getAllRevisionsInterceptor";
import { getAllImportantNotesInterceptor } from "../interceptors/importantNotesInterceptors";
import { getAllParametersInterceptor } from "../interceptors/parametersInterceptors";
import {
    bulkCreateProcedureInterceptor,
    getAllProcedureRevisionsInterceptor,
    getAllProceduresInterceptor,
    getProcedureInterceptor,
    updateProcedureErrorInterceptor,
} from "../interceptors/proceduresInterceptors";
import { getAllRequirementsInterceptor } from "../interceptors/requirementsInterceptors";
import { getAllTestPointsOfProcedureInterceptor } from "../interceptors/testPointInterceptors";
import {
    ApiError,
    getAllTabCountersInterceptor,
    getDefinitionInterceptorV2,
} from "../interceptors/v2/definitionsInterceptors";
import { getAssignedWindchillRequirementsInterceptor } from "../interceptors/windchillAssociatedRequirementsInterceptors";
import { DefinitionDetailsPage } from "../pages/definition-details/definitionDetailsPageObject";
import { ProcedureDetailsPage } from "../pages/definition-details/procedure/procedureDetailsPageObject";
import { ProcedureOverviewPage } from "../pages/definition-details/procedure/procedureOverviewPageObject";
import { DefinitionCardPageFragment } from "../pages/definition-overview/page-fragments/definitionCardPageFragment";
import { ProcedureSteps } from "../steps/procedureStepObject";

const errorMessage: ApiError = {
    id: "0b99d474-99ca-4151-b968-d84c8eee39fa",
    timestamp: "2024-05-15T08:03:34.597367Z",
    code: 400,
    message: "Bad Request.",
    status: "INVALID_ARGUMENT",
    details: [
        "Cannot move an incomplete Procedure out of Draft! The following required field(s) are empty: ['prerequisites', 'objectives', 'pass_fail_criteria', 'step_setup', 'step_procedure', 'safety_approval_level', 'test_point_tolerance', 'Test Point Parameters and their values in Test Points']",
    ],
};

const procedurePatchResponseBodyFactory = (status: string) => {
    return {
        data: {
            title: "My Procedure",
            id: "35f4cfa6-a03c-410f-b744-aba549fe2dac",
            definitionId: "bbf432e1-f9f9-40f2-ab03-302f3b5a9817",
            testPointParameters: [
                {
                    name: "AirSpeed",
                    unit: "kt",
                    acronym: "AS",
                    id: "6e930aa9-b68c-4aa4-bd02-fa0363188e16",
                    isActive: true,
                    createTime: "2023-09-08T13:06:29.478761Z",
                    updateTime: "2023-09-08T13:06:29.478765Z",
                },
                {
                    name: "Target Emergency Power Unit",
                    unit: "s",
                    acronym: "TGT EPU",
                    id: "cfd94d77-24e7-419a-b0bf-bf7cf7e216d1",
                    isActive: true,
                    createTime: "2023-09-08T13:14:04.552675Z",
                    updateTime: "2023-09-08T13:14:19.503876Z",
                },
            ],
            procedureId: "FTD-VC2-10-003-A00-01",
            createTime: "2024-05-15T07:04:04.943841Z",
            updateTime: "2024-05-15T07:06:39.250574Z",
            objectives: "Test",
            prerequisites: "Test",
            passFailCriteria: "Test",
            stepSetup: "Test",
            stepProcedure: "Test",
            stepRecovery: "Test",
            status: status as ProcedureStatus,
            safetyApprovalLevel: "HIGH" as SafetyLevel,
            testPointTolerance: "Test",
            isApprovedForRevision: false,
        },
    };
};

describe("DefinitionChangeHistory", () => {
    beforeEach(() => {
        getAllAttachedFilesInterceptor([]);
        getAllRevisionsInterceptor();
        getAllProcedureRevisionsInterceptor([]);
        getAllTabCountersInterceptor();
        getAllRequirementsInterceptor([]);
        getAssignedWindchillRequirementsInterceptor([]);
        getAllAdditionalCommentsInterceptor([]);
        getAllImportantNotesInterceptor([]);
        getAllTestPointsOfProcedureInterceptor([]);
        getAllApplicableRequirementsInterceptor([]);
    });

    it("User can see the Draft badge in Procedures Overview and Details", () => {
        getAllDefinitionsByAtaInterceptor();
        getDefinitionInterceptorV2();
        getAllProceduresInterceptor();
        getProcedureInterceptor();

        cy.mount(<App />);
        DefinitionCardPageFragment.accordionButton().click();
        DefinitionCardPageFragment.detailsButton().click();
        DefinitionDetailsPage.flightGroundTestPlanTab().click();
        DefinitionDetailsPage.proceduresTab().click();
        ProcedureOverviewPage.procedureCard("Hover Turn").within(() => {
            cy.findByText("Draft").should("be.visible");
        });
        ProcedureOverviewPage.detailsButton().click();
        cy.findByText("Draft").should("be.visible");
    });

    it("User can see the different badges in Procedure Overview for different Procedures", () => {
        const procedure1 = {
            title: "Hover Turn",
            status: "SAFETY APPROVAL" as ProcedureStatus,
        };
        const procedure2 = {
            title: "Hover Back",
        };

        getAllParametersInterceptor();
        getAllDefinitionsByAtaInterceptor();
        getDefinitionInterceptor();
        getDefinitionInterceptorV2();
        bulkCreateProcedureInterceptor();

        cy.mount(<App />);

        DefinitionCardPageFragment.accordionButton().click();
        DefinitionCardPageFragment.detailsButton().click();
        DefinitionDetailsPage.flightGroundTestPlanTab().click();
        DefinitionDetailsPage.proceduresTab().click();

        getAllProceduresInterceptor([anyProcedure({ ...procedure1 })]);
        ProcedureOverviewPage.procedureCard("Hover Turn").within(() => {
            cy.findByText("Safety Release").should("be.visible");
        });

        getAllProceduresInterceptor([anyProcedure({ ...procedure1 }), anyProcedure({ ...procedure2 })]);
        ProcedureSteps.addAnotherProcedure(procedure2, 1);
        ProcedureOverviewPage.procedureCard("Hover Back").within(() => {
            cy.findByText("Draft").should("be.visible");
        });
    });

    it("User gets an error message, saying which data is missing to change the status", () => {
        getAllDefinitionsByAtaInterceptor();
        getDefinitionInterceptorV2();
        getAllProceduresInterceptor();
        getProcedureInterceptor();

        cy.mount(<App />);
        DefinitionCardPageFragment.accordionButton().click();
        DefinitionCardPageFragment.detailsButton().click();
        DefinitionDetailsPage.flightGroundTestPlanTab().click();
        DefinitionDetailsPage.proceduresTab().click();
        ProcedureOverviewPage.detailsButton().click();

        ProcedureDetailsPage.changeStatusButton().click();

        cy.findByLabelText("Status").click();
        cy.findByText("Flight Test Review").click();
        updateProcedureErrorInterceptor(errorMessage);
        cy.findByRole("button", { name: "Done" }).click();
        cy.wait("@patchProcedureError").then((interception) => {
            expect(interception?.response?.statusCode).to.eq(400);
            expect(interception?.response?.body.error).to.have.property("details");
        });
    });

    it("User can change the status from Draft to Flight Test Review", () => {
        const status = "Flight Test Review";
        const procedure: Partial<Procedure & ProcedureRead> = {
            title: "Hover Turn",
            status: status.toUpperCase() as ProcedureStatus,
        };
        const procedurePatchResponseBody: { data: Partial<ProcedurePatch> } = procedurePatchResponseBodyFactory(
            status.toUpperCase()
        );
        getAllDefinitionsByAtaInterceptor();
        getDefinitionInterceptorV2();
        getAllProceduresInterceptor();
        getProcedureInterceptor();

        cy.mount(<App />);

        ProcedureSteps.openStatusModalAndTriggerStatusDropdown(procedure);
        cy.findByText("Engineering Review").should("not.exist");
        cy.findByText("Technical Approval").should("not.exist");
        cy.findByText("Safety Release").should("not.exist");
        ProcedureSteps.changeStatusAndCheckResponse(status, procedurePatchResponseBody);
    });

    it("User can change the status from Flight Test Review to Engineering Review", () => {
        const procedure1: Partial<Procedure & ProcedureRead> = {
            title: "Hover Turn",
            status: "FLIGHT TEST REVIEW" as ProcedureStatus,
        };

        const status = "Engineering Review";
        const procedure2: Partial<Procedure & ProcedureRead> = {
            title: "Hover Turn",
            status: "ENGINEERING REVIEW" as ProcedureStatus,
        };
        const procedurePatchResponseBody: { data: Partial<ProcedurePatch> } = procedurePatchResponseBodyFactory(
            status.toUpperCase()
        );

        getAllDefinitionsByAtaInterceptor();
        getDefinitionInterceptorV2();
        getAllProceduresInterceptor();
        getProcedureInterceptor(anyProcedure({ ...procedure1 }));

        cy.mount(<App />);

        ProcedureSteps.openStatusModalAndTriggerStatusDropdown(procedure2);
        cy.findByRole("dialog").within(() => {
            cy.findByText("Draft").should("be.visible");
            cy.findByText("Technical Approval").should("not.exist");
            cy.findByText("Safety Release").should("not.exist");
        });
        ProcedureSteps.changeStatusAndCheckResponse(status, procedurePatchResponseBody);
    });

    it("User can change the status from Engineering Review to Technical Approval", () => {
        const procedure1: Partial<Procedure & ProcedureRead> = {
            title: "Hover Turn",
            status: "ENGINEERING REVIEW" as ProcedureStatus,
        };

        const status = "Technical Approval";
        const procedure2: Partial<Procedure & ProcedureRead> = {
            title: "Hover Turn",
            status: "TECHNICAL APPROVAL" as ProcedureStatus,
        };
        const procedurePatchResponseBody: { data: Partial<ProcedurePatch> } = procedurePatchResponseBodyFactory(
            status.toUpperCase()
        );

        getAllDefinitionsByAtaInterceptor();
        getDefinitionInterceptorV2();
        getAllProceduresInterceptor();
        getProcedureInterceptor(anyProcedure({ ...procedure1 }));

        cy.mount(<App />);

        ProcedureSteps.openStatusModalAndTriggerStatusDropdown(procedure2);
        cy.findByRole("dialog").within(() => {
            cy.findByText("Draft").should("be.visible");
            cy.findByText("Flight Test Review").should("be.visible");
            cy.findByText("Safety Release").should("not.exist");
        });
        ProcedureSteps.changeStatusAndCheckResponse(status, procedurePatchResponseBody);
    });

    it("User can change the status from Technical Approval to Safety Approval", () => {
        const procedure1: Partial<Procedure & ProcedureRead> = {
            title: "Hover Turn",
            status: "TECHNICAL APPROVAL" as ProcedureStatus,
        };

        const status = "Safety Approval";
        const procedure2: Partial<Procedure & ProcedureRead> = {
            title: "Hover Turn",
            status: "SAFETY APPROVAL" as ProcedureStatus,
        };
        const procedurePatchResponseBody: { data: Partial<ProcedurePatch> } = procedurePatchResponseBodyFactory(
            status.toUpperCase()
        );

        getAllDefinitionsByAtaInterceptor();
        getDefinitionInterceptorV2();
        getAllProceduresInterceptor();
        getProcedureInterceptor(anyProcedure({ ...procedure1 }));

        cy.mount(<App />);

        ProcedureSteps.openStatusModalAndTriggerStatusDropdown(procedure2);
        cy.findByRole("dialog").within(() => {
            cy.findByText("Draft").should("be.visible");
            cy.findByText("Flight Test Review").should("be.visible");
            cy.findByText("Engineering Review").should("be.visible");
        });
        ProcedureSteps.changeStatusAndCheckResponse(status, procedurePatchResponseBody);
    });

    it("User can change the status from Technical Approval back to Draft", () => {
        const procedure1: Partial<Procedure & ProcedureRead> = {
            title: "Hover Turn",
            status: "TECHNICAL APPROVAL" as ProcedureStatus,
        };

        const status = "Draft";
        const procedure2: Partial<Procedure & ProcedureRead> = {
            title: "Hover Turn",
            status: "DRAFT" as ProcedureStatus,
        };
        const procedurePatchResponseBody: { data: Partial<ProcedurePatch> } = procedurePatchResponseBodyFactory(
            status.toUpperCase()
        );
        getAllDefinitionsByAtaInterceptor();
        getDefinitionInterceptorV2();
        getAllProceduresInterceptor();
        getProcedureInterceptor(anyProcedure({ ...procedure1 }));

        cy.mount(<App />);

        ProcedureSteps.openStatusModalAndTriggerStatusDropdown(procedure2);
        cy.findByRole("dialog").within(() => {
            cy.findByText("Draft").should("be.visible");
            cy.findByText("Flight Test Review").should("be.visible");
            cy.findByText("Engineering Review").should("be.visible");
        });
        ProcedureSteps.changeStatusAndCheckResponse(status, procedurePatchResponseBody);
    });

    it("User cannot change the status from Safety Approval to something else", () => {
        const procedure: Partial<Procedure & ProcedureRead> = {
            title: "Hover Turn",
            status: "SAFETY APPROVAL" as ProcedureStatus,
        };

        getAllDefinitionsByAtaInterceptor();
        getDefinitionInterceptorV2();
        getAllProceduresInterceptor();
        getProcedureInterceptor(anyProcedure({ ...procedure }));

        cy.mount(<App />);

        ProcedureSteps.openStatusModalAndTriggerStatusDropdown(procedure);
        cy.findByRole("dialog").within(() => {
            cy.findByText("Draft").should("not.exist");
            cy.findByText("Flight Test Review").should("not.exist");
            cy.findByText("Engineering Review").should("not.exist");
        });
    });
});
