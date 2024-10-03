import { routeOptionsPage } from "@voloiq/flight-planning-cypress-page-objects";
import {
    checkIfVoloportsExist,
    parisVerticalProfileWaypoints as coridorRouteWaypoints,
    mapMounting,
    parisObstaclesArray,
    parisRoute,
    parisRouteOption,
    parisVerticalProfileRoute,
    parisWaypoints as routeWaypoints,
} from "./MapCypressResources";
import { validateDataFromImage } from "./utils";

declare const expect: Chai.ExpectStatic;

export const corridorClearanceTests = () =>
    describe("Corridor Clearance", () => {
        it("Obstacles are displayed on the map with the appropiate data", () => {
            mapMounting({ routes: [parisRoute], routeOption: parisRouteOption });
            routeOptionsPage.map.routesPanel.routeButton(parisRoute.name).click();
            routeOptionsPage.map.featureShouldBeVisible(
                [routeWaypoints.waypoint_1.lng, routeWaypoints.waypoint_1.lat],
                "waypoints-source"
            );
            cy.window().then((window) => {
                const map = window.getMap();
                if (map && parisObstaclesArray[0]) {
                    const firstObstacle = parisObstaclesArray[0];
                    routeOptionsPage.map.featureShouldBeVisible(
                        [firstObstacle.geom.lng, firstObstacle.geom.lat],
                        "obstacles-source"
                    );
                    for (const obstacle of parisObstaclesArray) {
                        routeOptionsPage.map.validateFeatureData({
                            featureCoordinates: [obstacle.geom.lng, obstacle.geom.lat],
                            layerId: "obstacles-layer",
                            dataToValidate: { key: "obstacleType", value: obstacle.obstacleType },
                        });
                    }
                }
            });
        });
        it("Obstacle's popup displayed with correct data", () => {
            mapMounting({ routes: [parisRoute], routeOption: parisRouteOption });
            routeOptionsPage.map.routesPanel.routeButton(parisRoute.name).click();
            routeOptionsPage.map.featureShouldBeVisible(
                [routeWaypoints.waypoint_1.lng, routeWaypoints.waypoint_1.lat],
                "waypoints-source"
            );
            cy.window().then((window) => {
                const map = window.getMap();
                if (map && parisObstaclesArray[0]) {
                    const obstacle = parisObstaclesArray[0];
                    routeOptionsPage.map.featureShouldBeVisible(
                        [obstacle.geom.lng, obstacle.geom.lat],
                        "obstacles-source"
                    );
                    routeOptionsPage.map.validateObstaclePopupData({
                        featureCoordinates: [obstacle.geom.lng, obstacle.geom.lat],
                        obstacleType: obstacle.isCollision ? "Terrain collision" : "Clearance violation",
                    });
                }
            });
        });

        it("Route layer is rendered with a corridor", async () => {
            mapMounting({ routes: [parisVerticalProfileRoute], routeOption: parisRouteOption });
            routeOptionsPage.map.routesPanel.routeButton(parisVerticalProfileRoute.name).click();
            routeOptionsPage.verticalProfile.verticalProfile().should("be.visible");
            routeOptionsPage.map.featureShouldBeVisible(
                [coridorRouteWaypoints.waypoint_1.lng, coridorRouteWaypoints.waypoint_1.lat],
                "waypoints-source"
            );
            checkIfVoloportsExist(coridorRouteWaypoints);
            const mapCanvas = await routeOptionsPage.map.getMapCanvas();
            const comparisonResults = await validateDataFromImage(mapCanvas, "withCorridor", "map", "jpeg");
            expect(comparisonResults).to.be.equal(true);
        });

        it("Short route layer is rendered without a corridor", async () => {
            mapMounting({ routes: [parisRoute], routeOption: parisRouteOption });
            routeOptionsPage.map.routesPanel.routeButton(parisRoute.name).click();
            routeOptionsPage.verticalProfile.verticalProfile().should("be.visible");
            routeOptionsPage.map.featureShouldBeVisible(
                [routeWaypoints.waypoint_1.lng, routeWaypoints.waypoint_1.lat],
                "waypoints-source"
            );
            checkIfVoloportsExist(routeWaypoints);
            const mapCanvas = await routeOptionsPage.map.getMapCanvas();
            const comparisonResults = await validateDataFromImage(mapCanvas, "withoutCorridor", "map", "jpeg");
            expect(comparisonResults).to.be.equal(true);
        });
    });
