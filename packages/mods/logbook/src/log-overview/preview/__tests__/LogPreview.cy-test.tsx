import { LogOverviewPage } from "../../../../cypress/page-objects/log-overview";
import { LogPreviewPanel } from "../../../../cypress/page-objects/log-preview-panel";
import { QueryClientProvider } from "../../../QueryClientProvider";
import { CypressUIWrapper, ServiceWrapper } from "../../../libs/logbook/mocks/TestWrapper";
import { anyAircraft, makeGetAllAircraftInterceptor } from "../../../libs/logbook/mocks/cypress/AircraftInterceptors";
import {
    anyCrewMember,
    makeGetAllCrewMemberInterceptor,
} from "../../../libs/logbook/mocks/cypress/CrewMemberInterceptors";
import { makeGetAllLocationInterceptor } from "../../../libs/logbook/mocks/cypress/LocationInterceptors";
import { anyLogCrewMember } from "../../../libs/logbook/mocks/cypress/LogCrewMemberInterceptors";
import {
    anyLog,
    makeDeleteLogInterceptor,
    makeGetAllLogInterceptor,
    makeGetLogInterceptor,
} from "../../../libs/logbook/mocks/cypress/LogInterceptors";
import { anyLogbookFile } from "../../../libs/logbook/mocks/cypress/LogbookFileInterceptors";
import { OverviewPage } from "../../OverviewPage";

describe("LogbookPreview ", () => {
    beforeEach(() => {
        Cypress.on("uncaught:exception", (error) => !error.message.includes("ResizeObserver loop limit exceeded"));
        makeGetAllAircraftInterceptor();
        makeGetAllCrewMemberInterceptor([anyCrewMember({ firstName: "Simon" }), anyCrewMember({ firstName: "Hugo" })]);
        makeGetAllLocationInterceptor();
        makeGetAllLogInterceptor();
        makeGetLogInterceptor();
    });

    it("can show formatted log statistics", () => {
        const log = anyLog({
            statistics: {
                maxAltitude: 7.079_34,
                maxVelocity: undefined,
                totalFlightDuration: 213,
            },
            crew: [anyLogCrewMember({ role: "PILOT" }), anyLogCrewMember({ role: "SUPERVISOR" })],
        });

        makeGetAllLogInterceptor([log]);
        makeGetLogInterceptor(log);

        cy.mount(
            <CypressUIWrapper>
                <ServiceWrapper>
                    <QueryClientProvider>
                        <OverviewPage />
                    </QueryClientProvider>
                </ServiceWrapper>
            </CypressUIWrapper>
        );

        LogOverviewPage.openFirstLog();

        LogPreviewPanel.previewPanel().should("be.visible");

        LogPreviewPanel.previewPanel().findByText("7.08 m").should("be.visible");
        LogPreviewPanel.previewPanel().findByText("N/A").should("be.visible");
        LogPreviewPanel.previewPanel().findByText("3 min 33 s").should("be.visible");
    });

    it("hides the analytics button if a file is in error state ", () => {
        const log = anyLog({
            files: [anyLogbookFile({ status: "ERROR" })],
        });

        makeGetAllLogInterceptor([log]);
        makeGetLogInterceptor(log);

        cy.mount(
            <CypressUIWrapper>
                <ServiceWrapper>
                    <QueryClientProvider>
                        <OverviewPage />
                    </QueryClientProvider>
                </ServiceWrapper>
            </CypressUIWrapper>
        );

        LogOverviewPage.openFirstLog();

        LogPreviewPanel.analyticsButton().should("not.exist");
    });

    it("shows the analytics button if a file is in processing state ", () => {
        const log = anyLog({
            files: [anyLogbookFile({ status: "PROCESSED" })],
        });

        makeGetAllLogInterceptor([log]);
        makeGetLogInterceptor(log);

        cy.mount(
            <CypressUIWrapper>
                <ServiceWrapper>
                    <QueryClientProvider>
                        <OverviewPage />
                    </QueryClientProvider>
                </ServiceWrapper>
            </CypressUIWrapper>
        );

        LogOverviewPage.openFirstLog();

        LogPreviewPanel.analyticsButton().should("be.visible");
    });

    it("can delete a log", () => {
        const log = anyLog({
            files: [anyLogbookFile({ status: "PROCESSED" })],
        });

        makeGetAllLogInterceptor([log]);
        makeGetLogInterceptor(log);
        makeDeleteLogInterceptor();

        cy.mount(
            <CypressUIWrapper>
                <ServiceWrapper>
                    <QueryClientProvider>
                        <OverviewPage />
                    </QueryClientProvider>
                </ServiceWrapper>
            </CypressUIWrapper>
        );

        LogOverviewPage.openFirstLog();

        LogPreviewPanel.deleteButton().click();
        LogPreviewPanel.deleteModalDeleteButton().click();

        cy.wait("@deleteLog").its("response.statusCode").should("eq", 200);
    });

    it("does not show FC Software, Pilots, Supervisors, Number of Files and statistics in the list if product line is volocity", () => {
        const log = anyLog({
            aircraft: anyAircraft({ productLine: "VoloCity" }),
        });

        makeGetAllLogInterceptor([log]);
        makeGetLogInterceptor(log);

        cy.mount(
            <CypressUIWrapper>
                <ServiceWrapper>
                    <QueryClientProvider>
                        <OverviewPage />
                    </QueryClientProvider>
                </ServiceWrapper>
            </CypressUIWrapper>
        );

        LogOverviewPage.openFirstLog();

        LogPreviewPanel.previewPanel()
            .should("not.include.text", /statistics/i)
            .should("not.include.text", /fc software/i)
            .should("not.include.text", /pilots/i)
            .should("not.include.text", /supervisors/i)
            .should("not.include.text", /number of files/i);
    });

    it("hides the analytics button if data source is TM_DATA ", () => {
        const log = anyLog({
            files: [anyLogbookFile({ status: "PROCESSED" })],
            dataState: "TM_DATA",
        });

        makeGetAllLogInterceptor([log]);
        makeGetLogInterceptor(log);

        cy.mount(
            <CypressUIWrapper>
                <ServiceWrapper>
                    <QueryClientProvider>
                        <OverviewPage />
                    </QueryClientProvider>
                </ServiceWrapper>
            </CypressUIWrapper>
        );

        LogOverviewPage.openFirstLog();

        LogPreviewPanel.analyticsButton().should("not.exist");
    });
});
