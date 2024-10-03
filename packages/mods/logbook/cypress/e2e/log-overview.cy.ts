import type { Aircraft, Location } from "@voloiq-typescript-api/logbook-types";
import { add, sub } from "date-fns";
import { formatUTCDate } from "@voloiq/utils";
import { DateTimePicker } from "../page-objects/datepicker";
import { FilterPanel } from "../page-objects/filter-panel";
import { FilterTags } from "../page-objects/filter-tags";
import { LogOverviewPage } from "../page-objects/log-overview";
import { NavigationBar } from "../page-objects/navigation-bar";
import { Pagination } from "../page-objects/pagination";
import { SortPanel } from "../page-objects/sort-panel";

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

it("User can filter the overview list ", () => {
    let date = new Date("2022-05-03T14:31:12Z");

    for (let index = 0; index < 30; index++) {
        cy.createLog({
            locationId: createdLocation.id,
            aircraftId: createdAircraft.id,
            date: date.toISOString(),
        });

        date = add(date, { days: 1 });
    }

    cy.visit("/");

    NavigationBar.logbookButton().click();
    NavigationBar.overviewButton().click();

    cy.location("pathname").should("include", "/logbook/overview");
    LogOverviewPage.overviewList().within(() => cy.findAllByRole("listitem").should("have.length", 10));

    LogOverviewPage.filterButton().click();
    FilterPanel.selectLocation(createdLocation.icaoCode);
    FilterPanel.selectAircraft(
        `${createdAircraft.productLine} - ${createdAircraft.aircraftType} - ${createdAircraft.msn}`
    );
    FilterPanel.applyButton().click();

    LogOverviewPage.overviewList().within(() => cy.findAllByRole("listitem").should("have.length", 10));

    FilterPanel.toDatePicker().click();
    DateTimePicker.selectDateTime(date);

    FilterPanel.fromDatePicker().click();
    DateTimePicker.selectDateTime(sub(date, { days: 2 }));

    // The time selection of the flatpickr has a debounce time that the test must wait before pressing the "Apply" button. Otherwise, the time changes may not be set correctly and may be lost. https://github.com/flatpickr/flatpickr/issues/1951
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(200);

    FilterPanel.applyButton().click();

    LogOverviewPage.overviewList().within(() => cy.findAllByRole("listitem").should("have.length", 2));

    FilterTags.findFlightDateRangeFilter("2022-05-31, 14:31", "2022-06-02, 14:31").should("be.visible");
    FilterTags.closeFilterTag("Log Filter Tags : Flight date");
    FilterTags.findFlightDateFilter().should("not.exist");
    LogOverviewPage.overviewList().within(() => cy.findAllByRole("listitem").should("have.length", 10));
});

it("User can sort the overview list ", () => {
    let date = new Date("2022-05-03T14:31:12Z");
    const firstDate = add(date, { days: 1 });

    for (let index = 0; index < 30; index++) {
        date = add(date, { days: 1 });
        cy.createLog({
            locationId: createdLocation.id,
            aircraftId: createdAircraft.id,
            date: date.toISOString(),
        });
    }

    cy.visit("/");

    NavigationBar.logbookButton().click();
    NavigationBar.overviewButton().click();

    cy.location("pathname").should("include", "/logbook/overview");

    LogOverviewPage.overviewList().within(() =>
        cy.findAllByRole("listitem").first().should("include.text", formatUTCDate(date))
    );

    LogOverviewPage.sortButton().click();

    SortPanel.ascendingRadioButton().should("not.be.checked");
    SortPanel.descendingRadioButton().should("be.checked");

    SortPanel.selectAscendingSorting();
    SortPanel.applyButton().click();

    LogOverviewPage.overviewList().within(() =>
        cy.findAllByRole("listitem").first().should("include.text", formatUTCDate(firstDate))
    );

    LogOverviewPage.sortButton().click();
    SortPanel.ascendingRadioButton().should("be.checked");
    SortPanel.descendingRadioButton().should("not.be.checked");
    SortPanel.selectDescendingSorting();
    SortPanel.applyButton().click();

    LogOverviewPage.overviewList().within(() =>
        cy.findAllByRole("listitem").first().should("include.text", formatUTCDate(date))
    );

    LogOverviewPage.sortButton().click();
    SortPanel.selectAscendingSorting();
    SortPanel.ascendingRadioButton().should("be.checked");
    SortPanel.descendingRadioButton().should("not.be.checked");
    SortPanel.cancelButton().click();
    LogOverviewPage.sortButton().click();
    SortPanel.ascendingRadioButton().should("not.be.checked");
    SortPanel.descendingRadioButton().should("be.checked");
});

it("User can use the pagination in the overview list ", () => {
    let date = new Date("2022-05-03T14:31:12Z");

    for (let index = 0; index < 30; index++) {
        date = add(date, { days: 1 });
        cy.createLog({
            locationId: createdLocation.id,
            aircraftId: createdAircraft.id,
            date: date.toISOString(),
        });
    }

    const pageOneStartDate = date;
    const pageTwoStartDate = sub(date, { days: 10 });
    const pageThreeStartDate = sub(date, { days: 20 });

    cy.visit("/");

    NavigationBar.logbookButton().click();
    NavigationBar.overviewButton().click();

    cy.location("pathname").should("include", "/logbook/overview");

    LogOverviewPage.overviewList().within(() =>
        cy.findAllByRole("listitem").first().should("include.text", formatUTCDate(pageOneStartDate))
    );

    Pagination.jumpToNextPage();
    LogOverviewPage.overviewList().within(() =>
        cy.findAllByRole("listitem").first().should("include.text", formatUTCDate(pageTwoStartDate))
    );

    date.setDate(date.getDate() - 10);
    Pagination.jumpToNextPage();
    LogOverviewPage.overviewList().within(() =>
        cy.findAllByRole("listitem").first().should("include.text", formatUTCDate(pageThreeStartDate))
    );

    date.setDate(date.getDate() + 10);
    Pagination.jumpToPreviousPage();
    LogOverviewPage.overviewList().within(() =>
        cy.findAllByRole("listitem").first().should("include.text", formatUTCDate(pageTwoStartDate))
    );
});
