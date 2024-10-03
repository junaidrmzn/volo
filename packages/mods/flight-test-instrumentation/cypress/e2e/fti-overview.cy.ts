import type { ParameterPatch } from "@voloiq-typescript-api/fti-types";
import { NavigationBar } from "../page-objects/navigation-bar";
import { OverviewPage } from "../page-objects/overview";
import { Pagination } from "../page-objects/pagination";

beforeEach(() => {
    cy.resetDatabase();
});

it("User can use the pagination in the overview list", () => {
    const amount = 30;
    for (let index = 0; index <= amount; index++) {
        cy.createParameter({
            aircraftId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            shortDescription: `test description ${String(amount - index)}`,
            requesterEmail: "user@example.com",
            requesterName: "string",
            workgroupId: "",
            aircraftZoneId: "",
        });
    }

    cy.visit("/");

    NavigationBar.ftiButton().click();
    cy.location("pathname").should("include", "/flight-test-instrumentation/overview");

    OverviewPage.overviewList().within(() =>
        cy.findAllByRole("button").first().should("include.text", "test description 0")
    );

    Pagination.jumpToNextPage();

    OverviewPage.overviewList().within(() =>
        cy.findAllByRole("listitem").first().should("include.text", "test description 10")
    );

    Pagination.jumpToNextPage();
    OverviewPage.overviewList().within(() =>
        cy.findAllByRole("listitem").first().should("include.text", "test description 20")
    );

    Pagination.jumpToPreviousPage();
    OverviewPage.overviewList().within(() =>
        cy.findAllByRole("listitem").first().should("include.text", "test description 10")
    );
});

const paramPatch: ParameterPatch = {
    description: "Long description",
};

it("User can click on a entry and see it's preview", () => {
    cy.createParameter({
        aircraftId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        shortDescription: "test description",
        requesterEmail: "user@example.com",
        requesterName: "string",
        workgroupId: "",
        aircraftZoneId: "",
    }).then((result) => cy.updateParameter(result.body.data!.id, paramPatch));

    cy.visit("/");

    NavigationBar.ftiButton().click();
    cy.location("pathname").should("include", "/flight-test-instrumentation/overview");

    OverviewPage.openFirstEntry();

    OverviewPage.overviewList().within(() =>
        cy.findAllByRole("button").first().should("include.text", "test description")
    );

    cy.findByRole("heading", { name: /parameter - 123/i }).should("be.visible");

    cy.findByText("Long description").should("be.visible");
});
