import { anyTestHazardAssessment } from "@voloiq/flight-test-definition-api/v1";
import { TestHazardAssessmentOverview } from "../../src/test-hazard-analysis-overview/TestHazardAssessmentOverview";
import {
    createTestHazardAssessmentInterceptor,
    getAllTestHazardAssessmentsInterceptor,
    getTestHazardAssessmentInterceptor,
    patchTestHazardAssessmentInterceptor,
    softDeleteTestHazardAssessmentInterceptor,
} from "../interceptors/testHazardAssessmentsInterceptors";
import { TestHazardAssessmentPage } from "../pages/test-hazard-analysis-overview/TestHazardAssessmentPageObjects";
import { TestHazardAssessmentStepsObject } from "../steps/testHazardAssessmentStepsObject";

describe("TestHazards", () => {
    beforeEach(() => {
        getAllTestHazardAssessmentsInterceptor();
    });

    it("User can see a list of all test hazard assessments and its preview", () => {
        const testHazard = anyTestHazardAssessment();
        cy.mount(<TestHazardAssessmentOverview />);
        TestHazardAssessmentPage.testHazardTitle(testHazard.hazard).should("be.visible");
        getTestHazardAssessmentInterceptor();

        TestHazardAssessmentPage.testHazardTitle(testHazard.hazard).click();
        TestHazardAssessmentPage.previewSidePanel().should("be.visible");
    });

    it("User can create a new test hazard assessment", () => {
        const testHazard = anyTestHazardAssessment();
        cy.mount(<TestHazardAssessmentOverview />);
        TestHazardAssessmentPage.testHazardTitle(testHazard.hazard).should("be.visible");
        getTestHazardAssessmentInterceptor();

        cy.findByRole("button", { name: "Add" }).click();
        createTestHazardAssessmentInterceptor();
        TestHazardAssessmentStepsObject.addTestHazardAssessment({
            applicability: testHazard.applicability,
            hazard: testHazard.hazard,
            residualRiskLevel: "LOW",
            preMitigationRiskLevel: "LOW",
            hazardGroup: "Generic Hazards",
        });
    });

    it("User can edit an existing test hazard assessment", () => {
        const testHazard = anyTestHazardAssessment();
        cy.mount(<TestHazardAssessmentOverview />);
        TestHazardAssessmentPage.testHazardTitle(testHazard.hazard).should("be.visible");
        getTestHazardAssessmentInterceptor();

        TestHazardAssessmentPage.testHazardTitle(testHazard.hazard).click();
        cy.findByRole("button", { name: "Edit" }).click();
        patchTestHazardAssessmentInterceptor();
        TestHazardAssessmentStepsObject.editTestHazardAssessment({
            residualRiskLevel: "Medium",
        });
    });

    it("User can edit an existing test hazard assessment with initially no linked definitions", () => {
        const testHazard = anyTestHazardAssessment({ linkedDefinitions: [] });
        cy.mount(<TestHazardAssessmentOverview />);
        TestHazardAssessmentPage.testHazardTitle(testHazard.hazard).should("be.visible");
        getTestHazardAssessmentInterceptor(testHazard);

        TestHazardAssessmentPage.testHazardTitle(testHazard.hazard).click();
        softDeleteTestHazardAssessmentInterceptor();
        cy.findByRole("button", { name: "Set Inactive" }).click();
    });
});
