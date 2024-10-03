import { generateText } from "@volocopter/text-editor-react";
import { LocalFeatureFlagsProvider } from "@voloiq/feature-flags";
import {
    anyFlightTestOrder,
    anyProcedure,
    anyTestPoint,
    anyTestPointSequence,
    anyTestPointSequenceTestPointAssociation,
} from "@voloiq/flight-test-definition-api/v1";
import { anyDefinition } from "@voloiq/flight-test-definition-api/v2";
import { AppWithoutProvider as App } from "../../../../../src/App";
import { getAllDefinitionsInterceptor } from "../../../../interceptors/definitionsInterceptors";
import { getAllFlightTestCrewInterceptor } from "../../../../interceptors/flightTestCrewInterceptors";
import {
    getAllFlightTestOrdersInterceptor,
    getAllFlightTestOrdersV2Interceptor,
    getFlightTestOrderInterceptor,
    getFlightTestOrderV2Interceptor,
} from "../../../../interceptors/flightTestOrderInterceptors";
import { getAllProceduresInterceptor } from "../../../../interceptors/proceduresInterceptors";
import { getAllTestPointsOfProcedureInterceptor } from "../../../../interceptors/testPointInterceptors";
import {
    bulkCreateTestPointSequenceTestPointAssociationInterceptor,
    bulkCreateTestPointSequencesInterceptor,
    bulkDeleteTestPointSequenceTestPointAssociationInterceptor,
    bulkDeleteTestPointSequencesInterceptor,
    bulkUpdateTestPointSequencesInterceptor,
    getAllTestPointSequenceTestPointAssociationsInterceptor,
    getAllTestPointSequenceTestPointsInterceptor,
    getAllTestPointSequencesInterceptor,
    getTestPointSequenceInterceptor,
} from "../../../../interceptors/testPointSequenceInterceptors";
import { FlightTestOrderDetailsPage } from "../../../../pages/flight-test-order/flight-test-order-details/flightTestOrderDetailsPage";
import { TestPointSelectionTabFragment } from "../../../../pages/flight-test-order/flight-test-order-details/page-fragments/testPointSelectionTabFragment";
import { AddFromListModalFragment } from "../../../../pages/flight-test-order/flight-test-order-details/test-point-sequence-details/addFromListModalFragment";
import { TestPointSequenceDetailsPage } from "../../../../pages/flight-test-order/flight-test-order-details/test-point-sequence-details/testPointSequenceDetailsPage";
import { FlightTestOrderCardPageFragment } from "../../../../pages/flight-test-order/flight-test-order-overview/page-fragments/flightTestOrderCardPageFragment";
import { TestPointSelectionStepsObject } from "../../../../steps/testPointSelectionStepsObject";

beforeEach(() => {
    getAllFlightTestOrdersInterceptor([]);
    getFlightTestOrderInterceptor();
    getFlightTestOrderV2Interceptor();
    getAllFlightTestCrewInterceptor();
    getAllTestPointSequenceTestPointAssociationsInterceptor([]);
    getAllFlightTestOrdersV2Interceptor();
    getAllDefinitionsInterceptor([]);
    bulkCreateTestPointSequencesInterceptor();
    bulkUpdateTestPointSequencesInterceptor();
    bulkDeleteTestPointSequencesInterceptor();
    bulkCreateTestPointSequenceTestPointAssociationInterceptor();
    bulkDeleteTestPointSequenceTestPointAssociationInterceptor();
});

it("User can create test points sequences", () => {
    const testFlightTestOrder = anyFlightTestOrder();
    const testTestPointSequence = anyTestPointSequence();
    getAllFlightTestOrdersInterceptor([testFlightTestOrder]);
    getAllTestPointSequencesInterceptor([]);

    cy.mountFlightTestOrder(
        <LocalFeatureFlagsProvider
            configurationOverride={{
                "vte-1516": { enabled: true },
                "vte-1506": { enabled: false },
            }}
        >
            <App />
        </LocalFeatureFlagsProvider>
    );

    getFlightTestOrderInterceptor(testFlightTestOrder);
    FlightTestOrderCardPageFragment.detailsButton().click();
    FlightTestOrderDetailsPage.testPointSelectionTab().click();

    cy.findByText("No Test Points Sequence found. Please create a new sequence.").should("be.visible");
    TestPointSelectionTabFragment.editTestPointSequencesButton().click();

    getAllTestPointSequencesInterceptor([testTestPointSequence]);
    TestPointSelectionStepsObject.fillInTestPointSequenceModalFormAndSubmit(testTestPointSequence);

    cy.findAllByRole("button", { name: "Test Points Sequence #1" }).click();

    cy.findAllByText(testTestPointSequence.type).should("be.visible");
    cy.findAllByText(generateText(JSON.parse(testTestPointSequence.testPoint))).should("be.visible");
    cy.findAllByText(generateText(JSON.parse(testTestPointSequence.successCriteria))).should("be.visible");
});

it("User can create empty test points sequences", () => {
    const testFlightTestOrder = anyFlightTestOrder();
    const testTestPointSequence = anyTestPointSequence({ type: "", testPoint: "", successCriteria: "" });
    getAllFlightTestOrdersInterceptor([testFlightTestOrder]);
    getAllTestPointSequencesInterceptor([]);

    cy.mountFlightTestOrder(
        <LocalFeatureFlagsProvider
            configurationOverride={{
                "vte-1516": { enabled: true },
                "vte-1506": { enabled: false },
            }}
        >
            <App />
        </LocalFeatureFlagsProvider>
    );

    getFlightTestOrderInterceptor(testFlightTestOrder);
    FlightTestOrderCardPageFragment.detailsButton().click();
    FlightTestOrderDetailsPage.testPointSelectionTab().click();

    TestPointSelectionTabFragment.editTestPointSequencesButton().click();

    getAllTestPointSequencesInterceptor([testTestPointSequence]);
    TestPointSelectionStepsObject.submitEmptyForm();

    cy.findAllByRole("button", { name: "Test Points Sequence #1" }).click();
});

it("User can edit test points sequences", () => {
    const testFlightTestOrder = anyFlightTestOrder();
    const testTestPointSequence = anyTestPointSequence();
    const updatedTestTestPointSequence = anyTestPointSequence({ type: `${testTestPointSequence.type} (UPDATED)` });
    getAllFlightTestOrdersInterceptor([testFlightTestOrder]);
    getAllTestPointSequencesInterceptor([testFlightTestOrder]);

    cy.mountFlightTestOrder(
        <LocalFeatureFlagsProvider
            configurationOverride={{
                "vte-1516": { enabled: true },
                "vte-1506": { enabled: false },
            }}
        >
            <App />
        </LocalFeatureFlagsProvider>
    );

    getFlightTestOrderInterceptor(testFlightTestOrder);
    FlightTestOrderCardPageFragment.detailsButton().click();
    FlightTestOrderDetailsPage.testPointSelectionTab().click();

    TestPointSelectionTabFragment.editTestPointSequencesButton().click();

    getAllTestPointSequencesInterceptor([updatedTestTestPointSequence]);
    TestPointSelectionStepsObject.fillInTestPointSequenceModalFormAndSubmit(updatedTestTestPointSequence);

    cy.findAllByRole("button", { name: "Test Points Sequence #1" }).click();

    cy.findAllByText(updatedTestTestPointSequence.type).should("be.visible");
});

it("User can delete test points sequences", () => {
    const testFlightTestOrder = anyFlightTestOrder();
    const testTestPointSequence = anyTestPointSequence();
    getAllFlightTestOrdersInterceptor([testFlightTestOrder]);
    getAllTestPointSequencesInterceptor([testTestPointSequence]);

    cy.mountFlightTestOrder(
        <LocalFeatureFlagsProvider
            configurationOverride={{
                "vte-1516": { enabled: true },
                "vte-1506": { enabled: false },
            }}
        >
            <App />
        </LocalFeatureFlagsProvider>
    );

    getFlightTestOrderInterceptor(testFlightTestOrder);
    FlightTestOrderCardPageFragment.detailsButton().click();
    FlightTestOrderDetailsPage.testPointSelectionTab().click();

    TestPointSelectionTabFragment.editTestPointSequencesButton().click();

    getAllTestPointSequencesInterceptor([]);
    TestPointSelectionStepsObject.deleteFirstAndSubmit();

    cy.findAllByRole("button", { name: "Test Points Sequence #1" }).should("not.exist");
    TestPointSelectionTabFragment.editTestPointSequencesButton().should("be.visible");
});

it("User can add test points from modal", () => {
    const testFlightTestOrder = anyFlightTestOrder();
    const testTestPointSequence = anyTestPointSequence();
    getAllFlightTestOrdersInterceptor([testFlightTestOrder]);
    getAllTestPointSequencesInterceptor([testTestPointSequence]);
    getTestPointSequenceInterceptor(testTestPointSequence);
    getAllTestPointSequenceTestPointsInterceptor([]);

    cy.mountFlightTestOrder(
        <LocalFeatureFlagsProvider
            configurationOverride={{
                "vte-1516": { enabled: true },
                "vte-1506": { enabled: false },
            }}
        >
            <App />
        </LocalFeatureFlagsProvider>
    );

    getFlightTestOrderInterceptor(testFlightTestOrder);
    FlightTestOrderCardPageFragment.detailsButton().click();
    FlightTestOrderDetailsPage.testPointSelectionTab().click();
    TestPointSelectionTabFragment.detailsButton().click();
    TestPointSequenceDetailsPage.addFromListButton().click();

    getAllDefinitionsInterceptor([anyDefinition({ title: "Test Definition 1" })]);
    AddFromListModalFragment.searchInput().clear().type("Test Definition 1");
    cy.wait("@getAllDefinitions");

    getAllProceduresInterceptor([anyProcedure({ title: "Test Procedure 1" })]);
    AddFromListModalFragment.detailsButton().click();
    cy.wait("@getAllProcedures");

    const testPoint = anyTestPoint({ comments: "Test Point 1" });
    const testPointAssociation = anyTestPointSequenceTestPointAssociation({ testPointId: testPoint.testPointId });
    getAllTestPointsOfProcedureInterceptor([testPoint]);
    AddFromListModalFragment.procedureListItemExpandButton("Test Procedure 1").click();
    cy.wait("@getAllTestPointsOfProcedure");

    AddFromListModalFragment.testPointCheckbox().should("not.be.checked");
    AddFromListModalFragment.testPointCheckbox().check({ force: true });

    getAllTestPointSequenceTestPointAssociationsInterceptor([testPointAssociation]);
    AddFromListModalFragment.selectedTab(1).click();

    cy.findByText(testPoint.comments).should("be.visible");

    AddFromListModalFragment.doneButton().click();
    cy.wait("@bulkCreateTestPointSequenceTestPointAssociation");
    cy.wait("@getAllTestPointSequenceTestPointAssociations");

    TestPointSequenceDetailsPage.testPointField("testPointId").should("have.length", 1);
    TestPointSequenceDetailsPage.testPointRowField(0, "testPointId").should(
        "have.value",
        testPointAssociation.testPointId
    );
});

it("User can remove test points from modal", () => {
    const testFlightTestOrder = anyFlightTestOrder();
    const testTestPointSequence = anyTestPointSequence();
    getAllFlightTestOrdersInterceptor([testFlightTestOrder]);
    getAllTestPointSequencesInterceptor([testTestPointSequence]);
    getTestPointSequenceInterceptor(testTestPointSequence);

    cy.mountFlightTestOrder(
        <LocalFeatureFlagsProvider
            configurationOverride={{
                "vte-1516": { enabled: true },
                "vte-1506": { enabled: false },
            }}
        >
            <App />
        </LocalFeatureFlagsProvider>
    );

    const testPoint = anyTestPoint({ comments: "Test Point 1" });
    getFlightTestOrderInterceptor(testFlightTestOrder);
    getAllTestPointSequenceTestPointsInterceptor([testPoint]);

    FlightTestOrderCardPageFragment.detailsButton().click();
    FlightTestOrderDetailsPage.testPointSelectionTab().click();
    TestPointSelectionTabFragment.detailsButton().click();
    TestPointSequenceDetailsPage.addFromListButton().click();
    AddFromListModalFragment.selectedTab(1).click();

    AddFromListModalFragment.testPointCheckbox().uncheck({ force: true });

    cy.findByText("Selected (0)").should("be.visible");

    getAllTestPointSequenceTestPointAssociationsInterceptor([]);

    AddFromListModalFragment.doneButton().click();
    cy.wait("@bulkDeleteTestPointSequenceTestPointAssociation");
    cy.wait("@getAllTestPointSequenceTestPointAssociations");

    cy.findByText("No Test Points found. Please add from the list.").should("be.visible");
    cy.findByText(testPoint.testPointId).should("not.exist");
});

it("User can select test points that are in status WORK or CANCELLED", () => {
    const testFlightTestOrder = anyFlightTestOrder();
    const testTestPointSequence = anyTestPointSequence();
    getAllFlightTestOrdersInterceptor([testFlightTestOrder]);
    getAllTestPointSequencesInterceptor([testTestPointSequence]);
    getTestPointSequenceInterceptor(testTestPointSequence);
    getAllTestPointSequenceTestPointsInterceptor([]);

    cy.mountFlightTestOrder(
        <LocalFeatureFlagsProvider
            configurationOverride={{
                "vte-1516": { enabled: true },
                "vte-1506": { enabled: false },
            }}
        >
            <App />
        </LocalFeatureFlagsProvider>
    );

    getFlightTestOrderInterceptor(testFlightTestOrder);
    FlightTestOrderCardPageFragment.detailsButton().click();
    FlightTestOrderDetailsPage.testPointSelectionTab().click();
    TestPointSelectionTabFragment.detailsButton().click();
    TestPointSequenceDetailsPage.addFromListButton().click();

    getAllDefinitionsInterceptor([anyDefinition({ title: "Test Definition 1" })]);
    AddFromListModalFragment.searchInput().clear().type("Test Definition 1");
    cy.wait("@getAllDefinitions");

    getAllProceduresInterceptor([anyProcedure({ title: "Test Procedure 1" })]);
    AddFromListModalFragment.detailsButton().click();
    cy.wait("@getAllProcedures");

    const testPoint1 = anyTestPoint({ comments: "Test Point 1", status: "ENGINEERING - CANCELLED" });
    const testPointAssociation1 = anyTestPointSequenceTestPointAssociation({ testPointId: testPoint1.testPointId });
    const testPoint2 = anyTestPoint({ comments: "Test Point 2", status: "PLANNING - IN WORK" });
    const testPointAssociation2 = anyTestPointSequenceTestPointAssociation({ testPointId: testPoint2.testPointId });

    getAllTestPointsOfProcedureInterceptor([testPoint1, testPoint2]);
    AddFromListModalFragment.procedureListItemExpandButton("Test Procedure 1").click();
    cy.wait("@getAllTestPointsOfProcedure");

    AddFromListModalFragment.testPointCheckboxes().eq(0).should("not.be.checked");
    AddFromListModalFragment.testPointCheckboxes().eq(0).should("not.be.disabled");
    AddFromListModalFragment.testPointCheckboxes().eq(1).should("not.be.checked");
    AddFromListModalFragment.testPointCheckboxes().eq(1).should("not.be.disabled");

    AddFromListModalFragment.testPointCheckboxes().eq(0).check({ force: true });
    AddFromListModalFragment.testPointCheckboxes().eq(1).check({ force: true });

    getAllTestPointSequenceTestPointAssociationsInterceptor([testPointAssociation1, testPointAssociation2]);
    AddFromListModalFragment.doneButton().click();
    cy.wait("@bulkCreateTestPointSequenceTestPointAssociation");
    cy.wait("@getAllTestPointSequenceTestPointAssociations");

    TestPointSequenceDetailsPage.testPointField("testPointId").should("have.length", 2);
    TestPointSequenceDetailsPage.testPointRowField(0, "testPointId").should("have.value", testPoint1.testPointId);
    TestPointSequenceDetailsPage.testPointRowField(1, "testPointId").should("have.value", testPoint2.testPointId);
});
