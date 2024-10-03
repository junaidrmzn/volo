import { anyTestPointAttempt } from "@voloiq/flight-test-definition-api/v2";
import { TestPointAttemptModalFormV2 } from "../../src/test-point-overview/test-point-attempt-modal-v2/test-point-attempt-modal-form-v2/TestPointAttemptModalFormV2";
import { TestPointAttemptModalV2Page } from "../pages/test-point-overview/TestPointAttemptModalPageObject";

describe("Test PointAttempt Modal Form V2", () => {
    beforeEach(() => {});

    it("The user can change Flight Test Status only when Processing Status is Executed", () => {
        cy.mountTestPoint(
            <TestPointAttemptModalFormV2
                testPointAttempt={anyTestPointAttempt({
                    engineeringAction: undefined,
                    engineeringStatus: undefined,
                    flightTestStatus: "FAIL",
                    processingStatus: "LINKED",
                })}
                onSubmit={() => {}}
                onClose={() => {}}
            />
        );

        TestPointAttemptModalV2Page.flightTestFlightTestStatusSelect().should("be.disabled");
        TestPointAttemptModalV2Page.engineeringStatusSelect().should("be.disabled");
        TestPointAttemptModalV2Page.engineeringActionSelect().should("be.disabled");
    });

    it("The user can change Test Point Engineering Status only when Flight Test Status is Pass", () => {
        cy.mountTestPoint(
            <TestPointAttemptModalFormV2
                testPointAttempt={anyTestPointAttempt({
                    engineeringAction: undefined,
                    engineeringStatus: undefined,
                    flightTestStatus: "PASS",
                    processingStatus: "EXECUTED",
                })}
                onSubmit={() => {}}
                onClose={() => {}}
            />
        );

        TestPointAttemptModalV2Page.engineeringStatusSelect().should("be.enabled");
        TestPointAttemptModalV2Page.engineeringActionSelect().should("be.disabled");
    });

    it("The user can change Test Point Engineering Action only when Test Point Engineering Status is Not Accepted", () => {
        cy.mountTestPoint(
            <TestPointAttemptModalFormV2
                testPointAttempt={anyTestPointAttempt({
                    engineeringAction: undefined,
                    engineeringStatus: "NOT ACCEPTED",
                    flightTestStatus: "PASS",
                    processingStatus: "EXECUTED",
                })}
                onSubmit={() => {}}
                onClose={() => {}}
            />
        );

        TestPointAttemptModalV2Page.engineeringStatusSelect().should("be.enabled");
        TestPointAttemptModalV2Page.engineeringActionSelect().should("be.enabled");
    });
});
