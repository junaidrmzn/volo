import { FilterBarPageFragment } from "@voloiq/resource-overview-cypress-page-objects";
import { FilterBarLogbookPageFragments } from "../../../../cypress/page-objects/FilterBarLogbookPageFragments";
import { LogOverviewPage } from "../../../../cypress/page-objects/log-overview";
import { QueryClientProvider } from "../../../QueryClientProvider";
import { CypressUIWrapper, ServiceWrapper } from "../../../libs/logbook/mocks/TestWrapper";
import { anyAircraft, makeGetAllAircraftInterceptor } from "../../../libs/logbook/mocks/cypress/AircraftInterceptors";
import {
    anyCrewMember,
    makeGetAllCrewMemberInterceptor,
} from "../../../libs/logbook/mocks/cypress/CrewMemberInterceptors";
import { makeGetAllLocationInterceptor } from "../../../libs/logbook/mocks/cypress/LocationInterceptors";
import {
    anyLog,
    makeGetAllLogInterceptor,
    makeGetLogInterceptor,
} from "../../../libs/logbook/mocks/cypress/LogInterceptors";
import { anyLocation } from "../../../libs/logbook/mocks/msw/LocationMock";
import { OverviewPage } from "../../OverviewPage";

describe("LogbookFilter view ", () => {
    beforeEach(() => {
        cy.clearAllLocalStorage();
        Cypress.on("uncaught:exception", (error) => !error.message.includes("ResizeObserver loop limit exceeded"));
        makeGetAllAircraftInterceptor([
            anyAircraft({ productLine: "VC", aircraftType: "VC1-2", msn: "01" }),
            anyAircraft({ productLine: "VC", aircraftType: "VC1-2", msn: "02" }),
        ]);
        makeGetAllCrewMemberInterceptor([anyCrewMember({ firstName: "Simon" }), anyCrewMember({ firstName: "Hugo" })]);
        makeGetAllLocationInterceptor([anyLocation({ id: "76e00218-0a4e-4438-a64e-7eb356283127", icaoCode: "RVP" })]);
        makeGetAllLogInterceptor();
        makeGetLogInterceptor();
    });

    it.skip("can filter the log overview", () => {
        const [log1, log2] = [
            anyLog({
                id: "77e00218-0a4e-4438-a64e-7eb356283126",
            }),
            anyLog({
                id: "37efb460-e4d5-4062-8b3a-71471d1c0f0e",
            }),
        ];

        makeGetAllLogInterceptor([log1, log2], {
            size: "10",
            page: "1",
            orderBy: "date:desc",
        });

        cy.mount(
            <CypressUIWrapper>
                <ServiceWrapper>
                    <QueryClientProvider>
                        <OverviewPage />
                    </QueryClientProvider>
                </ServiceWrapper>
            </CypressUIWrapper>
        );

        cy.wait("@getAllLog");

        LogOverviewPage.overviewListItems().should("have.length", 2);

        makeGetAllLogInterceptor([log1, log2], {
            size: "10",
            page: "1",
            orderBy: "date:desc",
            filter: `location.id IN ["76e00218-0a4e-4438-a64e-7eb356283127"] AND statistics.maxVelocity GE "2" AND statistics.maxVelocity LE "22"`,
        });

        const logBookLoactionFilter = { location: "RVP", minVelocity: 2, maxVelocity: 22 };
        FilterBarLogbookPageFragments.filter(logBookLoactionFilter);

        LogOverviewPage.overviewListItems().should("have.length", 2);
    });

    it.skip("can filter for multiple aircrafts at once", () => {
        const [log1, log2] = [
            anyLog({
                id: "77e00218-0a4e-4438-a64e-7eb356283126",
            }),
            anyLog({
                id: "37efb460-e4d5-4062-8b3a-71471d1c0f0e",
            }),
        ];

        makeGetAllAircraftInterceptor([
            anyAircraft({ msn: "123", id: "da9725f5-19ca-4d6f-9361-b0df22849b58" }),
            anyAircraft({ msn: "456", id: "57e9f674-f075-4c82-983a-058962f1ee9b" }),
        ]);
        makeGetAllLogInterceptor([log1, log2], {
            size: "10",
            page: "1",
            orderBy: "date:desc",
        });

        cy.mount(
            <CypressUIWrapper>
                <ServiceWrapper>
                    <QueryClientProvider>
                        <OverviewPage />
                    </QueryClientProvider>
                </ServiceWrapper>
            </CypressUIWrapper>
        );

        cy.wait("@getAllLog");
        cy.wait("@getAllAircraft");

        LogOverviewPage.deletePreviousFilters();
        FilterBarPageFragment.applyFilters();

        LogOverviewPage.overviewListItems().should("have.length", 2);

        makeGetAllLogInterceptor([log1, log2], {
            size: "10",
            page: "1",
            orderBy: "date:desc",
            filter: `aircraftId IN ["da9725f5-19ca-4d6f-9361-b0df22849b58", "57e9f674-f075-4c82-983a-058962f1ee9b"]`,
        });

        FilterBarLogbookPageFragments.multiSelectFilter({ aircraft: ["VC - VC1-2 - 123", "VC - VC1-2 - 456"] });

        LogOverviewPage.overviewListItems().should("have.length", 2);
    });
});
