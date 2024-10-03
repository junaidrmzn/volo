import { anyRoute } from "@voloiq/flight-planning-api/v1";
import { deleteWaypointInterceptor } from "@voloiq/flight-planning-cypress-interceptors";
import { routeOptionsPage } from "@voloiq/flight-planning-cypress-page-objects";
import {
    mapMounting,
    parisRoute,
    parisRouteOption,
    parisWaypoints as routeWaypoints,
} from "../../../cypress/MapCypressResources";

describe("Waypoint Details Header", () => {
    it("should renders with waypoint info correctly", () => {
        mapMounting({ routes: [parisRoute], routeOption: parisRouteOption }).then(() => {
            routeOptionsPage.map.routesPanel.routeButton(parisRoute.name).click();
            routeOptionsPage.map.waypointsPanel.waypointDetailsButton(routeWaypoints.waypoint_1.name).click();
            cy.findByText(routeWaypoints.waypoint_1.name).should("be.visible");
        });
    });

    it("should open menu by clicking menu button", () => {
        mapMounting({ routes: [parisRoute], routeOption: parisRouteOption }).then(() => {
            routeOptionsPage.map.routesPanel.routeButton(parisRoute.name).click();
            routeOptionsPage.map.waypointsPanel.waypointDetailsButton(routeWaypoints.waypoint_1.name).click();

            cy.findByTestId("waypoint-details-menu-delete").should("not.be.visible");
            cy.findByTestId("waypoint-details-menu-button").click();
            cy.findByTestId("waypoint-details-menu-delete").should("be.visible");
        });
    });

    it("should call mockDeleteWaypoint by clicking delete waypoint button", () => {
        mapMounting({ routes: [parisRoute], routeOption: parisRouteOption }).then(() => {
            routeOptionsPage.map.routesPanel.routeButton(parisRoute.name).click();
            routeOptionsPage.map.waypointsPanel.waypointDetailsButton(routeWaypoints.waypoint_1.name).click();
            cy.findByTestId("waypoint-details-menu-button").click();
            deleteWaypointInterceptor(anyRoute().id, routeWaypoints.waypoint_1.id);
            cy.findByTestId("waypoint-details-menu-delete").click();
        });
    });
});
