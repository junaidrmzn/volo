import { v4 as uuidV4 } from "uuid";
import { LocalFeatureFlagsProvider } from "@voloiq/feature-flags";
import { anyTestPoint, anyTestPointAttempt, anyTestPointGroup } from "@voloiq/flight-test-definition-api/v2";
import { AppWithoutProvider as App } from "../../src/App";
import {
    getAllTestPointGroupsV2Interceptor,
    updateTestPointAttemptV2Interceptor,
} from "../interceptors/testPointInterceptors";
import { TestPointAttemptModalPage } from "../pages/test-point-overview/TestPointAttemptModalPageObject";
import { TestPointOverviewPage } from "../pages/test-point-overview/testPointOverviewPageObjects";
import { Select } from "../pages/utils/select";

describe("Test Point App", () => {
    beforeEach(() => {
        getAllTestPointGroupsV2Interceptor();
    });

    it("User can view the test point overview", () => {
        const testTestPoint = {
            id: uuidV4(),
            attempts: [anyTestPointAttempt()],
            procedureId: uuidV4(),
            definitionId: uuidV4(),
            testPointId: "testPointId",
            testPointParameters: [
                {
                    id: uuidV4(),
                    name: "testPointParameters",
                    unit: "K",
                    value: "value",
                },
            ],
            isApplicableForDevelopment: true,
            isApplicableForCertification: false,
            isApplicableForAgency: false,
            isApplicableForBuildUp: false,
            isApplicableForUnassigned: false,
            grossWeight: "23",
            centerOfGravity: "-1",
            comments: "testComment",
            createTime: "",
            updateTime: "",
        };

        const testProcedure = {
            procedureId: "testProcedureId",
            procedureTitle: "testprocedureTitle",
            testPoints: [testTestPoint],
        };
        const testDefinition = {
            definitionId: "testDefinitionId",
            procedures: [testProcedure],
        };
        const testTestPointGroup = anyTestPointGroup({
            id: "testId",
            definitions: [testDefinition],
        });
        getAllTestPointGroupsV2Interceptor([testTestPointGroup]);

        cy.mountTestPoint(
            <LocalFeatureFlagsProvider configurationOverride={{ "vte-1542": { enabled: true } }}>
                <App />
            </LocalFeatureFlagsProvider>
        );

        cy.findByText(testDefinition.definitionId).should("be.visible");
        cy.findByText(testProcedure.procedureTitle, { exact: false }).should("be.visible");
        cy.findByText(testTestPoint.testPointId).should("be.visible");
    });

    it("User can view the test point attempts", () => {
        const testTestPointAttempt = anyTestPointAttempt();

        const testTestPoint = anyTestPoint();

        const testProcedure = {
            procedureId: "testProcedureId",
            procedureTitle: "testprocedureTitle",
            testPoints: [testTestPoint],
        };
        const testDefinition = {
            definitionId: "testDefinitionId",
            procedures: [testProcedure],
        };
        const testTestPointGroup = anyTestPointGroup({
            id: "testId",
            definitions: [testDefinition],
        });
        getAllTestPointGroupsV2Interceptor([testTestPointGroup]);

        cy.mountTestPoint(
            <LocalFeatureFlagsProvider configurationOverride={{ "vte-1542": { enabled: true } }}>
                <App />
            </LocalFeatureFlagsProvider>
        );

        TestPointOverviewPage.ExpandCardButton().click();

        cy.findByText(testTestPointAttempt.ftoId);
    });

    it("User can update an attempt", () => {
        updateTestPointAttemptV2Interceptor();

        cy.mountTestPoint(
            <LocalFeatureFlagsProvider configurationOverride={{ "vte-1542": { enabled: true } }}>
                <App />
            </LocalFeatureFlagsProvider>
        );

        TestPointOverviewPage.ExpandCardButton().click();
        TestPointOverviewPage.EditTestPointAttemptsButton().click();
        TestPointOverviewPage.EditTestPointAttemptsStatusButton(1).click();

        Select.selectByOptionName("Flight Test Status", "Data Analysis");
        Select.selectByOptionName("Test Point Engineering Status", "Not Accepted");
        TestPointAttemptModalPage.submitButton().click();
        cy.wait("@updateTestPointAttemptV2");
    });
});
