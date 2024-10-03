import { LocalFeatureFlagsProvider } from "@voloiq/feature-flags";
import { FlightTestCrewInsert } from "@voloiq/flight-test-definition-api/v1";
import { anyFlightTestOrder } from "@voloiq/flight-test-definition-api/v2";
import { AppWithoutProvider as App } from "../../../../../src/App";
import {
    bulkCreateFlightTestCrewInterceptor,
    bulkDeleteFlightTestCrewInterceptor,
    bulkUpdateFlightTestCrewInterceptor,
    getAllFlightTestCrewInterceptor,
} from "../../../../interceptors/flightTestCrewInterceptors";
import {
    getAllFlightTestOrdersV2Interceptor,
    getFlightTestOrderV2Interceptor,
    updateFlightTestOrderV2Interceptor,
} from "../../../../interceptors/flightTestOrderInterceptors";
import { FlightTestOrderDetailsPage } from "../../../../pages/flight-test-order/flight-test-order-details/flightTestOrderDetailsPage";
import { FlightTestOrderCardPageFragment } from "../../../../pages/flight-test-order/flight-test-order-overview/page-fragments/flightTestOrderCardPageFragment";
import { AircraftConfigurationSteps } from "../../../../steps/general-steps/aircraftConfigurationStepsObject";
import { FlightTestCrewSteps } from "../../../../steps/general-steps/flightTestCrewStepsObject";
import {
    GeneralInformationSteps,
    generalInformationRiskClassifications,
} from "../../../../steps/general-steps/generalInformationStepsObject";
import { TestAircraftSteps } from "../../../../steps/general-steps/testAircraftStepsObject";
import { TestMissionAndWeatherSteps } from "../../../../steps/general-steps/testMissionAndWeatherStepsObject";
import {
    AircraftConfigurationType,
    GeneralInformationType,
    TestAircraftType,
    TestMissionAndWeatherType,
} from "./GeneralTypes";

const testPilotInCommand: FlightTestCrewInsert = {
    name: "Paulo Treides",
    position: "LH-RH Seat",
    category: "Cat. 1",
    role: "Pilot in Command",
};

const testTestConductor: FlightTestCrewInsert = {
    name: "John Doe",
    position: "Ground",
    category: "Cat. 1",
    role: "Test Conductor",
};

const testTestObserver: FlightTestCrewInsert = {
    name: "Jane Doe",
    position: "Ground",
    category: "Cat. 2",
    role: "Test Observer",
};

const testAllFlightTestCrewMembers = [testPilotInCommand, testTestConductor, testTestObserver];

beforeEach(() => {
    getAllFlightTestOrdersV2Interceptor([]);
    getAllFlightTestCrewInterceptor();
    bulkCreateFlightTestCrewInterceptor();
    bulkUpdateFlightTestCrewInterceptor();
    bulkDeleteFlightTestCrewInterceptor();
    getFlightTestOrderV2Interceptor();
    updateFlightTestOrderV2Interceptor();
});

it("User can edit the General Information section of a Test Mission", () => {
    const testFlightTestOrder = anyFlightTestOrder();

    getAllFlightTestOrdersV2Interceptor([testFlightTestOrder]);
    getFlightTestOrderV2Interceptor(testFlightTestOrder);

    cy.mountFlightTestOrder(
        <LocalFeatureFlagsProvider
            configurationOverride={{
                "vte-1599": {
                    enabled: true,
                },
            }}
        >
            <App />
        </LocalFeatureFlagsProvider>
    );
    FlightTestOrderCardPageFragment.detailsButton().click();

    cy.findByRole("region", { name: "General Information" }).should("exist");

    FlightTestOrderDetailsPage.editGeneralInformation().click();
    cy.findByText("Edit").should("exist");

    const testGeneralInformation: GeneralInformationType = {
        missionTitle: "Aerocover Validation V123",
        ftoId: "FTO-V21-2023-015",
        flightNumber: "F3023",
        riskLevel: "MEDIUM",
        flightTestCategory: "Cat. 2",
        createTime: "2022-05-08T14:01:43",
        createdBy: "François Robert",
        missionObjective:
            "Validate the aerocover during level flight. Verify that the FCS can recover from a dual motor failure with minimal pilot intervention.",
        flightTestPlanIds: ["FTD-V21-27-055-B00", "FTD-V21-27-056-B00", "FTD-V21-27-001-A00"],
        linkedDefinitions: [
            {
                id: "845db7c6-fa54-429c-9cfb-ada8358ee1e7",
                ftdId: "FTD-VC2-01-001",
                title: "FTD-VC2-01-001",
            },
        ],
    };

    getFlightTestOrderV2Interceptor(testGeneralInformation);
    GeneralInformationSteps.fillInGeneralInformationModalFormAndSubmit(testGeneralInformation);
    cy.wait("@getFlightTestOrderV2");

    cy.findByRole("region", { name: "General Information" }).within(() => {
        cy.findByText(testGeneralInformation.missionTitle).should("be.visible");
        cy.findByText(testGeneralInformation.ftoId).should("be.visible");
        cy.findByText(testGeneralInformation.flightNumber).should("be.visible");
        cy.findByText(generalInformationRiskClassifications[testGeneralInformation.riskLevel]).should("be.visible");
        cy.findByText(testGeneralInformation.flightTestCategory).should("be.visible");
        cy.findByText("2022-05-08").should("be.visible");
        cy.findByText(testGeneralInformation.createdBy).should("be.visible");
        cy.findByText(testGeneralInformation.missionObjective).should("be.visible");
    });

    cy.findByLabelText("Linked Definition").within(() => {
        for (const linkedDefinition of testGeneralInformation.linkedDefinitions) {
            cy.findByText(`• ${linkedDefinition.ftdId}`).should("exist");
        }
    });
});

it("User can edit the Test Aircraft section of a Test Mission", () => {
    const testFlightTestOrder = anyFlightTestOrder();

    getAllFlightTestOrdersV2Interceptor([testFlightTestOrder]);

    cy.mountFlightTestOrder(
        <LocalFeatureFlagsProvider
            configurationOverride={{
                "vte-1599": {
                    enabled: true,
                },
            }}
        >
            <App />
        </LocalFeatureFlagsProvider>
    );
    FlightTestOrderCardPageFragment.detailsButton().click();

    cy.findByRole("region", { name: "Test Aircraft" }).should("exist");

    FlightTestOrderDetailsPage.editTestAircraft().click();
    cy.findByText("Edit").should("exist");

    const testTestAircraft: TestAircraftType = {
        masterModel: "2X",
        model: "B0",
        msn: "MSN 01",
        applicability: "Manned",
        aircraftCallsign: "UAS Operator e-ID DEUtntb9um8cgzum",
        flightConditions: "FC-V21-MSN01-017",
        revision: "A00",
        issueDateFlightConditions: "2022-05-08",
        permitToFly: "Betriebsgenehmigung DEU-OAT-BW00.0031",
        issueDatePermitToFly: "2022-05-09",
        validUntil: "2023-05-07",
    };

    getFlightTestOrderV2Interceptor(testTestAircraft);
    TestAircraftSteps.fillInTestAircraftModalFormAndSubmit(testTestAircraft);
    cy.wait("@getFlightTestOrderV2");

    cy.findByRole("region", { name: "Test Aircraft" }).within(() => {
        cy.findByText(testTestAircraft.masterModel).should("be.visible");
        cy.findByText(testTestAircraft.model).should("be.visible");
        cy.findByText(testTestAircraft.msn).should("be.visible");
        cy.findByText(testTestAircraft.applicability).should("be.visible");
        cy.findByText(testTestAircraft.aircraftCallsign).should("be.visible");
        cy.findByText(testTestAircraft.flightConditions).should("be.visible");
        cy.findByText(testTestAircraft.issueDateFlightConditions).should("be.visible");
        cy.findByText(testTestAircraft.revision).should("be.visible");
        cy.findByText(testTestAircraft.permitToFly).should("be.visible");
        cy.findByText(testTestAircraft.issueDatePermitToFly).should("be.visible");
        cy.findByText(testTestAircraft.validUntil).should("be.visible");
    });
});

it("User can edit the Aircraft Configuration section of a Test Mission", () => {
    const testFlightTestOrder = anyFlightTestOrder();

    getAllFlightTestOrdersV2Interceptor([testFlightTestOrder]);

    cy.mountFlightTestOrder(
        <LocalFeatureFlagsProvider
            configurationOverride={{
                "vte-1599": {
                    enabled: true,
                },
            }}
        >
            <App />
        </LocalFeatureFlagsProvider>
    );
    FlightTestOrderCardPageFragment.detailsButton().click();

    cy.findByRole("region", { name: "Aircraft Configuration" }).should("exist");

    FlightTestOrderDetailsPage.editAircraftConfiguration().click();
    cy.findByText("Edit").should("exist");

    const testAircraftConfiguration: AircraftConfigurationType = {
        allUpMass: "919 kg",
        centerOfGravity: "20 mm",
        massAndBalanceCategory: "Heavy-AFT/FWD",
        ballasts: "3.2v",
        charging: "420",
        bingo: "220",
        totalDuration: "120 min",
        setupSheet: "Setup Sheet ID",
        notesToAircraft: "Heavy-Aft config. CLAW: ISNYER - Alt Hold and Integrators ON with new rotor plane.",
    };

    getFlightTestOrderV2Interceptor(testAircraftConfiguration);
    AircraftConfigurationSteps.fillInAircraftConfigurationModalFormAndSubmit(testAircraftConfiguration);
    cy.wait("@getFlightTestOrderV2");

    cy.findByRole("region", { name: "Aircraft Configuration" }).within(() => {
        cy.findByText(testAircraftConfiguration.allUpMass).should("be.visible");
        cy.findByText(testAircraftConfiguration.centerOfGravity).should("be.visible");
        cy.findByText(testAircraftConfiguration.massAndBalanceCategory).should("be.visible");
        cy.findByText(testAircraftConfiguration.ballasts).should("be.visible");
        cy.findByText(testAircraftConfiguration.charging).should("be.visible");
        cy.findByText(testAircraftConfiguration.bingo).should("be.visible");
        cy.findByText(testAircraftConfiguration.totalDuration).should("be.visible");
        cy.findByText(testAircraftConfiguration.setupSheet).should("be.visible");
        cy.findByText(testAircraftConfiguration.notesToAircraft).should("be.visible");
    });
});

it("User can edit the Test Mission & Weather section of a Test Mission", () => {
    const testFlightTestOrder = anyFlightTestOrder();

    getAllFlightTestOrdersV2Interceptor([testFlightTestOrder]);

    cy.mountFlightTestOrder(
        <LocalFeatureFlagsProvider
            configurationOverride={{
                "vte-1599": {
                    enabled: true,
                },
            }}
        >
            <App />
        </LocalFeatureFlagsProvider>
    );
    FlightTestOrderCardPageFragment.detailsButton().click();

    cy.findByRole("region", { name: "Test Mission" }).should("exist");

    FlightTestOrderDetailsPage.editTestMission().click();
    cy.findByText("Edit").should("exist");

    const testTestMissionAndWeather: TestMissionAndWeatherType = {
        maxTestAltitude: "100 ft",
        flightRule: "VFR Day operational only",
        departure: "2024-05-12",
        arrival: "2024-05-13",
        frequencyOperations: "122.780",
        frequencyTower: "125.180",
        optionalFrequency: "111.222",
        airspaceRequested: "EDTL APRON, TWY-B, RWY 03/21",
        weatherLimits: "Total Wind Speed: 10 kts",
        weatherObserved: "Total Wind Speed: 5 kts",
    };

    getFlightTestOrderV2Interceptor(testTestMissionAndWeather);
    TestMissionAndWeatherSteps.fillInTestMissionAndWeatherModalFormAndSubmit(testTestMissionAndWeather);
    cy.wait("@getFlightTestOrderV2");

    cy.findByRole("region", { name: "Test Mission" }).within(() => {
        cy.findByText(testTestMissionAndWeather.maxTestAltitude).should("be.visible");
        cy.findByText(testTestMissionAndWeather.flightRule).should("be.visible");
        cy.findByText(testTestMissionAndWeather.departure).should("be.visible");
        cy.findByText(testTestMissionAndWeather.arrival).should("be.visible");
        cy.findByText(testTestMissionAndWeather.frequencyOperations).should("be.visible");
        cy.findByText(testTestMissionAndWeather.frequencyTower).should("be.visible");
        cy.findByText(testTestMissionAndWeather.optionalFrequency).should("be.visible");
        cy.findByText(testTestMissionAndWeather.airspaceRequested).should("be.visible");
    });
    cy.findByLabelText("Weather").within(() => {
        cy.findByText(testTestMissionAndWeather.weatherLimits).should("be.visible");
        cy.findByText(testTestMissionAndWeather.weatherObserved).should("be.visible");
    });
});

it("User can add entries in the Flight Test Crew & Occupants section of a Test Mission", () => {
    const testFlightTestOrder = anyFlightTestOrder();

    getAllFlightTestOrdersV2Interceptor([testFlightTestOrder]);
    getAllFlightTestCrewInterceptor([]);

    cy.mountFlightTestOrder(
        <LocalFeatureFlagsProvider
            configurationOverride={{
                "vte-1599": {
                    enabled: true,
                },
            }}
        >
            <App />
        </LocalFeatureFlagsProvider>
    );
    FlightTestOrderCardPageFragment.detailsButton().click();

    cy.findByRole("region", { name: "Flight Test Crew & Occupants" }).should("exist");

    FlightTestOrderDetailsPage.editCrewAndOccupants().click();

    getAllFlightTestCrewInterceptor(testAllFlightTestCrewMembers);
    FlightTestCrewSteps.addNewFlightTestCrewMembersAndSubmit(testPilotInCommand, testTestConductor, [testTestObserver]);
    cy.wait("@bulkCreateFlightTestCrew");
    cy.wait("@getAllFlightTestCrew");

    cy.findByRole("region", { name: "Flight Test Crew & Occupants" }).within(() => {
        for (const [index, crewMember] of testAllFlightTestCrewMembers.entries()) {
            cy.findByRole("listitem", { name: `Flight Test Crew & Occupants table row #${index + 1}` }).within(() => {
                cy.findByText(crewMember.role).should("be.visible");
                cy.findByText(crewMember.name).should("be.visible");
                cy.findByText(crewMember.position).should("be.visible");
                if (crewMember.category) cy.findByText(crewMember.category).should("be.visible");
            });
        }
    });
});

it("User can edit and delete entries in the Flight Test Crew & Occupants section of a Test Mission", () => {
    const testFlightTestOrder = anyFlightTestOrder();

    getAllFlightTestOrdersV2Interceptor([testFlightTestOrder]);
    getAllFlightTestCrewInterceptor(testAllFlightTestCrewMembers);

    cy.mountFlightTestOrder(
        <LocalFeatureFlagsProvider
            configurationOverride={{
                "vte-1599": {
                    enabled: true,
                },
            }}
        >
            <App />
        </LocalFeatureFlagsProvider>
    );
    FlightTestOrderCardPageFragment.detailsButton().click();

    cy.findByRole("region", { name: "Flight Test Crew & Occupants" }).should("exist");

    FlightTestOrderDetailsPage.editCrewAndOccupants().click();

    getAllFlightTestCrewInterceptor([
        testPilotInCommand,
        { ...testTestConductor, position: "TM", category: undefined },
    ]);
    FlightTestCrewSteps.editCrewMember(1, { position: "TM", category: undefined });
    FlightTestCrewSteps.deleteCrewMember(2);
    FlightTestCrewSteps.submit();
    cy.wait("@bulkUpdateFlightTestCrew");
    cy.wait("@bulkDeleteFlightTestCrew");
    cy.wait("@getAllFlightTestCrew");

    cy.findByRole("region", { name: "Flight Test Crew & Occupants" }).within(() => {
        cy.findByRole("listitem", { name: `Flight Test Crew & Occupants table row #2` }).within(() => {
            cy.findByText("TM").should("be.visible");
        });
        cy.findAllByRole("listitem").should("have.length", 2);
    });
});
