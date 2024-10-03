import { DataStateEnum, FileStatusEnum, FileTypeEnum } from "@voloiq/logbook-api/v6";
import { NotificationProvider } from "@voloiq/notification-provider";
import { MemoryRouter } from "@voloiq/routing";
import { FileUploadPage } from "../../../../cypress/page-objects/file-upload";
import { ExportList as ExportListCyFunctions } from "../../../../cypress/page-objects/log-details/export-list";
import { LogDetailsPage, LogFileVideoModal } from "../../../../cypress/page-objects/log-details/log-details";
import { LogOverviewPage } from "../../../../cypress/page-objects/log-overview";
import { LogPreviewPanel } from "../../../../cypress/page-objects/log-preview-panel";
import { App } from "../../../App";
import { QueryClientProvider } from "../../../QueryClientProvider";
import { CypressUIWrapper, ServiceWrapper } from "../../../libs/logbook/mocks/TestWrapper";
import { anyAircraft, makeGetAllAircraftInterceptor } from "../../../libs/logbook/mocks/cypress/AircraftInterceptors";
import {
    anyCrewMember,
    makeGetAllCrewMemberInterceptor,
} from "../../../libs/logbook/mocks/cypress/CrewMemberInterceptors";
import {
    anyExport,
    anyExportUploadURL,
    makeGetAllExportInterceptor,
    makePostExportDownloadUrlInterceptor,
} from "../../../libs/logbook/mocks/cypress/ExportInterceptors";
import { makeGetAllLocationInterceptor } from "../../../libs/logbook/mocks/cypress/LocationInterceptors";
import { anyLogCrewMember } from "../../../libs/logbook/mocks/cypress/LogCrewMemberInterceptors";
import {
    anyLog,
    makeGetAllLogInterceptor,
    makeGetLogInterceptor,
} from "../../../libs/logbook/mocks/cypress/LogInterceptors";
import {
    anyLogbookFile,
    makeAzureUploadInterceptor,
    makeGetFileDownloadUrlInterceptor,
    makeGetFileUploadUrlInterceptor,
    makePostFileInterceptor,
} from "../../../libs/logbook/mocks/cypress/LogbookFileInterceptors";
import { OverviewPage } from "../../OverviewPage";
import { ExportList } from "../volocity/export-list";

describe("LogbookDetail view ", () => {
    beforeEach(() => {
        Cypress.on("uncaught:exception", (error) => !error.message.includes("ResizeObserver loop limit exceeded"));
        makeGetAllAircraftInterceptor();
        makeGetAllCrewMemberInterceptor([anyCrewMember({ firstName: "Simon" }), anyCrewMember({ firstName: "Hugo" })]);
        makeGetAllLocationInterceptor();
        makeGetAllLogInterceptor();
        makeGetLogInterceptor();
        makeGetAllExportInterceptor();
    });

    it("can be opened", () => {
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

        cy.wait("@getAllAircraft");
        cy.wait("@getAllLocation");
        cy.wait("@getAllCrewMember");
        cy.wait("@getAllLog");

        LogOverviewPage.openFirstLog();
        cy.wait("@getLog");
        LogPreviewPanel.detailsButton().click();
        cy.wait("@getLog");

        LogDetailsPage.heading().should("be.visible");
    });

    it("only shows the export list if the product line is volocity", () => {
        const log = anyLog({
            aircraft: anyAircraft({ productLine: "VoloRegion" }),
        });

        makeGetAllLogInterceptor([log]);
        makeGetLogInterceptor(log);
        makeGetAllExportInterceptor([anyExport({ description: "testExport1" })]);

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
        LogOverviewPage.openFirstLog();
        LogPreviewPanel.detailsButton().click();

        cy.wait(["@getLog", "@getLog"]);

        LogDetailsPage.exportButton().should("not.exist");

        LogDetailsPage.backButton().click();

        makeGetLogInterceptor(
            anyLog({
                aircraft: anyAircraft({ productLine: "VoloCity" }),
            })
        );

        LogOverviewPage.openFirstLog();
        cy.wait("@getLog");
        LogPreviewPanel.detailsButton().click();
        cy.wait("@getLog");
        cy.wait("@getAllExport");

        LogDetailsPage.exportButton().should("be.visible");
        LogDetailsPage.exportButton().should("not.be.disabled");
        ExportListCyFunctions.exportListItems().first().should("include.text", "testExport1");
    });

    it("disables the export button if there is any upload pending", () => {
        const log = anyLog({
            aircraft: anyAircraft({ productLine: "VoloCity" }),
            files: [anyLogbookFile({ status: FileStatusEnum.UPLOAD_REQUESTED })],
        });

        makeGetAllLogInterceptor([log]);
        makeGetLogInterceptor(log);
        makeGetAllExportInterceptor([anyExport({ description: "testExport1" })]);

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

        LogOverviewPage.openFirstLog();
        cy.wait("@getLog");
        LogPreviewPanel.detailsButton().click();
        cy.wait("@getLog");
        cy.wait("@getAllExport");
        LogDetailsPage.exportButton().should("be.disabled");
        ExportListCyFunctions.exportListItems().first().should("include.text", "testExport1");
    });

    it("can upload a log file via the details page", () => {
        const log = anyLog({
            aircraft: anyAircraft({ productLine: "VoloRegion1" }),
        });

        makeGetAllLogInterceptor([log]);
        makeGetAllAircraftInterceptor([log.aircraft]);
        makeGetLogInterceptor(log);
        makeAzureUploadInterceptor();
        makeGetFileUploadUrlInterceptor();
        makePostFileInterceptor();

        cy.mount(
            <CypressUIWrapper withRouter={false}>
                <ServiceWrapper>
                    <MemoryRouter initialEntries={["/flight-test-suite/logs"]}>
                        <NotificationProvider>
                            <App backendBaseUrl="http://localhost:9000/" />
                        </NotificationProvider>
                    </MemoryRouter>
                </ServiceWrapper>
            </CypressUIWrapper>
        );

        cy.wait("@getAllLog");

        LogOverviewPage.openFirstLog();
        cy.wait("@getLog");
        LogPreviewPanel.detailsButton().click();
        cy.wait("@getLog");
        cy.url().should("include", `/${log.id}`);
        LogDetailsPage.addFileButton().click();

        cy.wait("@getLog");

        FileUploadPage.attachmentInput().selectFile(["cypress/fixtures/fc.binlog"], {
            action: "select",
            force: true,
        });
        FileUploadPage.addedFilesListFirstItem().should("include", /^fc$/i);
        FileUploadPage.uploadButton().click();
        cy.wait("@azureUpload");
        cy.wait("@postFile");
        cy.wait("@getFileUploadUrl");
        FileUploadPage.successMessage().should("be.visible");
    });

    it("transforms the remarks if it is json", () => {
        const log = anyLog({
            remarks: '{"foo": "bar", "baz": "qux"}',
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

        cy.wait("@getAllLog");

        LogOverviewPage.openFirstLog();
        cy.wait("@getLog");
        LogPreviewPanel.detailsButton().click();
        cy.wait("@getLog");

        cy.findByText("foo: bar, baz: qux").should("be.visible");

        LogDetailsPage.backButton().click({ force: true });
        cy.wait("@getAllLog");

        makeGetLogInterceptor(
            anyLog({
                remarks: "This is a remark",
            })
        );
        LogOverviewPage.openFirstLog();
        cy.wait("@getLog");
        LogPreviewPanel.detailsButton().click();
        cy.wait("@getLog");
        cy.findByText("This is a remark").should("be.visible");
    });

    it("hide everything except media files if the product line is volocity", () => {
        const log = anyLog({
            aircraft: anyAircraft({ productLine: "VoloRegion" }),
            files: [anyLogbookFile({ fileType: FileTypeEnum.MESH }), anyLogbookFile({ fileType: FileTypeEnum.MEDIA })],
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
        LogPreviewPanel.detailsButton().click();

        cy.wait("@getLog");
        LogDetailsPage.addFileButton().should("be.visible");
        LogDetailsPage.fileListItems().should("have.length", 2);

        LogDetailsPage.backButton().click();

        makeGetLogInterceptor(
            anyLog({
                aircraft: anyAircraft({ productLine: "VoloCity" }),
                files: [
                    anyLogbookFile({ fileType: FileTypeEnum.IADS_RAW }),
                    anyLogbookFile({ fileType: FileTypeEnum.MEDIA }),
                ],
            })
        );

        LogOverviewPage.openFirstLog();
        LogPreviewPanel.detailsButton().click();

        cy.wait("@getLog");
        cy.wait("@getAllExport");

        LogDetailsPage.addFileButton().should("be.visible");
        LogDetailsPage.fileListItems().should("have.length", 1);
    });

    it("displays the status of export processes in the export list", () => {
        const exportData = [
            anyExport({ status: "PROCESSING", id: "18c7b1ba-1596-44bf-a442-d976328bc2b8" }),
            anyExport({ status: "PROCESSED", id: "eb908338-4beb-4284-9495-b67cc060cfe9" }),
            anyExport({ status: "QUEUED", id: "ea9eef31-d3a1-4011-b77c-5efa3a5057f9" }),
            anyExport({ status: "ERROR", id: "72c768fe-d74b-4aea-a57d-705fff753c81" }),
        ];

        makeGetAllExportInterceptor(exportData);

        const setExportRequestLog = cy.stub();

        cy.mount(
            <CypressUIWrapper>
                <ServiceWrapper>
                    <ExportList
                        setExportRequestLog={setExportRequestLog}
                        logId="2cfa151b-cc4b-4e3d-9482-07b85540cb81"
                        dataState={DataStateEnum.TM_DATA}
                    />
                </ServiceWrapper>
            </CypressUIWrapper>
        );

        const statusList = ["Processing ...", "Processed", "Queued", "Error"];

        ExportListCyFunctions.exportListItems().each((element, index) =>
            cy.wrap(element).findByText(statusList[index]!).should("be.visible")
        );
    });

    it("opens the modal when clicking the export button", () => {
        const setExportRequestLogStub = cy.stub().as("setExportRequestLogStub");

        cy.mount(
            <CypressUIWrapper>
                <ServiceWrapper>
                    <ExportList
                        setExportRequestLog={setExportRequestLogStub}
                        logId="2cfa151b-cc4b-4e3d-9482-07b85540cb81"
                        dataState={DataStateEnum.TM_DATA}
                    />
                </ServiceWrapper>
            </CypressUIWrapper>
        );

        cy.wait("@getAllExport");

        ExportListCyFunctions.exportButton().click();

        cy.get("@setExportRequestLogStub").should("be.calledOnce");
    });

    it("opens a popover with parameter id if the user clicks on the parameterCount badge", () => {
        const setExportRequestLogStub = cy.stub();

        cy.mount(
            <CypressUIWrapper>
                <ServiceWrapper>
                    <ExportList
                        setExportRequestLog={setExportRequestLogStub}
                        logId="2cfa151b-cc4b-4e3d-9482-07b85540cb81"
                        dataState={DataStateEnum.TM_DATA}
                    />
                </ServiceWrapper>
            </CypressUIWrapper>
        );

        ExportListCyFunctions.exportListItems()
            .first()
            .findByText(/2 parameter/i)
            .click();

        ExportListCyFunctions.exportListItems()
            .first()
            .findByRole("heading", {
                name: /included parameter/i,
            })
            .should("be.visible");

        ExportListCyFunctions.exportListItems().first().findByText("2111000003").should("be.visible");
    });

    it("can handle a export download click", () => {
        const setExportRequestLogStub = cy.stub();
        makePostExportDownloadUrlInterceptor(anyExportUploadURL({ url: "" }));
        makeGetAllExportInterceptor([anyExport({ status: "PROCESSED" })]);

        cy.mount(
            <CypressUIWrapper>
                <ServiceWrapper>
                    <ExportList
                        setExportRequestLog={setExportRequestLogStub}
                        logId="2cfa151b-cc4b-4e3d-9482-07b85540cb81"
                        dataState={DataStateEnum.TM_DATA}
                    />
                </ServiceWrapper>
            </CypressUIWrapper>
        );

        ExportListCyFunctions.exportListItems()
            .first()
            .findByRole("button", { name: /download export/i })
            .click();

        cy.wait("@getExportDownloadUrl").its("response.statusCode").should("eq", 200);
    });

    it("hides download button for unprocessed exports.", () => {
        const exportData = [anyExport({ status: "PROCESSED" }), anyExport({ status: "PROCESSING" })];
        const setExportRequestLogStub = cy.stub();
        makeGetAllExportInterceptor(exportData);

        cy.mount(
            <CypressUIWrapper>
                <ServiceWrapper>
                    <ExportList
                        setExportRequestLog={setExportRequestLogStub}
                        logId="2cfa151b-cc4b-4e3d-9482-07b85540cb81"
                        dataState={DataStateEnum.TM_DATA}
                    />
                </ServiceWrapper>
            </CypressUIWrapper>
        );

        ExportListCyFunctions.exportListItems()
            .first()
            .findByRole("button", { name: /download export/i })
            .should("be.visible");

        // a testing library bug prevents findByRole from selecting a element by name if it's hidden: https://github.com/testing-library/dom-testing-library/issues/846
        ExportListCyFunctions.exportListItems()
            .last()
            .findAllByRole("button", { hidden: true })
            .last()
            .should("not.be.visible");
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
        LogPreviewPanel.detailsButton().click();

        cy.wait("@getLog");
        cy.wait("@getLog");
        cy.wait("@getAllExport");

        cy.findByText(/statistics/i).should("not.exist");
        cy.findByText(/fc software/i).should("not.exist");
        cy.findByText(/pilots/i).should("not.exist");
        cy.findByText(/supervisors/i).should("not.exist");
        cy.findByText(/number of files/i).should("not.exist");
    });

    it("can copy parameter ids from the export parameter popover to clipboard", () => {
        const textExport = anyExport({ status: "PROCESSED" });
        const setExportRequestLogStub = cy.stub();
        makeGetAllExportInterceptor([textExport]);
        makePostExportDownloadUrlInterceptor(anyExportUploadURL({ url: "" }));

        cy.mount(
            <CypressUIWrapper>
                <ServiceWrapper>
                    <ExportList
                        setExportRequestLog={setExportRequestLogStub}
                        logId="2cfa151b-cc4b-4e3d-9482-07b85540cb81"
                        dataState={DataStateEnum.TM_DATA}
                    />
                </ServiceWrapper>
            </CypressUIWrapper>
        );

        cy.wait("@getAllExport");

        ExportListCyFunctions.exportListItems()
            .first()
            .findByText(/2 parameter/i)
            .click();

        ExportListCyFunctions.exportListItems()
            .first()
            .findByRole("button", {
                name: /copy/i,
            })
            .focus();
        ExportListCyFunctions.exportListItems()
            .first()
            .findByRole("button", {
                name: /copy/i,
            })
            .click();

        cy.window().then((win) => {
            win.navigator.clipboard.readText().then((text) => {
                chai.expect(text).to.eq(textExport.exportArguments.parameters.join(", "));
            });
        });
    });

    it("shows only personal exports or all after selecting it", () => {
        const textExport = anyExport({ status: "PROCESSED" });
        const log = anyLog({
            aircraft: anyAircraft({ productLine: "VoloCity" }),
        });
        makeGetAllExportInterceptor([textExport]);
        makeGetAllLogInterceptor([log]);
        makeGetAllAircraftInterceptor([log.aircraft]);
        makeGetLogInterceptor(log);

        cy.mount(
            <CypressUIWrapper withRouter={false}>
                <ServiceWrapper>
                    <MemoryRouter initialEntries={["/flight-test-suite/logs"]}>
                        <NotificationProvider>
                            <App backendBaseUrl="http://localhost:9000/" />
                        </NotificationProvider>
                    </MemoryRouter>
                </ServiceWrapper>
            </CypressUIWrapper>
        );

        LogOverviewPage.openFirstLog();
        LogPreviewPanel.detailsButton().click();
        cy.url().should("include", `/${log.id}`);

        cy.findByText(/created by me/i).should("be.visible");

        cy.wait("@getAllExport")
            .its("request.query.filter")
            .should(
                "eq",
                'fileType IN ["CSV", "HDF5", "PARQUET"] AND createdBy EQ  "00000000-0000-0000-0000-000000000000"'
            );

        ExportListCyFunctions.exportFilterSelect().click({ force: true });
        cy.findByRole("button", { name: /all/i }).click();

        cy.wait("@getAllExport").its("request.query.filter").should("eq", 'fileType IN ["CSV", "HDF5", "PARQUET"]');
    });

    it("shows modal with video on play button press", () => {
        const mediaLogFile = anyLogbookFile({ fileType: "MEDIA", fileName: "coolVideo.mp4" });
        makeGetLogInterceptor({ files: [mediaLogFile, anyLogbookFile({ fileType: "MESH" })] });
        makeGetFileDownloadUrlInterceptor({ url: "https://media.w3.org/2010/05/sintel/trailer_hd.mp4" });

        cy.mount(
            <CypressUIWrapper withRouter={false}>
                <ServiceWrapper>
                    <MemoryRouter initialEntries={["/flight-test-suite/logs"]}>
                        <NotificationProvider>
                            <App backendBaseUrl="http://localhost:9000/" />
                        </NotificationProvider>
                    </MemoryRouter>
                </ServiceWrapper>
            </CypressUIWrapper>
        );

        LogOverviewPage.openFirstLog();
        LogPreviewPanel.detailsButton().click();

        LogDetailsPage.fileListItems().last().findByRole("button", { name: /play/i }).should("not.exist");

        LogDetailsPage.fileListItems().first().findByRole("button", { name: /play/i }).click();

        cy.wait("@getFileDownload").its("response.statusCode").should("eq", 200);

        LogFileVideoModal.heading(mediaLogFile.fileName).should("be.visible");
        LogFileVideoModal.video().should("have.prop", "paused", true);

        LogFileVideoModal.closeButton().click();

        LogFileVideoModal.heading(mediaLogFile.fileName).should("not.exist");
    });

    it("shows play button only for mp4 files", () => {
        const mediaLogFile = anyLogbookFile({ fileType: "MEDIA", fileName: "coolVideo.avi" });
        makeGetLogInterceptor({ files: [mediaLogFile] });

        cy.mount(
            <CypressUIWrapper withRouter={false}>
                <ServiceWrapper>
                    <MemoryRouter initialEntries={["/flight-test-suite/logs"]}>
                        <NotificationProvider>
                            <App backendBaseUrl="http://localhost:9000/" />
                        </NotificationProvider>
                    </MemoryRouter>
                </ServiceWrapper>
            </CypressUIWrapper>
        );

        LogOverviewPage.openFirstLog();
        LogPreviewPanel.detailsButton().click();

        LogDetailsPage.fileListItems().last().findByRole("button", { name: /play/i }).should("not.exist");
    });

    it("shows the tag correctly for telemetry data", () => {
        const log = anyLog({
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

        cy.wait("@getAllLog");

        LogOverviewPage.openFirstLog();
        cy.wait("@getLog");
        LogPreviewPanel.detailsButton().click();
        cy.wait("@getLog");

        LogDetailsPage.heading().should("be.visible");
        cy.findByText("General").siblings().should("include.text", "TM Data");
    });

    it("shows the tag correctly for onboard data", () => {
        const log = anyLog({
            dataState: "ONBOARD_RECORDED_DATA",
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

        cy.wait("@getAllLog");

        LogOverviewPage.openFirstLog();
        cy.wait("@getLog");
        LogPreviewPanel.detailsButton().click();
        cy.wait("@getLog");

        cy.findByText("General").siblings().should("include.text", "Onboard Data");
    });

    it("shows the tag correctly for onboard data also for volocity (special case)", () => {
        const log = anyLog({
            dataState: "ONBOARD_RECORDED_DATA",
            aircraft: anyAircraft({
                productLine: "VoloCity",
            }),
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

        cy.wait("@getAllAircraft");
        cy.wait("@getAllLocation");
        cy.wait("@getAllCrewMember");
        cy.wait("@getAllLog");

        LogOverviewPage.openFirstLog();
        cy.wait("@getLog");
        LogPreviewPanel.detailsButton().click();
        cy.wait("@getLog");

        cy.findByText("General").siblings().should("include.text", "Onboard Data");
    });
});
