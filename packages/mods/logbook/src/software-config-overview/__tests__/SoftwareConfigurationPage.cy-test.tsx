import { SoftwareConfigOverviewPage } from "../../../cypress/page-objects/software-config-overview";
import { SoftwareConfigPreviewPanel } from "../../../cypress/page-objects/software-config-preview-panel";
import { CypressUIWrapper, ServiceWrapper } from "../../libs/logbook/mocks/TestWrapper";
import {
    makeGetAllSoftwareConfigInterceptor,
    makeGetSoftwareConfigFileInterceptor,
    makeGetSoftwareConfigInterceptor,
} from "../../libs/software-configuration/mocks/cypress/SoftwareConfigInterceptors";
import { SoftwareConfigurationsPage } from "../SoftwareConfigurationsPage";

describe("The software configuration overview", () => {
    beforeEach(() => {
        Cypress.on("uncaught:exception", (error) => !error.message.includes("ResizeObserver loop limit exceeded"));
        makeGetAllSoftwareConfigInterceptor();
        makeGetSoftwareConfigInterceptor();
        makeGetSoftwareConfigFileInterceptor();
    });

    it("can download software configuration files", () => {
        cy.mount(
            <CypressUIWrapper>
                <ServiceWrapper>
                    <SoftwareConfigurationsPage />
                </ServiceWrapper>
            </CypressUIWrapper>
        );

        SoftwareConfigOverviewPage.overviewListItems().first().click();
        SoftwareConfigPreviewPanel.downloadButton().click();
    });
});
