import { putWaypointInterceptor, putWaypointInterceptorWithObject } from "@voloiq/flight-planning-cypress-interceptors";
import { routeOptionsPage } from "@voloiq/flight-planning-cypress-page-objects";
import {
    checkIfVoloportsExist,
    mapMounting,
    parisRoute,
    parisRouteOption,
    parisVerticalProfileRoute,
    parisWaypoints,
    parisVerticalProfileWaypoints as routeWaypoints,
} from "./MapCypressResources";
import { validateDataFromImage } from "./utils";

declare const expect: Chai.ExpectStatic;

export const verticalProfileTests = () =>
    describe("Vertical Profile", () => {
        it("Vertical profile data is rendered and displayed properly", async () => {
            mapMounting({ routes: [parisVerticalProfileRoute], routeOption: parisRouteOption });
            routeOptionsPage.map.routesPanel.routeButton(parisVerticalProfileRoute.name).click();
            routeOptionsPage.verticalProfile.verticalProfile().should("be.visible");
            routeOptionsPage.map.featureShouldBeVisible(
                [routeWaypoints.waypoint_1.lng, routeWaypoints.waypoint_1.lat],
                "waypoints-source"
            );
            checkIfVoloportsExist(routeWaypoints);
            const verticalGraphImage = await routeOptionsPage.verticalProfile.getVerticalGraphImageData();
            const comparisonResults = await validateDataFromImage(verticalGraphImage, "init", "graph");
            expect(comparisonResults).to.be.equal(true);
        });
        it("Vertical profile is reflecting a waypoint update", async () => {
            mapMounting({ routes: [parisVerticalProfileRoute], routeOption: parisRouteOption });
            routeOptionsPage.map.routesPanel.routeButton(parisVerticalProfileRoute.name).click();
            routeOptionsPage.verticalProfile.verticalProfile().should("be.visible");
            routeOptionsPage.map.featureShouldBeVisible(
                [routeWaypoints.waypoint_1.lng, routeWaypoints.waypoint_1.lat],
                "waypoints-source"
            );
            routeOptionsPage.map.clickOnMap({
                coordinates: [routeWaypoints.waypoint_2.lng, routeWaypoints.waypoint_2.lat],
                isWaypoint: true,
            });
            const newAltitude = 100;
            expect(putWaypointInterceptor(parisVerticalProfileRoute.id, routeWaypoints.waypoint_2.id)).not.to.be.equal(
                true
            );
            putWaypointInterceptorWithObject(parisVerticalProfileRoute.id, routeWaypoints.waypoint_2.id, {
                ...routeWaypoints.waypoint_2,
                alt: newAltitude,
            }).as("updateWaypointAltitude");
            routeOptionsPage.map.validateFeatureData({
                featureCoordinates: [routeWaypoints.waypoint_2.lng, routeWaypoints.waypoint_2.lat],
                layerId: "waypoints-layer",
                dataToValidate: { key: "selected", value: true },
            });
            routeOptionsPage.map.waypointDetailsPanel.altitudeInputField().clear();
            routeOptionsPage.map.waypointDetailsPanel.altitudeInputField().type(newAltitude.toString());
            routeOptionsPage.map.waypointDetailsPanel.saveButton().click();
            routeOptionsPage.map.validateFeatureData({
                featureCoordinates: [routeWaypoints.waypoint_2.lng, routeWaypoints.waypoint_2.lat],
                layerId: "waypoints-layer",
                dataToValidate: { key: "selected", value: false },
            });
            const verticalGraphImage = await routeOptionsPage.verticalProfile.getVerticalGraphImageData();
            const comparisonResults = await validateDataFromImage(verticalGraphImage, "update", "graph");
            expect(comparisonResults).to.be.equal(true);
        });
        it("A vertical profile without corridor on short route", async () => {
            mapMounting({ routes: [parisRoute], routeOption: parisRouteOption });
            routeOptionsPage.map.routesPanel.routeButton(parisRoute.name).click();
            routeOptionsPage.verticalProfile.verticalProfile().should("be.visible");
            routeOptionsPage.map.featureShouldBeVisible(
                [parisWaypoints.waypoint_1.lng, parisWaypoints.waypoint_1.lat],
                "waypoints-source"
            );
            checkIfVoloportsExist(routeWaypoints);
            const verticalGraphImage = await routeOptionsPage.verticalProfile.getVerticalGraphImageData();
            const comparisonResults = await validateDataFromImage(verticalGraphImage, "noCorridor", "graph");
            expect(comparisonResults).to.be.equal(true);
        });
    });
