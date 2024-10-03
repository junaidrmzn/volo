/* eslint-disable cypress/no-unnecessary-waiting */
import { anyRoute, anyWaypoint } from "@voloiq/flight-planning-api/v1";
import { putWaypointInterceptor } from "@voloiq/flight-planning-cypress-interceptors";
import { routeOptionsPage } from "@voloiq/flight-planning-cypress-page-objects";
import { Select } from "../../../../cypress/page-objects";
import {
    mapMounting,
    parisRoute,
    parisRouteOption,
    parisWaypoints as routeWaypoints,
} from "../../../cypress/MapCypressResources";
import { convertWaypointUnitsForDisplay } from "../../../utils/convertWaypointUnits";
import { makeGetAirspacesInterceptor, makeGetVerticalTerrainInterceptor } from "../../__mocks__/cypress";

const mockedWaypoint = anyWaypoint({ alt: 150, altAboveRefAlt: 150, ...routeWaypoints.waypoint_1 });

describe("Waypoint Details", () => {
    beforeEach(() => {
        makeGetVerticalTerrainInterceptor();
        makeGetAirspacesInterceptor();
    });

    it("should renders with waypoint info correctly", () => {
        const convertedWaypoint = convertWaypointUnitsForDisplay(mockedWaypoint);
        mapMounting({ routes: [parisRoute], routeOption: parisRouteOption });
        routeOptionsPage.map.routesPanel.routeButton(parisRoute.name).click();
        routeOptionsPage.map.waypointsPanel.waypointDetailsButton(routeWaypoints.waypoint_1.name).click();
        routeOptionsPage.map.featureShouldBeVisible(
            [routeWaypoints.waypoint_1.lng, routeWaypoints.waypoint_1.lat],
            "waypoints-source"
        );
        cy.findByTestId("waypoint-details-heading").should("have.text", convertedWaypoint.name);
        cy.findByLabelText("Altitude (ft):*").should("have.value", convertedWaypoint.alt);
        cy.findByLabelText("Heading (deg):*").should("have.value", convertedWaypoint.heading);
        cy.findByLabelText("Target Speed (kn):*").should("have.value", convertedWaypoint.speed);
        cy.findByLabelText("Latitude (deg):*").should("have.value", convertedWaypoint.lat);
        cy.findByLabelText("Longitude (deg):*").should("have.value", convertedWaypoint.lng);
        cy.findByLabelText("RNP (nm):*").should("have.value", convertedWaypoint.rnp);
    });

    it("should triggers correct validations latitude(-90/90)", () => {
        mapMounting({ routes: [parisRoute], routeOption: parisRouteOption });
        routeOptionsPage.map.routesPanel.routeButton(parisRoute.name).click();
        routeOptionsPage.map.waypointsPanel.waypointDetailsButton(routeWaypoints.waypoint_1.name).click();
        routeOptionsPage.map.featureShouldBeVisible(
            [routeWaypoints.waypoint_1.lng, routeWaypoints.waypoint_1.lat],
            "waypoints-source"
        );
        cy.findByLabelText("Latitude (deg):*").clear();
        cy.findByLabelText("Latitude (deg):*").type("110");
        cy.findByRole("button", { name: /save/i }).click();
        cy.findByText("Latitude (deg) must be lower than 90").should("be.visible");
    });

    it("should triggers correct validations longitude (-180/180)", () => {
        mapMounting({ routes: [parisRoute], routeOption: parisRouteOption });
        routeOptionsPage.map.routesPanel.routeButton(parisRoute.name).click();
        routeOptionsPage.map.waypointsPanel.waypointDetailsButton(routeWaypoints.waypoint_1.name).click();
        routeOptionsPage.map.featureShouldBeVisible(
            [routeWaypoints.waypoint_1.lng, routeWaypoints.waypoint_1.lat],
            "waypoints-source"
        );
        cy.findByLabelText("Longitude (deg):*").clear();
        cy.findByLabelText("Longitude (deg):*").type("200");
        cy.findByRole("button", { name: /save/i }).click();
        cy.findByText("Longitude (deg) must be lower than 180").should("be.visible");
    });

    it("should render delete waypoint button", () => {
        mapMounting({ routes: [parisRoute], routeOption: parisRouteOption });
        routeOptionsPage.map.routesPanel.routeButton(parisRoute.name).click();
        routeOptionsPage.map.waypointsPanel.waypointDetailsButton(routeWaypoints.waypoint_1.name).click();
        routeOptionsPage.map.featureShouldBeVisible(
            [routeWaypoints.waypoint_1.lng, routeWaypoints.waypoint_1.lat],
            "waypoints-source"
        );
        cy.findByTestId("waypoint-details-menu-button").should("be.visible");
        cy.findByTestId("waypoint-details-menu-button").click();

        cy.findByTestId("waypoint-details-menu-delete").should("be.visible");
        cy.findByTestId("waypoint-details-menu-delete").click();
    });

    it("waypoint altitude AGL / AMSL select should trigger input to show correct value", () => {
        const convertedWaypoint = convertWaypointUnitsForDisplay(mockedWaypoint);
        mapMounting({ routes: [parisRoute], routeOption: parisRouteOption });
        routeOptionsPage.map.routesPanel.routeButton(parisRoute.name).click();
        routeOptionsPage.map.waypointsPanel.waypointDetailsButton(routeWaypoints.waypoint_1.name).click();

        routeOptionsPage.map.featureShouldBeVisible(
            [routeWaypoints.waypoint_1.lng, routeWaypoints.waypoint_1.lat],
            "waypoints-source"
        );
        cy.findByLabelText("Altitude (ft):*").should("have.value", convertedWaypoint.alt);

        Select.selectByOptionName("Altitude Reference:", "AGL");

        cy.findByLabelText("Altitude (ft):*").should("have.value", convertedWaypoint.altAboveRefAlt);
    });

    it("should display Route Segment panel", () => {
        mapMounting({ routes: [parisRoute], routeOption: parisRouteOption });
        routeOptionsPage.map.routesPanel.routeButton(parisRoute.name).click();
        routeOptionsPage.map.waypointsPanel.waypointDetailsButton(routeWaypoints.waypoint_1.name).click();
        routeOptionsPage.map.featureShouldBeVisible(
            [routeWaypoints.waypoint_1.lng, routeWaypoints.waypoint_1.lat],
            "waypoints-source"
        );
        cy.findByRole("tab", { name: /route segments/i })
            .should("be.visible")
            .click()
            .then(() => {
                cy.findByText("Route Segments").should("be.visible");
                cy.findByRole("tab", { name: /waypoint/i }).should("have.attr", "aria-selected", "false");
            });
    });

    it("should edit waypoint and sent put request", () => {
        mapMounting({ routes: [parisRoute], routeOption: parisRouteOption }).then(() => {
            routeOptionsPage.map.routesPanel.routeButton(parisRoute.name).click();
            routeOptionsPage.map.waypointsPanel.waypointDetailsButton(routeWaypoints.waypoint_1.name).click();
            putWaypointInterceptor(anyRoute().id, routeWaypoints.waypoint_1.id);
            cy.findByLabelText("Altitude (ft):*").clear();
            cy.findByLabelText("Altitude (ft):*").type("200");
            cy.findByRole("button", { name: /save/i }).click();
        });
    });
});
