import { LocalFeatureFlagsProvider } from "@voloiq/feature-flags";
import { anyAircraftReleaseConfiguration, anyFlightTestOrder } from "@voloiq/flight-test-definition-api/v1";
import { anyFlightTestOrder as anyFlightTestOrderV2 } from "@voloiq/flight-test-definition-api/v2";
import { AppWithoutProvider as App } from "../../../src/App";
import { getAllFlightTestCrewInterceptor } from "../../interceptors/flightTestCrewInterceptors";
import {
    createFlightTestOrderInterceptor,
    declineFlightTestOrderInterceptor,
    deleteFlightTestOrderInterceptor,
    exportFlightTestOrderInterceptor,
    getAllFlightTestOrdersInterceptor,
    getAllFlightTestOrdersV2Interceptor,
    getFlightTestOrderInterceptor,
    getFlightTestOrderV2Interceptor,
    requestApprovalFlightTestOrderInterceptor,
    updateFlightTestOrderInterceptor,
    updateFlightTestOrderV2Interceptor,
} from "../../interceptors/flightTestOrderInterceptors";
import { AddFlightTestOrderPage } from "../../pages/flight-test-order/add-flight-test-order/addFlightTestOrderPage";
import { FlightTestOrderDetailsPage } from "../../pages/flight-test-order/flight-test-order-details/flightTestOrderDetailsPage";
import { FlightTestOrderOverviewPage } from "../../pages/flight-test-order/flight-test-order-overview/flightTestOrderOverviewPage";
import { FlightTestOrderCardPageFragment } from "../../pages/flight-test-order/flight-test-order-overview/page-fragments/flightTestOrderCardPageFragment";
import { Select } from "../../pages/utils/select";
import { AircraftReleaseForFlightSteps } from "../../steps/aircraftReleaseForFlightStepsObject";
import { DeclineFlightTestOrderSteps } from "../../steps/declineFlightTestOrderSteps";

beforeEach(() => {
    getAllFlightTestOrdersInterceptor([]);
    getAllFlightTestOrdersV2Interceptor();
    getFlightTestOrderInterceptor();
    getFlightTestOrderV2Interceptor();
    updateFlightTestOrderInterceptor();
    exportFlightTestOrderInterceptor();
    updateFlightTestOrderV2Interceptor();
    getAllFlightTestCrewInterceptor();
});

it("User can create a flight test order", () => {
    cy.mountFlightTestOrder(
        <LocalFeatureFlagsProvider
            configurationOverride={{
                "vte-1516": { enabled: true },
            }}
        >
            <App />
        </LocalFeatureFlagsProvider>
    );

    FlightTestOrderOverviewPage.addButton().click();
    AddFlightTestOrderPage.missionTitleTextBox().type("Sum FTO");
    AddFlightTestOrderPage.aircraftMsnTextBox().type("MSN01");
    Select.selectByOptionName("Master Model:*", "VC2-1");

    createFlightTestOrderInterceptor();
    getAllFlightTestOrdersInterceptor([
        {
            missionTitle: "Sum FTO",
            masterModel: "VC2-1",
            msn: "MSN01",
            ftoId: "FTO-V21-2023-002",
        },
    ]);
    AddFlightTestOrderPage.saveButton().click();
    cy.wait("@createFlightTestOrder");

    FlightTestOrderOverviewPage.flightTestOrderCard("FTO-V21-2023-002").should("be.visible");
});

it("User can see Test Point Sequences and Test Points Counter", () => {
    const flightTestOrder = anyFlightTestOrderV2();
    cy.mountFlightTestOrder(
        <LocalFeatureFlagsProvider
            configurationOverride={{
                "vte-1516": { enabled: true },
            }}
        >
            <App />
        </LocalFeatureFlagsProvider>
    );
    cy.findByRole("button", { name: `FTO ${flightTestOrder.ftoId}` }).click();
    cy.findByText("Test Point Sequences").should("be.visible");
    cy.findByText("Test Points").should("be.visible");
});

it("User can edit aircraft release configurations", () => {
    const testFlightTestOrder = anyFlightTestOrder({
        missionTitle: "Sum FTO",
        masterModel: "VC2-1",
        msn: "MSN01",
        ftoId: "FTO-V21-2023-002",
    });
    const testConfigurations = [
        anyAircraftReleaseConfiguration({
            type: "Basic Aircraft Config.",
            accept: true,
            required: "Test Required 1",
            status: "Test Status 1",
            commentOnDeviation: "Test Comment on deviation 1",
        }),
        anyAircraftReleaseConfiguration({
            type: "Software Configuration",
            required: "Test Required 2",
            status: "Test Status 2",
            commentOnDeviation: undefined,
        }),
        anyAircraftReleaseConfiguration({
            type: "Temporary Equipment",
            accept: true,
            required: "Test Required 3",
            status: "Test Status 3",
            commentOnDeviation: undefined,
        }),
        anyAircraftReleaseConfiguration({
            type: "Safety Equipment",
            required: "Test Required 4",
            status: "Test Status 4",
            commentOnDeviation: "Test Comment on deviation 4",
        }),
        anyAircraftReleaseConfiguration({
            type: "Flight Test Instrumentation",
            required: "Test Required 5",
            status: "Test Status 6",
            commentOnDeviation: undefined,
        }),
    ];
    getAllFlightTestOrdersInterceptor([testFlightTestOrder]);

    cy.mountFlightTestOrder(
        <LocalFeatureFlagsProvider
            configurationOverride={{
                "vte-1516": { enabled: true },
                "vte-1520": { enabled: true },
            }}
        >
            <App />
        </LocalFeatureFlagsProvider>
    );

    getFlightTestOrderInterceptor({
        ...testFlightTestOrder,
        aircraftReleaseConfigurations: [],
    });
    FlightTestOrderCardPageFragment.detailsButton().click();
    FlightTestOrderDetailsPage.aircraftReleaseTab().click();

    cy.findByText("Basic Aircraft Config.").should("be.visible");
    cy.findByText("Software Configuration").should("be.visible");
    cy.findByText("Temporary Equipment").should("be.visible");
    cy.findByText("Safety Equipment").should("be.visible");
    cy.findByText("Flight Test Instrumentation").should("be.visible");

    FlightTestOrderDetailsPage.editConfigurations().click();

    getFlightTestOrderInterceptor({
        ...testFlightTestOrder,
        aircraftReleaseConfigurations: testConfigurations,
    });

    AircraftReleaseForFlightSteps.fillInConfigurationsModalFormAndSubmit(testConfigurations);

    for (const [index, configuration] of testConfigurations.entries()) {
        FlightTestOrderDetailsPage.configurationInfoRows()
            .eq(index + 1)
            .within(() => {
                cy.findByText(configuration.required).should("be.visible");
                cy.findByText(configuration.status).should("be.visible");
                cy.findByText(configuration.commentOnDeviation ?? "-").should("be.visible");
                cy.findByText(configuration.accept ? "Y" : "N").should("be.visible");
            });
    }
});

it("User can edit aircraft release general information", () => {
    const testFlightTestOrder = anyFlightTestOrder({
        missionTitle: "Sum FTO",
        masterModel: "VC2-1",
        msn: "MSN01",
        ftoId: "FTO-V21-2023-002",
    });
    getAllFlightTestOrdersInterceptor([testFlightTestOrder]);
    const testTemporaryLimitations = "Test Temporary Limitations";
    const testReferenceSubstantiation = "Test Reference / Substantiation";

    cy.mountFlightTestOrder(
        <LocalFeatureFlagsProvider
            configurationOverride={{
                "vte-1460": { enabled: false },
                "vte-1516": { enabled: true },
            }}
        >
            <App />
        </LocalFeatureFlagsProvider>
    );

    FlightTestOrderCardPageFragment.detailsButton().click();
    FlightTestOrderDetailsPage.aircraftReleaseTab().click();

    cy.findByText(testTemporaryLimitations).should("not.exist");
    cy.findByText(testReferenceSubstantiation).should("not.exist");

    FlightTestOrderDetailsPage.editAircraftReleaseGeneralInformation().click();

    getFlightTestOrderInterceptor({
        ...testFlightTestOrder,
        temporaryLimitationsAircraftConfiguration: testTemporaryLimitations,
        referenceSubstantiation: testReferenceSubstantiation,
    });

    AircraftReleaseForFlightSteps.fillInGeneralInformationModalFormAndSubmit(
        testTemporaryLimitations,
        testReferenceSubstantiation
    );
    cy.wait("@getFlightTestOrder");

    cy.findByText(testTemporaryLimitations).should("be.visible");
    cy.findByText(testReferenceSubstantiation).should("be.visible");
});

it("User can edit aircraft release general information with V2 content", () => {
    const testFlightTestOrder = anyFlightTestOrderV2({
        missionTitle: "Sum FTO",
        masterModel: "VC2-1",
        msn: "MSN01",
        ftoId: "FTO-V21-2023-002",
    });
    getAllFlightTestOrdersInterceptor([testFlightTestOrder]);
    const aircraftConfigurationStatus = "This is Test Aircraft Configuration Status";
    const issuedApprovedLimitations = "This is a Test Issued approved Limitations";

    cy.mountFlightTestOrder(
        <LocalFeatureFlagsProvider
            configurationOverride={{
                "vte-1460": { enabled: true },
                "vte-1516": { enabled: true },
            }}
        >
            <App />
        </LocalFeatureFlagsProvider>
    );

    FlightTestOrderCardPageFragment.detailsButton().click();
    FlightTestOrderDetailsPage.aircraftReleaseTab().click();

    FlightTestOrderDetailsPage.editAircraftReleaseGeneralInformation().click();

    getFlightTestOrderV2Interceptor({
        ...testFlightTestOrder,
        aircraftConfigurationStatus,
        date: new Date(),
        issuedApprovedLimitations,
    });

    AircraftReleaseForFlightSteps.fillInGeneralInformationV2ModalFormAndSubmit(
        aircraftConfigurationStatus,
        new Date(),
        issuedApprovedLimitations
    );
    cy.wait("@getFlightTestOrder");

    cy.findByText(aircraftConfigurationStatus).should("be.visible");
    cy.findByText(issuedApprovedLimitations).should("be.visible");
});

it("User can delete a Flight Test Order", () => {
    const testFlightTestOrder = anyFlightTestOrder({
        missionTitle: "Sum FTO",
        masterModel: "VC2-1",
        msn: "MSN01",
        ftoId: "FTO-V21-2023-002",
    });
    getAllFlightTestOrdersInterceptor([testFlightTestOrder]);

    cy.mountFlightTestOrder(
        <LocalFeatureFlagsProvider
            configurationOverride={{
                "vte-1516": { enabled: true },
            }}
        >
            <App />
        </LocalFeatureFlagsProvider>
    );

    FlightTestOrderCardPageFragment.detailsButton().click();

    deleteFlightTestOrderInterceptor();
    FlightTestOrderDetailsPage.deleteButton().should("exist");
    FlightTestOrderDetailsPage.deleteButton().click();

    cy.findByRole("button", { name: "Cancel Order" }).click();

    cy.wait("@deleteFlightTestOrder");

    FlightTestOrderOverviewPage.flightTestOrderCard("FTO-V21-2023-002").should("be.visible");
});

it("User can not delete a Flight Test Order if it is Cancelled", () => {
    const testFlightTestOrder = anyFlightTestOrderV2({
        missionTitle: "Sum FTO",
        masterModel: "VC2-1",
        msn: "MSN01",
        ftoId: "FTO-V21-2023-002",
        status: "CANCELLED",
    });
    getAllFlightTestOrdersV2Interceptor([testFlightTestOrder]);
    getFlightTestOrderV2Interceptor(testFlightTestOrder);

    cy.mountFlightTestOrder(
        <LocalFeatureFlagsProvider
            configurationOverride={{
                "vte-1516": { enabled: true },
            }}
        >
            <App />
        </LocalFeatureFlagsProvider>
    );

    FlightTestOrderCardPageFragment.detailsButton().click();

    FlightTestOrderDetailsPage.deleteButton().should("not.exist");
});

it("User can export a Flight Test Order", () => {
    const testFlightTestOrder = anyFlightTestOrder({
        missionTitle: "Sum FTO",
        masterModel: "VC2-1",
        msn: "MSN01",
        ftoId: "FTO-V21-2023-002",
    });
    getAllFlightTestOrdersInterceptor([testFlightTestOrder]);

    cy.mountFlightTestOrder(<App />);

    FlightTestOrderCardPageFragment.detailsButton().click();

    exportFlightTestOrderInterceptor();

    FlightTestOrderDetailsPage.exportAsPdfButton().click();

    cy.wait("@exportFlightTestOrder");

    FlightTestOrderDetailsPage.exportAsPdfButton().should("be.visible");
});

it("User can update a Flight Test Order status", () => {
    const testFlightTestOrderWithDraftStatus = anyFlightTestOrderV2({
        missionTitle: "Sum FTO",
        masterModel: "VC2-1",
        msn: "MSN01",
        ftoId: "FTO-V21-2023-002",
        status: "DRAFT",
    });
    getAllFlightTestOrdersInterceptor([testFlightTestOrderWithDraftStatus]);

    cy.mountFlightTestOrder(<App />);

    FlightTestOrderCardPageFragment.detailsButton().click();
    FlightTestOrderDetailsPage.checkStatus("Flight Test Order Status").should("contain", "Draft");
    FlightTestOrderDetailsPage.updateStatusButton().click();
    requestApprovalFlightTestOrderInterceptor();
    getFlightTestOrderV2Interceptor({ ...testFlightTestOrderWithDraftStatus, status: "AWAITING_APPROVAL" });
    FlightTestOrderDetailsPage.confirmButton("Confirm").click();
    cy.wait("@requestApprovalFlightTestOrder");
    FlightTestOrderDetailsPage.checkConfirmationToast("Operation successful");
    FlightTestOrderDetailsPage.checkStatus("Flight Test Order Status").should("contain", "Awaiting Approval");
});

it("User can Decline a Flight Test Order status", () => {
    const testFlightTestOrderWithDraftStatus = anyFlightTestOrderV2({
        missionTitle: "Sum FTO",
        masterModel: "VC2-1",
        msn: "MSN01",
        ftoId: "FTO-V21-2023-002",
        status: "AWAITING_APPROVAL",
    });
    getAllFlightTestOrdersInterceptor([testFlightTestOrderWithDraftStatus]);
    getFlightTestOrderV2Interceptor(testFlightTestOrderWithDraftStatus);

    cy.mountFlightTestOrder(<App />);
    declineFlightTestOrderInterceptor();
    FlightTestOrderCardPageFragment.detailsButton().click();
    FlightTestOrderDetailsPage.checkStatus("Flight Test Order Status").should("contain", "Awaiting Approval");
    getFlightTestOrderV2Interceptor({ ...testFlightTestOrderWithDraftStatus, status: "DRAFT" });
    FlightTestOrderDetailsPage.declineButton().click();
    DeclineFlightTestOrderSteps.declineFto({ descriptionText: "Invalid Entries" });
    FlightTestOrderDetailsPage.checkStatus("Flight Test Order Status").should("contain", "Draft");
});

it("opens first tab on invalid tabId", () => {
    const testFlightTestOrder = anyFlightTestOrder({
        missionTitle: "Sum FTO",
        masterModel: "VC2-1",
        msn: "MSN01",
        ftoId: "FTO-V21-2023-002",
    });
    getAllFlightTestOrdersInterceptor([testFlightTestOrder]);

    cy.mountFlightTestOrder(<App />);
    cy.window().then((win) => {
        const url = new URL(win.location.href);
        url.searchParams.set("tabId", "abc");
        win.history.pushState({}, "", url.toString());
    });
    cy.mountFlightTestOrder(<App />);

    FlightTestOrderCardPageFragment.detailsButton().click();

    FlightTestOrderDetailsPage.testMissionTab().should("have.attr", "aria-selected", "true");
});

it("can not edit an FTO if the status is not Draft or Awaiting Approval", () => {
    const testFlightTestOrder = anyFlightTestOrderV2({
        missionTitle: "Sum FTO",
        masterModel: "VC2-1",
        msn: "MSN01",
        ftoId: "FTO-V21-2023-002",
        status: "APPROVED",
    });
    getAllFlightTestOrdersInterceptor([testFlightTestOrder]);
    getFlightTestOrderV2Interceptor(testFlightTestOrder);

    cy.mountFlightTestOrder(
        <LocalFeatureFlagsProvider
            configurationOverride={{
                "vte-1460": { enabled: true },
                "vte-1516": { enabled: true },
            }}
        >
            <App />
        </LocalFeatureFlagsProvider>
    );

    FlightTestOrderCardPageFragment.detailsButton().click();

    FlightTestOrderDetailsPage.testMissionTab().click();
    FlightTestOrderDetailsPage.editGeneralInformation().should("not.exist");
    FlightTestOrderDetailsPage.editTestAircraft().should("not.exist");
    FlightTestOrderDetailsPage.editAircraftConfiguration().should("not.exist");
    FlightTestOrderDetailsPage.editCrewAndOccupants().should("not.exist");

    FlightTestOrderDetailsPage.aircraftReleaseTab().click();
    FlightTestOrderDetailsPage.editConfigurations().should("not.exist");
    FlightTestOrderDetailsPage.editAircraftReleaseGeneralInformation().should("not.exist");
});
