import { UploadSimLogFileObjects } from "../../../../../../cypress/page-objects/route-details";
import { CypressAppShell, CypressServiceProvider } from "../../../../../testing/TestWrapper";
import { makeKmlFileUploadInterceptor, makeKmlFileUploadedStatusInterceptor } from "../../../../__mocks__/cypress";
import { makeGetKmlFileUploadLinkInterceptor } from "../../../../__mocks__/cypress/FileUpload";
import { UploadKmlFileModal } from "../UploadKmlFileModal";

const mockedRouteOptionId = 1;
const fileName = "test.kml";

const TestComponent = () => {
    return (
        <CypressAppShell>
            <CypressServiceProvider baseUrl="">
                <UploadKmlFileModal isOpen onClose={() => {}} routeOptionId={mockedRouteOptionId} />
            </CypressServiceProvider>
        </CypressAppShell>
    );
};

beforeEach(() => {
    makeGetKmlFileUploadLinkInterceptor(mockedRouteOptionId, fileName);
    makeKmlFileUploadInterceptor(fileName);
    makeKmlFileUploadedStatusInterceptor(mockedRouteOptionId);
});

describe("UploadSimLogFileModal", () => {
    it("should show file upload", () => {
        cy.mount(<TestComponent />);
        cy.findByText("Upload Route Kml").should("be.visible");
    });

    it("should trigger file upload", () => {
        cy.mount(<TestComponent />);
        UploadSimLogFileObjects.fileInput().selectFile(["cypress/fixtures/frankfurt_sample.kml"], {
            action: "select",
            force: true,
        });
        cy.findByRole("button", { name: "Upload" }).click();
        cy.wait("@uploadKmlFile").its("request.body").should("contain", "<kml");
        cy.wait("@uploadedKmlFileStatus");
    });

    it("allow only one file", () => {
        cy.mount(<TestComponent />);
        UploadSimLogFileObjects.fileInput().selectFile(["cypress/fixtures/frankfurt_sample.kml"], {
            action: "select",
            force: true,
        });
        UploadSimLogFileObjects.fileInput().selectFile(["cypress/fixtures/frankfurt_sample_2.kml"], {
            action: "select",
            force: true,
        });
        cy.findAllByRole("listitem").should("have.length", 1);
    });
});
