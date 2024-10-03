import { anyWaypoint } from "@voloiq/flight-planning-api/v1";
import {
    getRouteOptionInterceptor,
    getRoutesInterceptor,
    getWaypointsInterceptor,
    postCorridorClearanceInterceptor,
    postTerrainInterceptor,
    postWaypointInterceptor,
    putWaypointInterceptor,
} from "@voloiq/flight-planning-cypress-interceptors";
import { routeOptionsPage } from "@voloiq/flight-planning-cypress-page-objects";
import {
    checkIfVoloportsExist,
    hqRoute,
    hqRouteOption,
    hqWaypoints,
    mapMounting,
    parisRoute,
    parisRouteOption,
    parisSecondRoute,
    parisSecondWaypoints,
    parisWaypoints as routeWaypoints,
    parisWaypointsArray as waypoints,
} from "./MapCypressResources";

declare const expect: Chai.ExpectStatic;

export const routeLayerTests = () =>
    describe("Route layer", () => {
        it("Voloports displayed properly on map", () => {
            mapMounting({ routes: [parisRoute], routeOption: parisRouteOption });
            routeOptionsPage.map.routesPanel.routeButton(parisRoute.name).click();
            routeOptionsPage.map.featureShouldBeVisible(
                [routeWaypoints.waypoint_1.lng, routeWaypoints.waypoint_1.lat],
                "waypoints-source"
            );
            checkIfVoloportsExist(routeWaypoints);
        });

        it("Adding a waypoint shouldn't change voloports type ", () => {
            mapMounting({ routes: [parisRoute], routeOption: parisRouteOption });
            routeOptionsPage.map.routesPanel.routeButton(parisRoute.name).click();
            routeOptionsPage.map.featureShouldBeVisible(
                [routeWaypoints.waypoint_1.lng, routeWaypoints.waypoint_1.lat],
                "waypoints-source"
            );
            const newWaypoint = {
                name: "new_waypoint",
                lat: 48.836_452_215,
                lng: 2.267_245_273,
                id: 106,
                routeSequenceIndex: 3,
            };
            const addedNewWaypoint = anyWaypoint({
                ...newWaypoint,
            });
            const copyWaypoints = [...waypoints];
            copyWaypoints.splice(3, 0, addedNewWaypoint);
            const updatedRoute = { ...parisRoute, copyWaypoints };
            getWaypointsInterceptor(parisRoute.id, copyWaypoints);
            getRoutesInterceptor(parisRouteOption.id, [updatedRoute]);
            putWaypointInterceptor(parisRoute.id, addedNewWaypoint.id);
            postTerrainInterceptor(parisRoute.id);
            postCorridorClearanceInterceptor(parisRoute.id);
            checkIfVoloportsExist(routeWaypoints);
        });

        it("Waypoints features are rednered properly", () => {
            mapMounting({ routes: [parisRoute], routeOption: parisRouteOption });
            routeOptionsPage.map.routesPanel.routeButton(parisRoute.name).click();
            routeOptionsPage.map.featureShouldBeVisible(
                [routeWaypoints.waypoint_2.lng, routeWaypoints.waypoint_2.lat],
                "waypoints-source"
            );
        });

        it("User can move a waypoint by drag and dropping", () => {
            mapMounting({ routes: [hqRoute], routeOption: hqRouteOption });
            routeOptionsPage.map.routesPanel.routeButton("Hangar - HQ").click();
            routeOptionsPage.map.featureShouldBeVisible(
                [hqWaypoints.center_waypoint.lng, hqWaypoints.center_waypoint.lat],
                "waypoints-source"
            );
            routeOptionsPage.map.dragAndDropPointOnMap({
                startCoordinates: [8.577_444_742_03, 49.130_843_862_7],
                dragX: 92,
                dragY: -149,
            });
            routeOptionsPage.map.featureShouldBeVisible([8.577_444_742, 49.130_843_627], "waypoints-source");
        });

        it("Route layer is visible after edit and visiblity change", () => {
            mapMounting({ routes: [hqRoute], routeOption: hqRouteOption });
            routeOptionsPage.map.routesPanel.routeButton("Hangar - HQ").click();
            routeOptionsPage.map.featureShouldBeVisible(
                [hqWaypoints.center_waypoint.lng, hqWaypoints.center_waypoint.lat],
                "waypoints-source"
            );
            routeOptionsPage.map.dragAndDropPointOnMap({
                startCoordinates: [hqWaypoints.center_waypoint.lng, hqWaypoints.center_waypoint.lat],
                dragX: 92,
                dragY: -149,
            });
            routeOptionsPage.map.featureShouldBeVisible([8.577_444_742, 49.130_843_627], "waypoints-source");
            routeOptionsPage.map.waypointDetailsPanel.waypointBackButton().click();
            routeOptionsPage.map.routesPanel.routeBackButton().click();
            routeOptionsPage.map.routesPanel.routeButton("Hangar - HQ").click();
            routeOptionsPage.map.validateFeatureData({
                featureCoordinates: [8.569_524, 49.135_35],
                layerId: `route-layer-${hqRoute.id}-layer`,
                dataToValidate: { key: "source", value: `route-layer-${hqRoute.id}-source` },
            });
        });

        it("Only a single waypoint is selected", () => {
            mapMounting({ routes: [parisRoute], routeOption: parisRouteOption });
            routeOptionsPage.map.routesPanel.routeButton(parisRoute.name).click();
            routeOptionsPage.map.featureShouldBeVisible(
                [routeWaypoints.waypoint_2.lng, routeWaypoints.waypoint_2.lat],
                "waypoints-source"
            );
            routeOptionsPage.map.clickOnMap({
                coordinates: [routeWaypoints.waypoint_2.lng, routeWaypoints.waypoint_2.lat],
                isWaypoint: true,
            });
            expect(putWaypointInterceptor(parisRoute.id, routeWaypoints.waypoint_2.id)).not.to.be.equal(true);
            routeOptionsPage.map.validateFeatureData({
                featureCoordinates: [routeWaypoints.waypoint_2.lng, routeWaypoints.waypoint_2.lat],
                layerId: "waypoints-layer",
                dataToValidate: { key: "selected", value: true },
            });
            cy.get('[data-testid="waypoint-details-back-button"]', { withinSubject: null }).should("exist").click();
            routeOptionsPage.map.waypointsPanel.waypointDetailsButton(routeWaypoints.waypoint_1.name).click();
            routeOptionsPage.map.validateFeatureData({
                featureCoordinates: [routeWaypoints.waypoint_2.lng, routeWaypoints.waypoint_2.lat],
                layerId: "waypoints-layer",
                dataToValidate: { key: "selected", value: false },
            });
        });

        it("Waypoints are editable when route segment panel is active", () => {
            mapMounting({ routes: [parisRoute], routeOption: parisRouteOption });
            routeOptionsPage.map.routesPanel.routeButton(parisRoute.name).click();
            routeOptionsPage.map.waypointsPanel.waypointDetailsButton(routeWaypoints.waypoint_1.name).click();
            routeOptionsPage.map.featureShouldBeVisible(
                [routeWaypoints.waypoint_2.lng, routeWaypoints.waypoint_2.lat],
                "waypoints-source"
            );
            putWaypointInterceptor(parisRoute.id, routeWaypoints.waypoint_2.id);
            cy.findByRole("tab", { name: /route segments/i })
                .should("be.visible")
                .click()
                .then(() => {
                    cy.findByText("Route Segments").should("be.visible");
                    cy.findByRole("tab", { name: /waypoint/i }).should("have.attr", "aria-selected", "false");
                });
            routeOptionsPage.map.dragAndDropPointOnMap({
                startCoordinates: [routeWaypoints.waypoint_2.lng, routeWaypoints.waypoint_2.lat],
                dragX: 92,
                dragY: -149,
            });
            routeOptionsPage.map.featureShouldBeVisible([2.251_567_388_19, 48.841_977_714_497], "waypoints-source");
        });

        it("New waypoint added to map and remain selected on map and waypoint details panel", () => {
            mapMounting({ routes: [parisRoute], routeOption: parisRouteOption });
            routeOptionsPage.map.routesPanel.routeButton(parisRoute.name).click();
            routeOptionsPage.map.featureShouldBeVisible(
                [routeWaypoints.waypoint_2.lng, routeWaypoints.waypoint_2.lat],
                "waypoints-source"
            );
            const newWaypoint = {
                name: "new_waypoint",
                lat: 48.828_136_134_53,
                lng: 2.236_890_340_460_547,
                id: 104,
                routeSequenceIndex: 6,
                alt: 150,
                altAboveRefAlt: 150,
                heading: 243,
                rnp: 0.2,
                speed: 20.58,
                targetTimeOver: 127.015,
                transitionRadius: 100,
            };
            postWaypointInterceptor(parisRoute.id, newWaypoint);
            routeOptionsPage.map.clickOnMap({ coordinates: [2.236_890_340_46, 48.828_192_638_548] });
            const addedNewWaypoint = anyWaypoint({
                ...newWaypoint,
            });
            const copyWaypoints = [...waypoints];
            copyWaypoints.splice(3, 0, addedNewWaypoint);
            const updatedRoute = { ...parisRoute, waypoints: copyWaypoints };
            getWaypointsInterceptor(parisRoute.id, copyWaypoints);
            getRoutesInterceptor(parisRouteOption.id, [updatedRoute]);
            routeOptionsPage.map.validateFeatureData({
                featureCoordinates: [2.236_890_340_460_547, 48.828_136_134_53],
                layerId: "waypoints-layer",
                dataToValidate: { key: "selected", value: true },
            });
            routeOptionsPage.map.waypointDetailsPanel.nameInputField().should("have.value", newWaypoint.name);
        });

        it("Once a waypoint is added the user cannot add others at the same time and the waypoint rendered properly", () => {
            mapMounting({ routes: [parisRoute], routeOption: parisRouteOption });
            routeOptionsPage.map.routesPanel.routeButton(parisRoute.name).click();
            routeOptionsPage.map.featureShouldBeVisible(
                [routeWaypoints.waypoint_2.lng, routeWaypoints.waypoint_2.lat],
                "waypoints-source"
            );
            postWaypointInterceptor(parisRoute.id);
            routeOptionsPage.map.clickOnMap({ coordinates: [2.236_890_340_46, 48.828_192_638_548] });
            routeOptionsPage.map.clickOnMap({ coordinates: [2.238_175_175_678_549, 48.829_516_252_342] });
            routeOptionsPage.map.clickOnMap({ coordinates: [2.235_205_789_867_564, 48.827_257_799_007] });
            routeOptionsPage.map.clickOnMap({ coordinates: [2.236_435_826_708, 48.828_213_067_709] });
            routeOptionsPage.map.validateNumberOfWaypoints(6);
        });
        it("A route layer is visible after another route edit", () => {
            mapMounting({ routes: [parisRoute, parisSecondRoute], routeOption: parisRouteOption });
            routeOptionsPage.map.routesPanel.routeButton(parisRoute.name).click();
            routeOptionsPage.map.featureShouldBeVisible(
                [routeWaypoints.waypoint_2.lng, routeWaypoints.waypoint_2.lat],
                "waypoints-source"
            );
            putWaypointInterceptor(parisRoute.id, routeWaypoints.waypoint_2.id);
            routeOptionsPage.map.dragAndDropPointOnMap({
                startCoordinates: [routeWaypoints.waypoint_2.lng, routeWaypoints.waypoint_2.lat],
                dragX: 50,
                dragY: 100,
            });
            routeOptionsPage.map.featureShouldBeVisible([2.243_626_163, 48.833_591_221], "waypoints-source");
            routeOptionsPage.map.waypointDetailsPanel.waypointBackButton().click();
            routeOptionsPage.map.routesPanel.routeBackButton().click();
            routeOptionsPage.map.routesPanel.routeButton(parisSecondRoute.name).click();
            routeOptionsPage.map.featureShouldBeVisible(
                [parisSecondWaypoints.waypoint_2.lng, parisSecondWaypoints.waypoint_2.lat],
                "waypoints-source"
            );
            routeOptionsPage.map.featureShouldBeVisible(
                [parisSecondWaypoints.waypoint_2.lng, parisSecondWaypoints.waypoint_2.lat],
                `route-layer-${parisSecondRoute.id}-source`
            );
        });
        it("A route options validation status updates on energy calculation", () => {
            mapMounting({ routes: [parisRoute], routeOption: parisRouteOption });
            routeOptionsPage.map.routesPanel.routeButton(parisRoute.name).click();
            routeOptionsPage.map.featureShouldBeVisible(
                [routeWaypoints.waypoint_2.lng, routeWaypoints.waypoint_2.lat],
                "waypoints-source"
            );
            routeOptionsPage.map.routesPanel.routeOptionValidationStatus("Valid").should("be.visible");
            routeOptionsPage.map.featureShouldBeVisible([2.243_626_163, 48.833_591_221], "waypoints-source");
            getRouteOptionInterceptor({ ...parisRouteOption, validForOperation: false });
            routeOptionsPage.map.mapButtons.toggleRemaningEnergyPanel().click();
            routeOptionsPage.map.routesPanel.routeOptionValidationStatus("Invalid").should("be.visible");
            routeOptionsPage.map.flightStatusBar.routeValidationStatus("NOT VALIDATED").should("be.visible");
        });
        it("A route validation status updates on route change", () => {
            mapMounting({ routes: [parisRoute], routeOption: parisRouteOption });
            routeOptionsPage.map.routesPanel.routeButton(parisRoute.name).click();
            routeOptionsPage.map.featureShouldBeVisible(
                [routeWaypoints.waypoint_2.lng, routeWaypoints.waypoint_2.lat],
                "waypoints-source"
            );
            routeOptionsPage.map.flightStatusBar.routeValidationStatus("VALID").should("be.visible");
            routeOptionsPage.map.routesPanel.routeOptionValidationStatus("Valid").should("be.visible");
            putWaypointInterceptor(parisRoute.id, routeWaypoints.waypoint_2.id);
            getRouteOptionInterceptor({ ...parisRouteOption, validForOperation: false });
            routeOptionsPage.map.dragAndDropPointOnMap({
                startCoordinates: [routeWaypoints.waypoint_2.lng, routeWaypoints.waypoint_2.lat],
                dragX: 50,
                dragY: 100,
            });
            routeOptionsPage.map.featureShouldBeVisible([2.243_626_163, 48.833_591_221], "waypoints-source");
            routeOptionsPage.map.flightStatusBar.routeValidationStatus("NOT VALIDATED").should("be.visible");
            routeOptionsPage.map.routesPanel.routeOptionValidationStatus("Invalid").should("be.visible");
        });
    });
