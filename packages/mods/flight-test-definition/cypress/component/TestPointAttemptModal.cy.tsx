import { anyTestPointAttempt } from "@voloiq/flight-test-definition-api/v1";
import { TestPointAttemptModalForm } from "../../src/test-point-overview/test-point-attempt-modal/test-point-attempt-modal-form/TestPointAttemptModalForm";
import { TestPointAttemptModalPage } from "../pages/test-point-overview/TestPointAttemptModalPageObject";
import { DateTimePicker } from "../pages/utils/datepicker";
import { Select } from "../pages/utils/select";

describe("Test PointAttempt Modal Form", () => {
    beforeEach(() => {});

    it("The user can edit only the status options of a existing test point", () => {
        cy.mountTestPoint(
            <TestPointAttemptModalForm
                testPointAttempt={anyTestPointAttempt({ engineeringAction: undefined, engineeringStatus: undefined })}
                onSubmit={() => {}}
                onClose={() => {}}
            />
        );

        TestPointAttemptModalPage.ftoInput().should("be.disabled");
        TestPointAttemptModalPage.dateInput().should("be.disabled");
        TestPointAttemptModalPage.planningStatusSelect().should("be.enabled");
        TestPointAttemptModalPage.flightStatusSelect().should("be.enabled");
        TestPointAttemptModalPage.flightTestFlightTestStatusSelect().should("be.enabled");
        TestPointAttemptModalPage.engineeringStatusSelect().should("be.enabled");
        TestPointAttemptModalPage.engineeringActionSelect().should("be.enabled");
    });

    it("The user can enter data to create a new Test Point", () => {
        cy.mountTestPoint(<TestPointAttemptModalForm onSubmit={() => {}} onClose={() => {}} />);

        TestPointAttemptModalPage.ftoInput().should("be.enabled").should("be.empty");
        TestPointAttemptModalPage.dateInput().should("be.enabled").should("be.empty");
        TestPointAttemptModalPage.planningStatusSelect().should("be.disabled");
        TestPointAttemptModalPage.flightStatusSelect().should("be.disabled");
        TestPointAttemptModalPage.flightTestFlightTestStatusSelect().should("be.disabled");
        TestPointAttemptModalPage.engineeringStatusSelect().should("be.disabled");
        TestPointAttemptModalPage.engineeringActionSelect().should("be.disabled");
    });

    it("The user can only change any status if a fto and date are entered", () => {
        cy.mountTestPoint(<TestPointAttemptModalForm onSubmit={() => {}} onClose={() => {}} />);

        TestPointAttemptModalPage.ftoInput().should("be.enabled").should("be.empty");
        TestPointAttemptModalPage.dateInput().should("be.enabled").should("be.empty");
        TestPointAttemptModalPage.planningStatusSelect().should("be.disabled");
        TestPointAttemptModalPage.flightStatusSelect().should("be.disabled");
        TestPointAttemptModalPage.flightTestFlightTestStatusSelect().should("be.disabled");
        TestPointAttemptModalPage.engineeringStatusSelect().should("be.disabled");
        TestPointAttemptModalPage.engineeringActionSelect().should("be.disabled");

        TestPointAttemptModalPage.ftoInput().type("fto-1");

        TestPointAttemptModalPage.ftoInput().should("be.enabled");
        TestPointAttemptModalPage.planningStatusSelect().should("be.disabled");
        TestPointAttemptModalPage.flightStatusSelect().should("be.disabled");
        TestPointAttemptModalPage.flightTestFlightTestStatusSelect().should("be.disabled");
        TestPointAttemptModalPage.engineeringStatusSelect().should("be.disabled");
        TestPointAttemptModalPage.engineeringActionSelect().should("be.disabled");

        TestPointAttemptModalPage.dateInput().click();
        DateTimePicker.selectDate(new Date());

        TestPointAttemptModalPage.planningStatusSelect().should("be.enabled");
        TestPointAttemptModalPage.flightStatusSelect().should("be.disabled");
        TestPointAttemptModalPage.flightTestFlightTestStatusSelect().should("be.disabled");
        TestPointAttemptModalPage.engineeringStatusSelect().should("be.disabled");
        TestPointAttemptModalPage.engineeringActionSelect().should("be.disabled");
    });

    it("The user can only change the flight status after setting planning status to Planned", () => {
        cy.mountTestPoint(<TestPointAttemptModalForm onSubmit={() => {}} onClose={() => {}} />);
        TestPointAttemptModalPage.ftoInput().type("fto-1");
        TestPointAttemptModalPage.dateInput().click();
        DateTimePicker.selectDate(new Date());

        TestPointAttemptModalPage.planningStatusSelect().should("be.enabled");
        TestPointAttemptModalPage.flightStatusSelect().should("be.disabled");
        TestPointAttemptModalPage.flightTestFlightTestStatusSelect().should("be.disabled");
        TestPointAttemptModalPage.engineeringStatusSelect().should("be.disabled");
        TestPointAttemptModalPage.engineeringActionSelect().should("be.disabled");

        Select.selectByOptionName("Planning Status", "READY");
        TestPointAttemptModalPage.flightStatusSelect().should("be.disabled");

        Select.selectByOptionName("Planning Status", "IN WORK");
        TestPointAttemptModalPage.flightStatusSelect().should("be.disabled");

        Select.selectByOptionName("Planning Status", "PLANNED");
        TestPointAttemptModalPage.flightStatusSelect().should("be.enabled");
    });

    it("The user can only change the flight test evaluation status after setting flight status to Executed", () => {
        cy.mountTestPoint(<TestPointAttemptModalForm onSubmit={() => {}} onClose={() => {}} />);
        TestPointAttemptModalPage.ftoInput().type("fto-1");
        TestPointAttemptModalPage.dateInput().click();
        DateTimePicker.selectDate(new Date());
        Select.selectByOptionName("Planning Status", "PLANNED");

        TestPointAttemptModalPage.flightStatusSelect().should("be.enabled");
        TestPointAttemptModalPage.flightTestFlightTestStatusSelect().should("be.disabled");
        TestPointAttemptModalPage.engineeringStatusSelect().should("be.disabled");
        TestPointAttemptModalPage.engineeringActionSelect().should("be.enabled");

        Select.selectByOptionName("Flight Status", "ATTEMPTED");
        TestPointAttemptModalPage.flightTestFlightTestStatusSelect().should("be.disabled");

        Select.selectByOptionName("Flight Status", "NOT EXECUTED");
        TestPointAttemptModalPage.flightTestFlightTestStatusSelect().should("be.disabled");

        Select.selectByOptionName("Flight Status", "EXECUTED");
        TestPointAttemptModalPage.flightTestFlightTestStatusSelect().should("be.enabled");
    });

    it("The user can only change the engineering status after setting flight test evaluation status to Passed or Data Analysis", () => {
        cy.mountTestPoint(<TestPointAttemptModalForm onSubmit={() => {}} onClose={() => {}} />);
        TestPointAttemptModalPage.ftoInput().type("fto-1");
        TestPointAttemptModalPage.dateInput().click();
        DateTimePicker.selectDate(new Date());
        Select.selectByOptionName("Planning Status", "PLANNED");
        Select.selectByOptionName("Flight Status", "EXECUTED");

        TestPointAttemptModalPage.flightTestFlightTestStatusSelect().should("be.enabled");
        TestPointAttemptModalPage.engineeringStatusSelect().should("be.disabled");
        TestPointAttemptModalPage.engineeringActionSelect().should("be.enabled");

        Select.selectByOptionName("Flight Test Evaluation Status", "FAIL");
        TestPointAttemptModalPage.engineeringStatusSelect().should("be.disabled");

        Select.selectByOptionName("Flight Test Evaluation Status", "PASS");
        TestPointAttemptModalPage.engineeringStatusSelect().should("be.enabled");

        Select.selectByOptionName("Flight Test Evaluation Status", "DATA ANALYSIS");
        TestPointAttemptModalPage.flightTestFlightTestStatusSelect().should("be.enabled");
    });

    it("The user can only change the engineering action after setting engineering action to Not Accepted", () => {
        cy.mountTestPoint(<TestPointAttemptModalForm onSubmit={() => {}} onClose={() => {}} />);
        TestPointAttemptModalPage.ftoInput().type("fto-1");
        TestPointAttemptModalPage.dateInput().click();
        DateTimePicker.selectDate(new Date());
        Select.selectByOptionName("Planning Status", "PLANNED");
        Select.selectByOptionName("Flight Status", "EXECUTED");
        Select.selectByOptionName("Flight Test Evaluation Status", "PASS");

        TestPointAttemptModalPage.engineeringStatusSelect().should("be.enabled");
        TestPointAttemptModalPage.engineeringActionSelect().should("be.enabled");

        Select.selectByOptionName("Engineering Status", "COMPLETED - FAIL");
        TestPointAttemptModalPage.engineeringActionSelect().should("be.enabled");

        Select.selectByOptionName("Engineering Status", "COMPLETED - PASS");
        TestPointAttemptModalPage.engineeringActionSelect().should("be.enabled");

        Select.selectByOptionName("Engineering Status", "NOT ACCEPTED");
        TestPointAttemptModalPage.flightTestFlightTestStatusSelect().should("be.enabled");
    });

    it("When the planning status is reset to undefined, all other status values are reset as well.", () => {
        cy.mountTestPoint(<TestPointAttemptModalForm onSubmit={() => {}} onClose={() => {}} />);
        TestPointAttemptModalPage.ftoInput().type("fto-1");
        TestPointAttemptModalPage.dateInput().click();
        DateTimePicker.selectDate(new Date());
        Select.selectByOptionName("Planning Status", "PLANNED");
        Select.selectByOptionName("Flight Status", "EXECUTED");
        Select.selectByOptionName("Flight Test Evaluation Status", "PASS");
        Select.selectByOptionName("Engineering Status", "NOT ACCEPTED");
        Select.selectByOptionName("Engineering Action", "CANCEL");

        Select.selectByOptionName("Planning Status", "None");

        TestPointAttemptModalPage.planningStatusSelect().should("be.empty");
        TestPointAttemptModalPage.flightStatusSelect().should("be.empty");
        TestPointAttemptModalPage.flightTestFlightTestStatusSelect().should("be.empty");
        TestPointAttemptModalPage.engineeringStatusSelect().should("be.empty");
        TestPointAttemptModalPage.engineeringActionSelect().should("be.empty");
    });

    it("An existing test point attempt is submitted with only the intended changes", () => {
        const onSubmitStub = cy.stub({ onSubmit: () => {} }, "onSubmit").as("onSubmit");
        const testPointAttempt = anyTestPointAttempt({ engineeringStatus: "NOT ACCEPTED" });

        cy.mountTestPoint(
            <TestPointAttemptModalForm onSubmit={onSubmitStub} onClose={() => {}} testPointAttempt={testPointAttempt} />
        );

        Select.selectByOptionName("Engineering Action", "CANCEL");
        TestPointAttemptModalPage.submitButton().click();

        cy.get("@onSubmit").should("have.been.calledOnce");
        cy.get("@onSubmit").should("have.been.calledWith", { ...testPointAttempt, engineeringAction: "CANCEL" });
    });

    it("Resetting plannings status will in submit return all status values as undefined", () => {
        const onSubmitStub = cy.stub({ onSubmit: () => {} }, "onSubmit").as("onSubmit");
        const testPointAttempt = anyTestPointAttempt();

        cy.mountTestPoint(
            <TestPointAttemptModalForm onSubmit={onSubmitStub} onClose={() => {}} testPointAttempt={testPointAttempt} />
        );

        Select.selectByOptionName("Planning Status", "None");
        TestPointAttemptModalPage.submitButton().click();

        cy.get("@onSubmit").should("have.been.calledOnce");
        cy.get("@onSubmit").should("have.been.calledWith", {
            ...testPointAttempt,
            engineeringAction: undefined,
            engineeringStatus: undefined,
            flightTestStatus: undefined,
            flightStatus: undefined,
            planningStatus: undefined,
        });
    });

    it("The user can create a new test point attempt", () => {
        const onSubmitStub = cy.stub({ onSubmit: () => {} }, "onSubmit").as("onSubmit");
        const testPointDate = new Date();
        cy.mountTestPoint(<TestPointAttemptModalForm onSubmit={onSubmitStub} onClose={() => {}} />);

        TestPointAttemptModalPage.ftoInput().type("fto-1");
        TestPointAttemptModalPage.dateInput().click();
        DateTimePicker.selectDate(testPointDate);
        TestPointAttemptModalPage.dateInput().click();

        Select.selectByOptionName("Planning Status", "PLANNED");
        Select.selectByOptionName("Flight Status", "EXECUTED");
        TestPointAttemptModalPage.submitButton().click();

        cy.get("@onSubmit").should("have.been.calledOnce");
        cy.get("@onSubmit").should("have.been.calledWith", {
            ftoId: "fto-1",
            date: testPointDate.toISOString().split("T")[0],
            planningStatus: "PLANNED",
            flightStatus: "EXECUTED",
        });
    });

    it("When the planning status is set to 'in work', all other status values are reset to undefined.", () => {
        const onSubmitStub = cy.stub({ onSubmit: () => {} }, "onSubmit").as("onSubmit");
        const testPointAttempt = anyTestPointAttempt();
        cy.mountTestPoint(
            <TestPointAttemptModalForm onSubmit={onSubmitStub} testPointAttempt={testPointAttempt} onClose={() => {}} />
        );

        Select.selectByOptionName("Planning Status", "IN WORK");

        TestPointAttemptModalPage.submitButton().click();

        cy.get("@onSubmit").should("have.been.calledWith", {
            ...testPointAttempt,
            engineeringAction: undefined,
            engineeringStatus: undefined,
            flightTestStatus: undefined,
            flightStatus: undefined,
            planningStatus: "IN WORK",
        });
    });

    it("When the planning status is set to 'not executed', all following status values are reset to undefined.", () => {
        const onSubmitStub = cy.stub({ onSubmit: () => {} }, "onSubmit").as("onSubmit");
        const testPointAttempt = anyTestPointAttempt();
        cy.mountTestPoint(
            <TestPointAttemptModalForm onSubmit={onSubmitStub} testPointAttempt={testPointAttempt} onClose={() => {}} />
        );

        Select.selectByOptionName("Flight Status", "NOT EXECUTED");

        TestPointAttemptModalPage.submitButton().click();

        cy.get("@onSubmit").should("have.been.calledWith", {
            ...testPointAttempt,
            engineeringAction: undefined,
            engineeringStatus: undefined,
            flightTestStatus: undefined,
            flightStatus: "NOT EXECUTED",
            planningStatus: "PLANNED",
        });
    });

    it("When the flight test evaluation status is set to 'Fail', all following status values are reset to undefined.", () => {
        const onSubmitStub = cy.stub({ onSubmit: () => {} }, "onSubmit").as("onSubmit");
        const testPointAttempt = anyTestPointAttempt();
        cy.mountTestPoint(
            <TestPointAttemptModalForm onSubmit={onSubmitStub} testPointAttempt={testPointAttempt} onClose={() => {}} />
        );

        Select.selectByOptionName("Flight Test Evaluation Status", "FAIL");

        TestPointAttemptModalPage.submitButton().click();

        cy.get("@onSubmit").should("have.been.calledWith", {
            ...testPointAttempt,
            engineeringAction: undefined,
            engineeringStatus: undefined,
            flightTestStatus: "FAIL",
            flightStatus: "EXECUTED",
            planningStatus: "PLANNED",
        });
    });

    it("When the engineering status is set to 'completed - fail', all following status values are reset to undefined.", () => {
        const onSubmitStub = cy.stub({ onSubmit: () => {} }, "onSubmit").as("onSubmit");
        const testPointAttempt = anyTestPointAttempt({ engineeringStatus: "COMPLETED - PASS" });
        cy.mountTestPoint(
            <TestPointAttemptModalForm onSubmit={onSubmitStub} testPointAttempt={testPointAttempt} onClose={() => {}} />
        );

        Select.selectByOptionName("Engineering Status", "COMPLETED - FAIL");

        TestPointAttemptModalPage.submitButton().click();

        cy.get("@onSubmit").should("have.been.calledWith", {
            ...testPointAttempt,
            engineeringAction: undefined,
            engineeringStatus: "COMPLETED - FAIL",
            flightTestStatus: "PASS",
            flightStatus: "EXECUTED",
            planningStatus: "PLANNED",
        });
    });
});
