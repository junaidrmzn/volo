import { v4 as uuidV4 } from "uuid";
import { LocalFeatureFlagsProvider } from "@voloiq/feature-flags";
import { anyTestPoint, anyTestPointAttempt, anyTestPointGroup } from "@voloiq/flight-test-definition-api/v1";
import { AppWithoutProvider as App } from "../../src/App";
import {
    createTestPointAttemptInterceptor,
    getAllTestPointGroupsInterceptor,
    updateTestPointAttemptInterceptor,
} from "../interceptors/testPointInterceptors";
import { TestPointAttemptModalPage } from "../pages/test-point-overview/TestPointAttemptModalPageObject";
import { TestPointOverviewPage } from "../pages/test-point-overview/testPointOverviewPageObjects";
import { DateTimePicker } from "../pages/utils/datepicker";
import { Select } from "../pages/utils/select";

describe("App", () => {
    beforeEach(() => {
        getAllTestPointGroupsInterceptor();
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
        getAllTestPointGroupsInterceptor([testTestPointGroup]);

        cy.mountTestPoint(
            <LocalFeatureFlagsProvider configurationOverride={{ "vte-1542": { enabled: false } }}>
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
        getAllTestPointGroupsInterceptor([testTestPointGroup]);

        cy.mountTestPoint(
            <LocalFeatureFlagsProvider configurationOverride={{ "vte-1542": { enabled: false } }}>
                <App />
            </LocalFeatureFlagsProvider>
        );

        TestPointOverviewPage.ExpandCardButton().click();

        cy.findByText(testTestPointAttempt.ftoId);
    });

    it("User can create and update an attempt", () => {
        const testTestPoint = anyTestPoint({
            attempts: [anyTestPointAttempt({ ftoId: "FTO-123" }), anyTestPointAttempt({ ftoId: "FTO-456" })],
        });
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
        getAllTestPointGroupsInterceptor([testTestPointGroup]);
        createTestPointAttemptInterceptor({
            ftoId: "fto-1",
            flightStatus: "EXECUTED",
            date: new Date().toISOString().split("T")[0],
        });
        updateTestPointAttemptInterceptor();

        cy.mountTestPoint(
            <LocalFeatureFlagsProvider configurationOverride={{ "vte-1542": { enabled: false } }}>
                <App />
            </LocalFeatureFlagsProvider>
        );

        TestPointOverviewPage.ExpandCardButton().click();
        TestPointOverviewPage.EditTestPointAttemptsButton().click();
        TestPointOverviewPage.EditTestPointAttemptsStatusButton(1).click();

        Select.selectByOptionName("Planning Status", "Ready");
        Select.selectByOptionName("Flight Status", "Attempted");
        TestPointAttemptModalPage.submitButton().click();
        cy.wait("@updateTestPointAttempt");

        TestPointOverviewPage.LinkNewFTOButton().click();

        TestPointAttemptModalPage.ftoInput().type("fto-1");
        TestPointAttemptModalPage.dateInput().click();
        const testPointDate = new Date();
        DateTimePicker.selectDate(testPointDate);
        TestPointAttemptModalPage.dateInput().click();

        Select.selectByOptionName("Flight Status", "Executed");
        TestPointAttemptModalPage.submitButton().click();
        cy.wait("@createTestPointAttempt").its("request.body").should("contain", {
            ftoId: "fto-1",
            flightStatus: "EXECUTED",
        });
    });
});
