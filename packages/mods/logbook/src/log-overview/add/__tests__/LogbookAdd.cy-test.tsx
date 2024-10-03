import type { Error } from "@voloiq/service";
import { formatUTCDate } from "@voloiq/utils/src";
import { DateTimePicker } from "../../../../cypress/page-objects/datepicker";
import { FileUploadPage } from "../../../../cypress/page-objects/file-upload";
import {
    LogCreationFileSelectPage,
    LogCreationFinishStepPage,
    LogCreationMetadataPage,
    LogCreationReminderModal,
    LogCreationSelectProductLinePage,
} from "../../../../cypress/page-objects/log-creation";
import { LogDetailsPage } from "../../../../cypress/page-objects/log-details/log-details";
import { LogOverviewPage } from "../../../../cypress/page-objects/log-overview";
import { Select } from "../../../../cypress/page-objects/select";
import { QueryClientProvider } from "../../../QueryClientProvider";
import { CypressUIWrapper, ServiceWrapper } from "../../../libs/logbook/mocks/TestWrapper";
import { makeGetAllAircraftInterceptor } from "../../../libs/logbook/mocks/cypress/AircraftInterceptors";
import {
    anyCrewMember,
    makeGetAllCrewMemberInterceptor,
} from "../../../libs/logbook/mocks/cypress/CrewMemberInterceptors";
import { makeGetAllLocationInterceptor } from "../../../libs/logbook/mocks/cypress/LocationInterceptors";
import {
    makeGetAllLogInterceptor,
    makeGetLogInterceptor,
    makePostLogInterceptor,
} from "../../../libs/logbook/mocks/cypress/LogInterceptors";
import {
    makeAzureUploadInterceptor,
    makeExtractMetadataInterceptor,
    makeGetFileUploadUrlInterceptor,
    makePostFileInterceptor,
} from "../../../libs/logbook/mocks/cypress/LogbookFileInterceptors";
import { OverviewPage } from "../../OverviewPage";

describe("LogbookAdd ", () => {
    beforeEach(() => {
        Cypress.on("uncaught:exception", (error) => !error.message.includes("ResizeObserver loop limit exceeded"));
        makeGetAllAircraftInterceptor();
        makeGetAllCrewMemberInterceptor([anyCrewMember({ firstName: "Simon" }), anyCrewMember({ firstName: "Hugo" })]);
        makeGetAllLocationInterceptor();
        makeGetAllLogInterceptor();
        makeGetLogInterceptor();
        makeExtractMetadataInterceptor();
        makePostLogInterceptor();
        makeGetFileUploadUrlInterceptor();
        makeAzureUploadInterceptor();
        makePostFileInterceptor();
    });

    // TODO: Please fix this test. It is related to the NumberInput change in the Design Library https://jira.volocopter.org/browse/FECOP-299
    it.skip("can create a log and view it after a successful upload", () => {
        cy.mount(
            <CypressUIWrapper>
                <ServiceWrapper>
                    <OverviewPage />
                </ServiceWrapper>
            </CypressUIWrapper>
        );

        LogOverviewPage.addButton().click();

        LogCreationSelectProductLinePage.volodroneButton().click();
        LogCreationSelectProductLinePage.nextButton().click();

        FileUploadPage.attachmentInput().selectFile(["cypress/fixtures/fc.binlog", "cypress/fixtures/mesh.binlog"], {
            action: "select",
            force: true,
        });

        LogCreationFileSelectPage.nextButton().click();

        Select.selectByOptionIndex("Aircraft:*", 0);
        Select.selectByOptionIndex("Location:*", 0);

        LogCreationMetadataPage.crewPilotMultiSelect().click({ force: true });
        cy.findByRole("button", { name: "Simon Peterson" }).click();
        LogCreationMetadataPage.crewSupervisorMultiSelect().click({ force: true });
        cy.findByRole("button", { name: "Hugo Peterson" }).click();
        LogCreationMetadataPage.remarksInput().type("Pretty windy today");

        LogCreationMetadataPage.nextButton().click();

        LogCreationFinishStepPage.viewCreatedLogButton().click();

        LogDetailsPage.heading().should("be.visible");
    });

    it("requests file metadata for the selected product line", () => {
        cy.mount(
            <CypressUIWrapper>
                <ServiceWrapper>
                    <QueryClientProvider>
                        <OverviewPage />
                    </QueryClientProvider>
                </ServiceWrapper>
            </CypressUIWrapper>
        );

        LogOverviewPage.addButton().click();

        // Check if metadata is extracted for VoloDrone
        makeExtractMetadataInterceptor(undefined, { productLine: "VoloDrone", fileType: "FC" });
        LogCreationSelectProductLinePage.volodroneButton().click();
        LogCreationSelectProductLinePage.nextButton().click();
        FileUploadPage.attachmentInput().selectFile(["cypress/fixtures/fc.binlog"], {
            action: "select",
            force: true,
        });
        cy.wait("@extractMetadata").its("response.statusCode").should("eq", 200);

        // Check if metadata is extracted for VoloRegion
        LogCreationFileSelectPage.backButton().click();
        makeExtractMetadataInterceptor(undefined, { productLine: "VoloRegion", fileType: "FC" });
        LogCreationSelectProductLinePage.voloregionButton().click();
        LogCreationSelectProductLinePage.nextButton().click();
        cy.wait("@extractMetadata").its("response.statusCode").should("eq", 200);
    });

    it("shows an error text if the extractMetadata fails", () => {
        cy.mount(
            <CypressUIWrapper>
                <ServiceWrapper>
                    <QueryClientProvider>
                        <OverviewPage />
                    </QueryClientProvider>
                </ServiceWrapper>
            </CypressUIWrapper>
        );
        // Check if metadata is extracted for VoloDrone
        const invalidProductLineError: Error = {
            id: "e16fa2af-424a-4a5e-859b-d836fab1038e",
            timestamp: "2022-12-19T14:57:31.612811+00:00",
            code: 400,
            message: "Bad Request.",
            status: "INVALID_ARGUMENT",
        };

        makeExtractMetadataInterceptor(invalidProductLineError);

        LogOverviewPage.addButton().click();

        LogCreationSelectProductLinePage.voloregionButton().click();
        LogCreationSelectProductLinePage.nextButton().click();
        FileUploadPage.attachmentInput().selectFile(["cypress/fixtures/fc.binlog"], {
            action: "select",
            force: true,
        });
        cy.wait("@extractMetadata").its("response.statusCode").should("eq", 400);
        cy.findByText("The timestamp of the log could not be determined").should("be.visible");

        makeExtractMetadataInterceptor(undefined, { productLine: "VoloDrone", fileType: "FC" });
        LogCreationFileSelectPage.backButton().click();
        LogCreationSelectProductLinePage.volodroneButton().click();
        LogCreationSelectProductLinePage.nextButton().click();
        cy.wait("@extractMetadata").its("response.statusCode").should("eq", 200);
        cy.verifyCallCount("@extractMetadata", 2);
    });

    it("allows transition to metadata step only after adding a file", () => {
        cy.mount(
            <CypressUIWrapper>
                <ServiceWrapper>
                    <QueryClientProvider>
                        <OverviewPage />
                    </QueryClientProvider>
                </ServiceWrapper>
            </CypressUIWrapper>
        );

        LogOverviewPage.addButton().click();

        LogCreationSelectProductLinePage.volodroneButton().click();
        LogCreationSelectProductLinePage.nextButton().click();

        LogCreationFileSelectPage.nextButton().should("be.disabled");

        FileUploadPage.attachmentInput().selectFile(["cypress/fixtures/fc.binlog", "cypress/fixtures/mesh.binlog"], {
            action: "select",
            force: true,
        });

        LogCreationFileSelectPage.nextButton().should("be.enabled");
        LogCreationFileSelectPage.nextButton().click();

        LogCreationMetadataPage.timeOfFlightDatePicker().should("be.visible");
    });

    it("allows adding the same file only once", () => {
        cy.mount(
            <CypressUIWrapper>
                <ServiceWrapper>
                    <QueryClientProvider>
                        <OverviewPage />
                    </QueryClientProvider>
                </ServiceWrapper>
            </CypressUIWrapper>
        );

        LogOverviewPage.addButton().click();

        LogCreationSelectProductLinePage.volodroneButton().click();
        LogCreationSelectProductLinePage.nextButton().click();

        FileUploadPage.attachmentInput().selectFile(["cypress/fixtures/fc.binlog"], {
            action: "select",
            force: true,
        });
        FileUploadPage.attachmentInput().selectFile(["cypress/fixtures/fc.binlog"], {
            action: "select",
            force: true,
        });
        FileUploadPage.sameFileExistsError("fc.binlog").should("be.visible");
    });

    it("Allows removing a file from the list", () => {
        cy.mount(
            <CypressUIWrapper>
                <ServiceWrapper>
                    <QueryClientProvider>
                        <OverviewPage />
                    </QueryClientProvider>
                </ServiceWrapper>
            </CypressUIWrapper>
        );

        LogOverviewPage.addButton().click();

        LogCreationSelectProductLinePage.volodroneButton().click();
        LogCreationSelectProductLinePage.nextButton().click();

        FileUploadPage.attachmentInput().selectFile(["cypress/fixtures/fc.binlog"], {
            action: "select",
            force: true,
        });

        FileUploadPage.addedFilesListFirstItem().within(() => FileUploadPage.removeFileButton().click());
        FileUploadPage.emptyListLabel().should("be.visible");
    });

    it("allows to change file type after wrong automatic detection", () => {
        cy.mount(
            <CypressUIWrapper>
                <ServiceWrapper>
                    <QueryClientProvider>
                        <OverviewPage />
                    </QueryClientProvider>
                </ServiceWrapper>
            </CypressUIWrapper>
        );

        LogOverviewPage.addButton().click();

        LogCreationSelectProductLinePage.volodroneButton().click();
        LogCreationSelectProductLinePage.nextButton().click();

        FileUploadPage.attachmentInput().selectFile(["cypress/fixtures/fc.binlog"], {
            action: "select",
            force: true,
        });

        FileUploadPage.addedFilesListFirstItem().within(() => cy.findByText("FC").should("be.visible"));

        cy.wait("@extractMetadata");
        FileUploadPage.addedFilesListFirstItem().within(() =>
            cy.findByRole("button", { name: /edit file type/i }).click()
        );

        FileUploadPage.addedFilesListFirstItem().within(() => {
            cy.findByRole("combobox").click({ force: true });
            cy.findByRole("button", { name: /mesh/i }).click();
            cy.findByRole("button", { name: /submit file type/i }).click();
        });

        FileUploadPage.addedFilesListFirstItem().within(() => cy.findByText(/mesh/i).should("be.visible"));
    });

    it("can enter the earliest date from the files metadata into the log metadata form ", () => {
        cy.mount(
            <CypressUIWrapper>
                <ServiceWrapper>
                    <QueryClientProvider>
                        <OverviewPage />
                    </QueryClientProvider>
                </ServiceWrapper>
            </CypressUIWrapper>
        );

        const date = new Date();

        makeExtractMetadataInterceptor({ timestamp: date.toISOString() });
        LogOverviewPage.addButton().click();

        LogCreationSelectProductLinePage.volodroneButton().click();
        LogCreationSelectProductLinePage.nextButton().click();

        FileUploadPage.attachmentInput().selectFile(["cypress/fixtures/fc.binlog"], {
            action: "select",
            force: true,
        });

        cy.wait("@extractMetadata");

        LogCreationFileSelectPage.nextButton().click();

        LogCreationMetadataPage.timeOfFlightDatePicker().should("have.value", formatUTCDate(date));
    });

    it("can enter the earliest date from the files metadata into the log metadata form after already switching to the metadata form ", () => {
        cy.mount(
            <CypressUIWrapper>
                <ServiceWrapper>
                    <QueryClientProvider>
                        <OverviewPage />
                    </QueryClientProvider>
                </ServiceWrapper>
            </CypressUIWrapper>
        );

        const date = new Date();

        makeExtractMetadataInterceptor({ timestamp: date.toISOString() }, undefined, { delay: 500 });
        LogOverviewPage.addButton().click();

        LogCreationSelectProductLinePage.volodroneButton().click();
        LogCreationSelectProductLinePage.nextButton().click();

        FileUploadPage.attachmentInput().selectFile(["cypress/fixtures/fc.binlog"], {
            action: "select",
            force: true,
        });

        LogCreationFileSelectPage.nextButton().click();

        LogCreationMetadataPage.timeOfFlightDatePicker().should("have.value", "");
        cy.wait("@extractMetadata");

        LogCreationMetadataPage.timeOfFlightDatePicker().should("have.value", formatUTCDate(date));
    });

    it("will not create a log if required metadata is missing", () => {
        cy.mount(
            <CypressUIWrapper>
                <ServiceWrapper>
                    <QueryClientProvider>
                        <OverviewPage />
                    </QueryClientProvider>
                </ServiceWrapper>
            </CypressUIWrapper>
        );

        LogOverviewPage.addButton().click();

        LogCreationSelectProductLinePage.volodroneButton().click();
        LogCreationSelectProductLinePage.nextButton().click();

        FileUploadPage.attachmentInput().selectFile(["cypress/fixtures/fc.binlog", "cypress/fixtures/mesh.binlog"], {
            action: "select",
            force: true,
        });

        LogCreationFileSelectPage.nextButton().click();

        cy.wait("@getAllAircraft");
        cy.wait("@getAllLocation");
        cy.wait("@getAllCrewMember");
        LogCreationMetadataPage.aircraftSelect();

        LogCreationMetadataPage.nextButton().click();

        cy.findAllByText("Please select an option").should("be.visible");

        Select.selectByOptionIndex("Aircraft:*", 0);
        Select.selectByOptionIndex("Location:*", 0);

        LogCreationMetadataPage.crewPilotMultiSelect().click({ force: true });
        cy.findByRole("button", { name: "Simon Peterson" }).click();
        LogCreationMetadataPage.crewSupervisorMultiSelect().click({ force: true });
        cy.findByRole("button", { name: "Hugo Peterson" }).click();
        LogCreationMetadataPage.remarksInput().type("Pretty windy today");
        LogCreationMetadataPage.nextButton().click();

        cy.findByText("Log successfully created").should("be.visible");
    });

    it("will create a log if only required metadata available", () => {
        cy.mount(
            <CypressUIWrapper>
                <ServiceWrapper>
                    <QueryClientProvider>
                        <OverviewPage />
                    </QueryClientProvider>
                </ServiceWrapper>
            </CypressUIWrapper>
        );

        LogOverviewPage.addButton().click();

        LogCreationSelectProductLinePage.volodroneButton().click();
        LogCreationSelectProductLinePage.nextButton().click();

        FileUploadPage.attachmentInput().selectFile(["cypress/fixtures/fc.binlog", "cypress/fixtures/mesh.binlog"], {
            action: "select",
            force: true,
        });

        LogCreationFileSelectPage.nextButton().click();
        LogCreationMetadataPage.timeOfFlightDatePicker();

        LogCreationMetadataPage.nextButton().click();

        cy.findAllByText("Please select an option").should("be.visible");

        Select.selectByOptionIndex("Aircraft:*", 0);
        Select.selectByOptionIndex("Location:*", 0);

        LogCreationMetadataPage.nextButton().click();

        cy.findByText("Log successfully created").should("be.visible");
    });

    it("shows only aircraft in the metadata step for the selected product line", () => {
        cy.mount(
            <CypressUIWrapper>
                <ServiceWrapper>
                    <QueryClientProvider>
                        <OverviewPage />
                    </QueryClientProvider>
                </ServiceWrapper>
            </CypressUIWrapper>
        );

        LogOverviewPage.addButton().click();

        makeGetAllAircraftInterceptor(undefined, {
            limit: "100",
            orderBy: "productLine:asc",
            filter: 'productLine EQ "VoloDrone"',
        });
        makeExtractMetadataInterceptor(undefined, { productLine: "VoloDrone", fileType: "FC" });
        LogCreationSelectProductLinePage.volodroneButton().click();
        LogCreationSelectProductLinePage.nextButton().click();
        FileUploadPage.attachmentInput().selectFile(["cypress/fixtures/fc.binlog"], {
            action: "select",
            force: true,
        });
        LogCreationFileSelectPage.nextButton().click();

        cy.wait("@getAllAircraft").its("response.statusCode").should("eq", 200);
    });

    it("disables date input until the extract metadata request returned ", () => {
        makeExtractMetadataInterceptor(undefined, undefined, { delay: 500 });
        cy.mount(
            <CypressUIWrapper>
                <ServiceWrapper>
                    <QueryClientProvider>
                        <OverviewPage />
                    </QueryClientProvider>
                </ServiceWrapper>
            </CypressUIWrapper>
        );

        LogOverviewPage.addButton().click();

        LogCreationSelectProductLinePage.volodroneButton().click();
        LogCreationSelectProductLinePage.nextButton().click();

        FileUploadPage.attachmentInput().selectFile(["cypress/fixtures/fc.binlog", "cypress/fixtures/mesh.binlog"], {
            action: "select",
            force: true,
        });

        LogCreationFileSelectPage.nextButton().click();

        LogCreationMetadataPage.timeOfFlightDatePicker().should("be.disabled");

        LogCreationMetadataPage.timeOfFlightDatePicker().should("be.enabled");
    });

    it("shows a reminder modal if the time of flight has not been changed ", () => {
        makeExtractMetadataInterceptor({
            id: "VoloIQCloud-VoloIQ-TelePort-logbookFrontend-4c14c038-3b36-4052-9e07-883c9d1cb775",
            timestamp: "2023-04-06T15:30:29.846908+00:00",
            code: 400,
            message: "Bad Request.",
            status: "INVALID_ARGUMENT",
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

        LogOverviewPage.addButton().click();

        LogCreationSelectProductLinePage.volodroneButton().click();
        LogCreationSelectProductLinePage.nextButton().click();

        FileUploadPage.attachmentInput().selectFile(["cypress/fixtures/fc.binlog", "cypress/fixtures/mesh.binlog"], {
            action: "select",
            force: true,
        });

        LogCreationFileSelectPage.nextButton().click();

        LogCreationMetadataPage.timeOfFlightDatePicker().should("be.enabled");

        LogCreationMetadataPage.timeOfFlightDatePicker().click();
        DateTimePicker.selectDate(new Date());

        Select.selectByOptionIndex("Aircraft:*", 0);
        Select.selectByOptionIndex("Location:*", 0);

        LogCreationMetadataPage.nextButton().click();

        LogCreationReminderModal.headline().should("be.visible");
        LogCreationReminderModal.confirmButton().click();

        LogCreationMetadataPage.nextButton().click();

        LogCreationReminderModal.headline().should("not.exist");
    });
});
