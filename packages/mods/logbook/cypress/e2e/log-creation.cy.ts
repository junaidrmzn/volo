import type { Aircraft, Location } from "@voloiq-typescript-api/logbook-types";
import { DateTimePicker } from "../page-objects/datepicker";
import { FileUploadPage } from "../page-objects/file-upload";
import {
    LogCreationFileSelectPage,
    LogCreationFinishStepPage,
    LogCreationMetadataPage,
} from "../page-objects/log-creation";
import { LogDetailsPage } from "../page-objects/log-details-old";
import { LogOverviewPage } from "../page-objects/log-overview";
import { NavigationBar } from "../page-objects/navigation-bar";
import { Select } from "../page-objects/select";

let createdAircraft: Aircraft;
let createdLocation: Location;

beforeEach(() => {
    cy.resetDatabase();
    cy.createAircraft({
        msn: "IAZR",
        productLine: "VC100",
        aircraftType: "VC",
    })
        .its("body")
        .then((response) => {
            createdAircraft = response.data!;
        });
    cy.createCrewMember({
        email: "john.doe@volocopter.com",
        firstName: "John",
        lastName: "Doe",
    });
    cy.createCrewMember({
        email: "foo.bar@volocopter.com",
        firstName: "Foo",
        lastName: "Bar",
    });
    cy.createLocation({
        icaoCode: "CDG",
        latitude: 49.009_691,
        longitude: 2.547_925,
    })
        .its("body")
        .then((response) => {
            createdLocation = response.data!;
        });
});

it("User can create a log and see its details", () => {
    cy.visit("/");

    NavigationBar.logbookButton().click();
    NavigationBar.overviewButton().click();

    cy.location("pathname").should("include", "/logbook/overview");

    LogOverviewPage.addButton().click();

    // Log creation page
    cy.location("pathname").should("include", "/logbook/overview/create");

    FileUploadPage.attachmentInput().selectFile(["cypress/fixtures/fc.binlog", "cypress/fixtures/mesh.binlog"], {
        action: "drag-drop",
        force: true,
    });

    LogCreationFileSelectPage.nextButton().click();

    LogCreationMetadataPage.timeOfFlightDatePicker().click();
    DateTimePicker.selectDateTime(new Date("2022-04-21T08:00:00.000Z"));

    Select.selectByOptionIndex("Aircraft:*", 0);
    Select.selectByOptionIndex("Location:*", 0);

    LogCreationMetadataPage.crewPilotMultiSelect().click({ force: true });
    cy.findByRole("button", { name: "John Doe" }).click();
    LogCreationMetadataPage.crewSupervisorMultiSelect().click({ force: true });
    cy.findByRole("button", { name: "Foo Bar" }).click();
    LogCreationMetadataPage.remarksInput().type("Pretty windy today");

    LogCreationMetadataPage.nextButton().click();

    LogCreationFinishStepPage.backToOverviewButton().click();

    cy.location("pathname").should("include", "/logbook/overview");

    LogOverviewPage.openFirstLog();

    // Log details page
    cy.location("pathname").should("include", "/logbook/overview/");

    LogDetailsPage.generalTab().should("have.attr", "aria-selected", "true");

    LogDetailsPage.timeOfFlightInput().should("have.value", "2022-04-21 8:00 UTC");
    LogDetailsPage.timeOfFlightInput().should("be.disabled");

    LogDetailsPage.aircraftSelect().should("have.value", createdAircraft.id);
    LogDetailsPage.aircraftSelect().should("be.disabled");

    LogDetailsPage.fcSoftwareInput().should("have.value", "f9c889a");
    LogDetailsPage.fcSoftwareInput().should("be.disabled");

    LogDetailsPage.locationSelect().should("have.value", createdLocation.id);
    LogDetailsPage.locationSelect().should("be.disabled");

    cy.findByText(`John Doe`).should("be.visible");
    LogDetailsPage.crewPilotSelect().should("be.disabled");

    cy.findByText(`Foo Bar`).should("be.visible");
    LogDetailsPage.crewSupervisorSelect().should("be.disabled");

    LogDetailsPage.remarksInput().should("have.value", "Pretty windy today");
    LogDetailsPage.remarksInput().should("be.disabled");

    LogDetailsPage.filesTab().click();
    LogDetailsPage.filesTab().should("have.attr", "aria-selected", "true");
});
