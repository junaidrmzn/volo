import { UUID } from "uuidjs";
import { FilterBarPageFragment } from "@voloiq/resource-overview-cypress-page-objects";
import { FilterBarParametersPageFragment } from "../../../cypress/page-objects/FilterBarParametersPageFragment";
import { OverviewPage as OverviewPageCyFunctions } from "../../../cypress/page-objects/overview";
import { ParameterPreview } from "../../../cypress/page-objects/parameter-preview";
import { QueryClientProvider } from "../../QueryClientProvider";
import { CypressUIWrapper, ServiceWrapper } from "../../libs/fti-api/mocks/TestWrapper";
import { anyAircrafts, makeGetAllAircraftsInterceptor } from "../../libs/fti-api/mocks/cypress/AircraftInterceptors";
import {
    anyAircraftZone,
    makeGetAllAircraftZoneInterceptor,
} from "../../libs/fti-api/mocks/cypress/AircraftZoneInterceptors";
import { makeGetAllAtaIspecsInterceptor } from "../../libs/fti-api/mocks/cypress/AtaIspecInterceptor";
import {
    anyParameter,
    makeGetAllParameterInterceptor,
    makeGetParameterInterceptor,
} from "../../libs/fti-api/mocks/cypress/ParameterInterceptors";
import { makeGetAllParameterSourceInterceptor } from "../../libs/fti-api/mocks/cypress/ParameterSourceInterceptors";
import { makeGetAllSensorTypesInterceptor } from "../../libs/fti-api/mocks/cypress/SensorTypeInterceptor";
import { makeGetAllUnitsInterceptor } from "../../libs/fti-api/mocks/cypress/UnitInterceptors";
import { makeGetAllWorkgroupInterceptor } from "../../libs/fti-api/mocks/cypress/WorkGroupInterceptors";
import { OverviewPage } from "../OverviewPage";
import { renderWithPermissions } from "./handlers-with-jsx";

describe("Parameter Overview", () => {
    beforeEach(() => {
        cy.clearAllLocalStorage();
        Cypress.on("uncaught:exception", (error) => !error.message.includes("ResizeObserver loop limit exceeded"));
        makeGetAllAircraftsInterceptor();
        makeGetAllAircraftZoneInterceptor();
        makeGetAllWorkgroupInterceptor();
        makeGetAllAtaIspecsInterceptor();
        makeGetAllSensorTypesInterceptor();
        makeGetAllUnitsInterceptor();
        makeGetAllParameterSourceInterceptor();
        makeGetParameterInterceptor();
    });

    it("can show parameters in a list", () => {
        const testParameter1 = anyParameter();
        const testParameter2 = anyParameter({
            aircrafts: anyAircrafts(),
            isSafetyOfFlightCritical: true,
        });
        makeGetAllParameterInterceptor([testParameter1, testParameter2]);

        renderWithPermissions(["FlightTestInstrumentationEngineer"], <OverviewPage />);

        OverviewPageCyFunctions.overviewListItems(testParameter1.id).first().as("entry1");
        cy.get("@entry1").findByText(testParameter1.shortDescription).should("be.visible");
        cy.get("@entry1").findByText(testParameter1.workgroup.label).should("be.visible");

        for (const aircraft of testParameter1.aircrafts) {
            cy.get(`@entry1`).findByText(aircraft.msn).should("be.visible");
        }

        OverviewPageCyFunctions.overviewListItems(testParameter2.id).last().as("entry2");
        cy.get("@entry2").findByText(testParameter2.shortDescription).should("be.visible");
        cy.get("@entry2").findByText(testParameter2.workgroup.label).should("be.visible");
        cy.get("@entry2").findByText("SoF").should("be.visible");
        cy.get("@entry2").findByText("Open Request").should("be.visible");
        for (const aircraft of testParameter2.aircrafts) {
            cy.get(`@entry2`).findByText(aircraft.msn).should("be.visible");
        }
    });

    it("displays the empty state if no entries are available", () => {
        makeGetAllParameterInterceptor([]);

        renderWithPermissions(["FlightTestInstrumentationEngineer"], <OverviewPage />);

        cy.wait("@getAllParameter");

        cy.findByText(/no entries found/i).should("be.visible");
        cy.findByText(/are you sure there are entries?/i).should("be.visible");
    });

    it("can open the preview", () => {
        const testParameter = anyParameter();
        makeGetAllParameterInterceptor([testParameter]);

        renderWithPermissions(["FlightTestInstrumentationEngineer"], <OverviewPage />);

        cy.wait("@getAllParameter");

        OverviewPageCyFunctions.overviewListItems(testParameter.id).click();

        ParameterPreview.headerText().should("be.visible");
    });

    it("can show the correct parameters with Open Request tag", () => {
        const testParameter1 = anyParameter({
            aircrafts: [
                {
                    id: UUID.generate(),
                    productLine: "VC",
                    aircraftType: "VC1-2",
                    msn: "003",
                    status: "REQUESTED",
                },
            ],
        });

        const testParameter2 = anyParameter({
            aircrafts: [
                {
                    id: UUID.generate(),
                    productLine: "VC",
                    aircraftType: "VC1-2",
                    msn: "001",
                    status: "DRAFT",
                },
                {
                    id: UUID.generate(),
                    productLine: "VC",
                    aircraftType: "VC1-2",
                    msn: "003",
                    status: "REQUESTED",
                },
            ],
        });

        const testParameter3 = anyParameter({
            aircrafts: [
                {
                    id: UUID.generate(),
                    productLine: "VC",
                    aircraftType: "VC1-2",
                    msn: "001",
                    status: "DRAFT",
                },
                {
                    id: UUID.generate(),
                    productLine: "VC",
                    aircraftType: "VC1-2",
                    msn: "002",
                    status: "RELEASED",
                },
                {
                    id: UUID.generate(),
                    productLine: "VC",
                    aircraftType: "VC1-2",
                    msn: "003",
                    status: "CANCELLED",
                },
                {
                    id: UUID.generate(),
                    productLine: "VC",
                    aircraftType: "VC1-2",
                    msn: "004",
                    status: "FROZEN",
                },
            ],
        });

        const testParameter4 = anyParameter({
            aircrafts: [
                {
                    id: UUID.generate(),
                    productLine: "VC",
                    aircraftType: "VC1-2",
                    msn: "001",
                    status: "RELEASED",
                },
            ],
        });

        makeGetAllParameterInterceptor([testParameter1, testParameter2, testParameter3, testParameter4]);

        renderWithPermissions(["FlightTestInstrumentationEngineer"], <OverviewPage />);

        OverviewPageCyFunctions.overviewListItems(testParameter1.id).first().as("entry1");
        cy.get("@entry1").findByText("Open Request").should("be.visible");

        OverviewPageCyFunctions.overviewListItems(testParameter2.id).as("entry2");
        cy.get("@entry2").findByText("Open Request").should("be.visible");

        OverviewPageCyFunctions.overviewListItems(testParameter3.id).as("entry3");
        cy.get("@entry3").findByText("Open Request").should("not.exist");

        OverviewPageCyFunctions.overviewListItems(testParameter4.id).as("entry4");
        cy.get("@entry4").findByText("Open Request").should("not.exist");
    });

    it("displays add and import button with the 'ParameterBulkImportLog.create' permission", () => {
        makeGetAllParameterInterceptor([anyParameter(), anyParameter({ id: "testId" })]);
        renderWithPermissions(["FlightTestInstrumentationEngineer"], <OverviewPage />);

        cy.wait("@getAllParameter");

        OverviewPageCyFunctions.importButton().should("be.visible");
        OverviewPageCyFunctions.updateStatusButton().should("not.exist");
        OverviewPageCyFunctions.addButton().should("be.visible");
    });

    it("doesn't display import button with the 'ParameterBulkImportLog.read' permission", () => {
        makeGetAllParameterInterceptor([anyParameter(), anyParameter({ id: "testId" })]);

        renderWithPermissions(["Engineer"], <OverviewPage />);

        cy.wait("@getAllParameter");

        OverviewPageCyFunctions.importButton().should("not.exist");
        OverviewPageCyFunctions.updateStatusButton().should("not.exist");
        OverviewPageCyFunctions.addButton().should("be.visible");
    });

    it("displays only the add button with the 'ParameterBulkImportLog.create' permission", () => {
        makeGetAllParameterInterceptor([anyParameter(), anyParameter({ id: "testId" })]);

        renderWithPermissions(["Engineer"], <OverviewPage />);

        OverviewPageCyFunctions.importButton().should("not.exist");
        OverviewPageCyFunctions.updateStatusButton().should("not.exist");
        OverviewPageCyFunctions.addButton().should("be.visible");
    });

    it("doesn't display the import, add and update status button with the 'ParameterBulkImportLog.read' permission", () => {
        makeGetAllParameterInterceptor([anyParameter(), anyParameter({ id: "testId" })]);

        renderWithPermissions(["FlightTestEngineer"], <OverviewPage />);

        OverviewPageCyFunctions.importButton().should("not.exist");
        OverviewPageCyFunctions.updateStatusButton().should("not.exist");
        OverviewPageCyFunctions.addButton().should("not.exist");
    });

    it.skip("can add filter and remove it again ", () => {
        const testAircraft = anyAircrafts();
        const testAircraftZone = anyAircraftZone();
        makeGetAllAircraftsInterceptor([testAircraft]);
        makeGetAllAircraftZoneInterceptor([testAircraftZone]);

        cy.mount(
            <CypressUIWrapper>
                <ServiceWrapper>
                    <QueryClientProvider>
                        <OverviewPage />
                    </QueryClientProvider>
                </ServiceWrapper>
            </CypressUIWrapper>
        );

        OverviewPageCyFunctions.overviewList().should("be.visible");

        makeGetAllParameterInterceptor(undefined, {
            size: "100",
            page: "1",
            filter: `aircraftMapping.aircraftId IN ["${testAircraft[0]?.id}"]`,
        });

        const parameterAircraftFilter = { aircraft: "VC - VC1-2 - 01" };
        FilterBarParametersPageFragment.filter(parameterAircraftFilter);

        cy.wait("@getAllParameter").its("response.statusCode").should("eq", 200);

        OverviewPageCyFunctions.filterTagListItems().should("have.length", 1);

        OverviewPageCyFunctions.deleteFilterButton();

        makeGetAllParameterInterceptor(undefined, {
            size: "100",
            page: "1",
        });

        FilterBarPageFragment.applyFilters();

        makeGetAllParameterInterceptor(undefined, {
            size: "100",
            page: "1",
            filter: `aircraftZoneId IN ["${testAircraftZone.id}"]`,
        });

        const parameterAircraftZonesFilter = { aircraftZone: "EU" };

        FilterBarParametersPageFragment.filter(parameterAircraftZonesFilter);

        cy.wait("@getAllParameter").its("response.statusCode").should("eq", 200);

        OverviewPageCyFunctions.filterTagListItems().should("have.length", 1);

        OverviewPageCyFunctions.deleteFilterButton();
    });
});
