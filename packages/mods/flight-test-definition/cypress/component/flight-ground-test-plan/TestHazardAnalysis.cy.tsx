import { anyTestHazardAssessment } from "@voloiq/flight-test-definition-api/v1";
import { anyDefinition } from "@voloiq/flight-test-definition-api/v2";
import { AppWithoutProvider as App } from "../../../src/App";
import { getAllAttachedFilesInterceptor } from "../../interceptors/attachedFilesInterceptors";
import { getAllDefinitionsByAtaInterceptor } from "../../interceptors/definitionsInterceptors";
import { getAllRevisionsInterceptor } from "../../interceptors/getAllRevisionsInterceptor";
import { getAllProceduresInterceptor } from "../../interceptors/proceduresInterceptors";
import {
    assignTestHazardAssessmentsInterceptor,
    getAllTestHazardAssessmentsInterceptor,
    getAssignedTestHazardAssessmentsInterceptor,
    unassignTestHazardAssessmentsInterceptor,
} from "../../interceptors/testHazardAssessmentsInterceptors";
import {
    getAllTabCountersInterceptor,
    getDefinitionInterceptorV2,
    getDefinitionRevisionInterceptorV2,
    updateDefinitionInterceptorV2,
} from "../../interceptors/v2/definitionsInterceptors";
import { DefinitionDetailsPage } from "../../pages/definition-details/definitionDetailsPageObject";
import { AdditionalCommentsModal } from "../../pages/definition-details/test-hazard-analysis/additionalCommentsModalPageFragment";
import { AdditionalCommentsSection } from "../../pages/definition-details/test-hazard-analysis/additionalCommentsSectionPageFragment";
import { SafetyReviewBoardModal } from "../../pages/definition-details/test-hazard-analysis/safetyReviewBoardModalPageFragment";
import { SafetyReviewBoardSection } from "../../pages/definition-details/test-hazard-analysis/safetyReviewBoardSectionPageFragment";
import { DefinitionCardPageFragment } from "../../pages/definition-overview/page-fragments/definitionCardPageFragment";

describe("TestHazardAnalysis", () => {
    beforeEach(() => {
        getAllTabCountersInterceptor();
        getAllDefinitionsByAtaInterceptor();
        getDefinitionInterceptorV2();
        getDefinitionRevisionInterceptorV2();
        getAllRevisionsInterceptor();
        getAllProceduresInterceptor();
        getAllAttachedFilesInterceptor();
        getAssignedTestHazardAssessmentsInterceptor();
    });

    const firstTHA = anyTestHazardAssessment({
        hazard: "High energy fragments",
        preMitigationRiskLevel: "HIGH",
        residualRiskLevel: "MEDIUM",
        hazardGroup: "GENERIC_HAZARDS",
    });
    const secondTHA = anyTestHazardAssessment({
        hazard: "Ice shedding evaluation",
        preMitigationRiskLevel: "MEDIUM",
        residualRiskLevel: "MEDIUM",
        hazardGroup: "TEST_POINT_SPECIFIC_HAZARDS",
    });
    const testHazardAssessments = [firstTHA, secondTHA];

    it("should display a message if there are no test hazard assessments", () => {
        getAssignedTestHazardAssessmentsInterceptor([]);

        cy.mount(<App />);
        DefinitionCardPageFragment.accordionButton().click();
        DefinitionCardPageFragment.detailsButton().click();
        DefinitionDetailsPage.flightGroundTestPlanTab().click();
        DefinitionDetailsPage.testHazardAnalysisTab().click();

        cy.findByText("No test hazards. Please add the related information.").should("be.visible");
    });

    it("should display a list of test hazard assessments", () => {
        getAssignedTestHazardAssessmentsInterceptor(testHazardAssessments);

        cy.mount(<App />);
        DefinitionCardPageFragment.accordionButton().click();
        DefinitionCardPageFragment.detailsButton().click();
        DefinitionDetailsPage.flightGroundTestPlanTab().click();
        DefinitionDetailsPage.testHazardAnalysisTab().click();

        cy.findByRole("list", { name: "Test Hazard Assessments" }).within(() => {
            cy.findByText(firstTHA.hazard).should("be.visible");
            cy.findByText(secondTHA.hazard).should("be.visible");
            cy.findAllByText("High").should("have.length", 1);
            cy.findAllByText("Medium").should("have.length", 3);
        });
    });

    it("should allow user to add and remove test hazard assessments", () => {
        const definition = anyDefinition({ highestRiskLevel: "HIGH" });
        assignTestHazardAssessmentsInterceptor();
        unassignTestHazardAssessmentsInterceptor();
        getAllTestHazardAssessmentsInterceptor(testHazardAssessments);
        getAssignedTestHazardAssessmentsInterceptor([firstTHA]);
        getDefinitionInterceptorV2(definition);

        cy.mount(<App />);
        DefinitionCardPageFragment.accordionButton().click();
        DefinitionCardPageFragment.detailsButton().click();
        DefinitionDetailsPage.flightGroundTestPlanTab().click();
        DefinitionDetailsPage.testHazardAnalysisTab().click();

        cy.findByRole("status", { name: "Highest Risk Level description" }).should("have.text", "High");
        cy.findByText(firstTHA.hazard).should("be.visible");
        cy.findByText(secondTHA.hazard).should("not.exist");

        // Open modal
        SafetyReviewBoardSection.editButton().click();

        // Check that only the first test hazard assessment is selected in the search results
        cy.findByText("All (2)").should("be.visible");
        cy.findByRole("list", { name: "Test Hazard Assessments Search Results" }).within(() => {
            cy.findAllByRole("listitem", { name: firstTHA.hazard }).should("have.length", 1);
            cy.findAllByRole("checkbox", { name: `Unselect "${firstTHA.hazard}"` }).should("have.length", 1);
            cy.findAllByRole("listitem", { name: secondTHA.hazard }).should("have.length", 1);
            cy.findAllByRole("checkbox", { name: `Select "${secondTHA.hazard}"` }).should("have.length", 1);
        });

        // Check that only the first test hazard assessment is selected in the selected list
        cy.findByText("Selected (1)").should("be.visible");
        cy.findByRole("list", { name: "Selected Test Hazard Assessments" }).within(() => {
            cy.findAllByRole("listitem", { name: firstTHA.hazard }).should("have.length", 1);
            cy.findAllByRole("checkbox", { name: `Unselect "${firstTHA.hazard}"` }).should("have.length", 1);
            cy.findAllByRole("listitem", { name: secondTHA.hazard }).should("have.length", 0);
        });

        // Unselect the first test hazard assessment
        cy.findByRole("list", { name: "Selected Test Hazard Assessments" }).within(() => {
            cy.findAllByRole("checkbox", { name: `Unselect "${firstTHA.hazard}"` }).uncheck({ force: true });
        });
        // Check that there are no test hazard assessments selected
        cy.findByText("Selected (0)").should("be.visible");

        // Check that there are no test hazard assessments selected in the search results
        cy.findByRole("list", { name: "Test Hazard Assessments Search Results" }).within(() => {
            cy.findAllByRole("listitem", { name: firstTHA.hazard }).should("have.length", 1);
            cy.findAllByRole("checkbox", { name: `Select "${firstTHA.hazard}"` }).should("have.length", 1);
            cy.findAllByRole("listitem", { name: secondTHA.hazard }).should("have.length", 1);
            cy.findAllByRole("checkbox", { name: `Select "${secondTHA.hazard}"` }).should("have.length", 1);
        });

        // Select the second test hazard assessment
        cy.findByRole("list", { name: "Test Hazard Assessments Search Results" }).within(() => {
            cy.findAllByRole("checkbox", { name: `Select "${secondTHA.hazard}"` }).check({ force: true });
        });
        cy.findByText("Selected (1)").should("be.visible");

        // Check that the second test hazard assessment is selected in the search results, and that the first isn't
        cy.findByRole("list", { name: "Test Hazard Assessments Search Results" }).within(() => {
            cy.findAllByRole("checkbox", { name: `Select "${firstTHA.hazard}"` }).should("have.length", 1);
            cy.findAllByRole("checkbox", { name: `Unselect "${secondTHA.hazard}"` }).should("have.length", 1);
        });

        // Check that the second test hazard assessment is selected in the selected list, and that the first isn't
        cy.findByRole("list", { name: "Selected Test Hazard Assessments" }).within(() => {
            cy.findAllByRole("listitem", { name: firstTHA.hazard }).should("have.length", 0);
            cy.findAllByRole("listitem", { name: secondTHA.hazard }).should("have.length", 1);
            cy.findAllByRole("checkbox", { name: `Unselect "${secondTHA.hazard}"` }).should("have.length", 1);
        });

        getAssignedTestHazardAssessmentsInterceptor([secondTHA]);
        getDefinitionInterceptorV2({ ...definition, highestRiskLevel: "MEDIUM" });
        SafetyReviewBoardModal.doneButton().click({ force: true });
        // Make sure that the modal is closed before looking for the text in the UI.
        SafetyReviewBoardModal.doneButton().should("not.exist");
        cy.wait("@getDefinitionV2");

        cy.findByRole("status", { name: "Highest Risk Level description" }).should("have.text", "Medium");
        cy.findByText(firstTHA.hazard).should("not.exist");
        cy.findByText(secondTHA.hazard).should("be.visible");
    });

    it("should allow user to add and edit additional comments", () => {
        const definition = anyDefinition({ safetyReviewComments: undefined });
        getDefinitionInterceptorV2(definition);
        updateDefinitionInterceptorV2();
        getAllProceduresInterceptor();

        cy.mount(<App />);
        DefinitionCardPageFragment.accordionButton().click();
        DefinitionCardPageFragment.detailsButton().click();
        DefinitionDetailsPage.flightGroundTestPlanTab().click();
        DefinitionDetailsPage.testHazardAnalysisTab().click();

        cy.findByText("No additional comments. Please add the related information.").should("be.visible");

        // Add additional comments
        const safetyReviewComments = "Safety Review Comments";
        getDefinitionInterceptorV2({ ...definition, safetyReviewComments });
        AdditionalCommentsSection.editButton().click();
        AdditionalCommentsModal.additionalCommentsTextEditor().type(safetyReviewComments);
        AdditionalCommentsModal.doneButton().click({ force: true });
        // Make sure that the modal is closed before looking for the text in the UI.
        AdditionalCommentsModal.doneButton().should("not.exist");

        cy.wait("@patchDefinitionV2").its("request.body.safetyReviewComments").should("contain", safetyReviewComments);
        cy.wait("@getDefinitionV2");

        cy.findByText(safetyReviewComments).should("be.visible");

        // Edit existing additional comments
        const newSafetyReviewComments = "New Safety Review Comments";
        getDefinitionInterceptorV2({ ...definition, safetyReviewComments: newSafetyReviewComments });
        AdditionalCommentsSection.editButton().click();
        AdditionalCommentsModal.additionalCommentsTextEditor().clear().type(newSafetyReviewComments);
        AdditionalCommentsModal.doneButton().click({ force: true });
        // Make sure that the modal is closed before looking for the text in the UI.
        AdditionalCommentsModal.doneButton().should("not.exist");

        cy.wait("@patchDefinitionV2")
            .its("request.body.safetyReviewComments")
            .should("contain", newSafetyReviewComments);
        cy.wait("@getDefinitionV2");

        cy.findByText(newSafetyReviewComments).should("be.visible");
    });
});
