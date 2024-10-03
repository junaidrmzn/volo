import { FileStatusEnum } from "@voloiq/logbook-api/v6";
import { LogOverviewPage } from "../../../cypress/page-objects/log-overview";
import { QueryClientProvider } from "../../QueryClientProvider";
import { CypressUIWrapper, ServiceWrapper } from "../../libs/logbook/mocks/TestWrapper";
import { anyAircraft, makeGetAllAircraftInterceptor } from "../../libs/logbook/mocks/cypress/AircraftInterceptors";
import { makeGetAllCrewMemberInterceptor } from "../../libs/logbook/mocks/cypress/CrewMemberInterceptors";
import { makeGetAllLocationInterceptor } from "../../libs/logbook/mocks/cypress/LocationInterceptors";
import { anyLogCrewMember } from "../../libs/logbook/mocks/cypress/LogCrewMemberInterceptors";
import { anyLog, makeGetAllLogInterceptor } from "../../libs/logbook/mocks/cypress/LogInterceptors";
import { anyLogbookFile } from "../../libs/logbook/mocks/cypress/LogbookFileInterceptors";
import { OverviewPage } from "../OverviewPage";

describe("The Overview", () => {
    beforeEach(() => {
        Cypress.on("uncaught:exception", (error) => !error.message.includes("ResizeObserver loop limit exceeded"));
        makeGetAllAircraftInterceptor();
        makeGetAllCrewMemberInterceptor();
        makeGetAllLocationInterceptor();
        makeGetAllLogInterceptor();
    });
    it("can render the list of Parameters", () => {
        makeGetAllLogInterceptor([
            anyLog({
                id: "f6ca83d6-fd65-4267-bd59-a5ea7fe5018d",
                crew: [anyLogCrewMember({ role: "PILOT", firstName: "Calvin", lastName: "Holzmayer" })],
            }),
            anyLog({
                id: "670b4402-b13d-4850-8bce-a1f12a349aa7",
                crew: [anyLogCrewMember({ role: "PILOT", firstName: "Simon", lastName: "Bayer" })],
            }),
        ]);

        cy.mount(
            <CypressUIWrapper>
                <ServiceWrapper>
                    <QueryClientProvider>
                        <OverviewPage />
                    </QueryClientProvider>
                </ServiceWrapper>
            </CypressUIWrapper>
        );

        LogOverviewPage.overviewList().within(() => {
            cy.findAllByRole("listitem").first().should("include.text", "Calvin Holzmayer");
            cy.findAllByRole("listitem").last().should("include.text", "Simon Bayer");
        });
    });

    it("does not show the pilot and statistics in the list if product line is volocity", () => {
        makeGetAllLogInterceptor([
            anyLog({
                id: "f6ca83d6-fd65-4267-bd59-a5ea7fe5018d",
                crew: [anyLogCrewMember({ role: "PILOT", firstName: "Simon", lastName: "Neumann" })],
                aircraft: anyAircraft({ productLine: "VoloCity" }),
            }),
        ]);

        cy.mount(
            <CypressUIWrapper>
                <ServiceWrapper>
                    <QueryClientProvider>
                        <OverviewPage />
                    </QueryClientProvider>
                </ServiceWrapper>
            </CypressUIWrapper>
        );

        LogOverviewPage.overviewList().within(() => {
            cy.findAllByRole("listitem")
                .first()
                .should("not.include.text", "Simon Neumann")
                .should("not.include.text", /flight duration/i)
                .should("not.include.text", /max. altitude/i)
                .should("not.include.text", /max. velocity/i);
        });
    });

    it("shows that the upload is in progress on the overview", () => {
        makeGetAllLogInterceptor([
            anyLog({
                id: "f6ca83d6-fd65-4267-bd59-a5ea7fe5018d",
                crew: [anyLogCrewMember({ role: "PILOT", firstName: "Simon", lastName: "Neumann" })],
                aircraft: anyAircraft({ productLine: "VoloCity" }),
                files: [anyLogbookFile({ status: FileStatusEnum.UPLOAD_REQUESTED })],
            }),
        ]);

        cy.mount(
            <CypressUIWrapper>
                <ServiceWrapper>
                    <QueryClientProvider>
                        <OverviewPage />
                    </QueryClientProvider>
                </ServiceWrapper>
            </CypressUIWrapper>
        );

        LogOverviewPage.overviewList().within(() => {
            cy.findAllByRole("listitem").first().should("include.text", "Upload in progress");
        });
    });

    it("shows that the log entry has uploaded and onboard telemetry data and shows also correctly data state and file states", () => {
        makeGetAllLogInterceptor([
            anyLog({
                aircraft: anyAircraft({ productLine: "VoloCity" }),
                dataState: "TM_DATA",
            }),
            anyLog({
                aircraft: anyAircraft({ productLine: "VoloCity" }),
                dataState: "ONBOARD_RECORDED_DATA",
            }),
            anyLog({
                aircraft: anyAircraft({ productLine: "VoloCity" }),
                dataState: "TM_DATA",
                files: [anyLogbookFile({ status: FileStatusEnum.UPLOAD_REQUESTED })],
            }),
            anyLog({
                aircraft: anyAircraft({ productLine: "VoloCity" }),
                dataState: "ONBOARD_RECORDED_DATA",
                files: [anyLogbookFile({ status: FileStatusEnum.ERROR })],
            }),
        ]);

        cy.mount(
            <CypressUIWrapper>
                <ServiceWrapper>
                    <QueryClientProvider>
                        <OverviewPage />
                    </QueryClientProvider>
                </ServiceWrapper>
            </CypressUIWrapper>
        );

        LogOverviewPage.overviewList().within(() => {
            cy.findAllByRole("listitem").first().should("include.text", "TM Data");
            cy.findAllByRole("listitem").eq(1).should("include.text", "Onboard Data");
            cy.findAllByRole("listitem").eq(2).should("include.text", "Upload in progress");
            cy.findAllByRole("listitem").eq(3).should("include.text", "Error");
        });
    });
});
