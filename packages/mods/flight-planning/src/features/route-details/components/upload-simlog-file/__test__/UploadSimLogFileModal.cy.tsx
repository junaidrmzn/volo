import { UploadSimLogFileObjects } from "../../../../../../cypress/page-objects/route-details";
import { CypressAppShell, CypressServiceProvider } from "../../../../../testing/TestWrapper";
import { makeSimLogFileUploadInterceptor } from "../../../../__mocks__/cypress";
import { makeGetSimLogFileUploadLinkInterceptor } from "../../../../__mocks__/cypress/FileUpload";
import { UploadSimLogFileModal } from "../UploadSimLogFileModal";

const mockedRouteId = 1;
const fileName = "test.csv";

const TestComponent = () => {
    return (
        <CypressAppShell>
            <CypressServiceProvider baseUrl="">
                <UploadSimLogFileModal isOpen onClose={() => {}} routeId={mockedRouteId} />
            </CypressServiceProvider>
        </CypressAppShell>
    );
};

beforeEach(() => {
    makeGetSimLogFileUploadLinkInterceptor(mockedRouteId, fileName);
    makeSimLogFileUploadInterceptor(fileName);
});

describe("UploadSimLogFileModal", () => {
    it("should show show file upload", () => {
        cy.mount(<TestComponent />);
        cy.findByText("Upload Simulator CSV").should("be.visible");
    });

    it("should trigger file upload", () => {
        cy.mount(<TestComponent />);
        UploadSimLogFileObjects.fileInput().selectFile(["cypress/fixtures/paris_simlog_sample.csv"], {
            action: "select",
            force: true,
        });
        cy.findByRole("button", { name: "Upload" }).click();
        cy.wait("@uploadSimLogFile").its("request.body").should("contain", "<Title>");
    });

    it("allow only one file", () => {
        cy.mount(<TestComponent />);
        UploadSimLogFileObjects.fileInput().selectFile(["cypress/fixtures/paris_simlog_sample.csv"], {
            action: "select",
            force: true,
        });
        UploadSimLogFileObjects.fileInput().selectFile(["cypress/fixtures/paris_simlog_sample_2.csv"], {
            action: "select",
            force: true,
        });
        cy.findAllByRole("listitem").should("have.length", 1);
    });
});
