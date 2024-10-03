import { NavigationBar } from "../page-objects/navigation-bar";
import { SoftwareConfigurationPage } from "../page-objects/software-configuration";
import {
    SoftwareConfigurationCreationFinishPage,
    SoftwareConfigurationCreationPage,
} from "../page-objects/software-configuration-creation";

beforeEach(() => {
    cy.resetDatabase();
});

it("User can create a software configuration and see it in the overview", () => {
    cy.visit("/");

    NavigationBar.logbookButton().click();
    NavigationBar.softwareConfigurationButton().click();

    cy.location("pathname").should("include", "/logbook/software-configurations");
    SoftwareConfigurationPage.addButton().click();

    // Software-Configuration creation page
    cy.location("pathname").should("include", "/logbook/software-configurations/create");

    SoftwareConfigurationCreationPage.gitHashInput().type("87fe60e4");
    SoftwareConfigurationCreationPage.attachmentInput().selectFile(["cypress/fixtures/software-configuration.h"], {
        action: "drag-drop",
        force: true,
    });
    SoftwareConfigurationCreationPage.createButton().click();

    SoftwareConfigurationCreationFinishPage.backToOverviewButton().click();

    cy.location("pathname").should("include", "/logbook/software-configurations");

    SoftwareConfigurationPage.firstSoftwareConfiguration().findByText("FC").should("be.visible");
    SoftwareConfigurationPage.firstSoftwareConfiguration().findByText("87fe60e4").should("be.visible");
});
