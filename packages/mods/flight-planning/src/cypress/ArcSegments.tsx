import { anyRoute, anyWaypoint } from "@voloiq/flight-planning-api/v1";
import {
    getRoutesInterceptor,
    getWaypointsInterceptor,
    postSegmentInterceptor,
    putSegmentInterceptor,
    putWaypointInterceptor,
} from "@voloiq/flight-planning-cypress-interceptors";
import { routeOptionsPage } from "@voloiq/flight-planning-cypress-page-objects";
import { hqRoute, hqRouteOption, mapMounting, mountMap, setupInterceptors } from "./MapCypressResources";

declare const expect: Chai.ExpectStatic;
export const arcSegmentsTests = () =>
    describe("Arc segments", () => {
        it("User can create a new route with an arc segment", () => {
            mapMounting({ routes: [hqRoute], routeOption: hqRouteOption }).then(() => {
                routeOptionsPage.map.routesPanel.routeButton("Hangar - HQ").click();
                routeOptionsPage.map.waypointsPanel.waypointDetailsButton("Waypoint 2").click();
                routeOptionsPage.map.waypointDetailsPanel.routeSegmentsTab().click();
                routeOptionsPage.map.waypointDetailsPanel.turnButton().click();
                routeOptionsPage.map.waypointDetailsPanel.radiusInputField().should("have.value", 711.75);
                routeOptionsPage.map.centerPointMarker().should("be.visible");
                routeOptionsPage.map.waypointDetailsPanel.radiusInputField().clear().type("500").blur();
                postSegmentInterceptor(hqRoute.id, 2).as("postSegmentInterceptor");
                routeOptionsPage.map.waypointDetailsPanel.saveButton().click();
                cy.get("@postSegmentInterceptor")
                    .its("request.body")
                    .should((requestBody) => {
                        const { segmentType, segmentData } = requestBody;

                        expect(segmentType).to.equal("arc");

                        const { radius, latitude, longitude } = segmentData;

                        expect(radius).to.equal(500);
                        expect(latitude).to.be.approximately(49.133_644_076_664_5, 0.000_000_001);
                        expect(longitude).to.be.approximately(8.572_067_928_339_608, 0.000_000_001);
                    });
            });
        });

        it("User can move a waypoint with an arc segment by drag and dropping", () => {
            const routeOption = hqRouteOption;
            const departureWaypoint = anyWaypoint({
                ...routeOption.departureExternalVertiport,
                id: 1,
                routeSequenceIndex: 0,
            });
            const centerWaypoint = anyWaypoint({
                name: "Waypoint 2",
                lat: 49.130_843_862_7,
                lng: 8.577_444_742_03,
                id: 2,
                routeSequenceIndex: 1,
                routeSegment: {
                    id: 1,
                    latitude: 49.133_644_076_664_52,
                    longitude: 8.572_067_928_339_612,
                    radius: 500,
                    type: "arc",
                    isInverted: false,
                },
            });
            const arrivalWaypoint = anyWaypoint({
                ...routeOption.arrivalExternalVertiport,
                id: 3,
                routeSequenceIndex: 2,
            });
            const waypoints = [departureWaypoint, centerWaypoint, arrivalWaypoint];
            const route = anyRoute({
                name: "Hangar - HQ",
                waypoints,
            });
            setupInterceptors({ routes: [route], routeOption, waypoints });
            mountMap(routeOption.id);

            routeOptionsPage.map.routesPanel.routeButton("Hangar - HQ").click();
            routeOptionsPage.map.featureShouldBeVisible([8.577_444_742_03, 49.130_843_862_7], "waypoints-source");

            const updatedCenterWaypoint = anyWaypoint({
                ...centerWaypoint,
                lat: 49.139_225_904_1,
                lng: 8.585_363_042_5,
                routeSegment: {
                    id: 1,
                    latitude: 49.136_630_220_503_23,
                    longitude: 8.575_210_736_661_061,
                    radius: 794,
                    type: "arc",
                    isInverted: false,
                },
            });
            const updatedWaypoints = [departureWaypoint, updatedCenterWaypoint, arrivalWaypoint];
            const updatedRoute = { ...route, waypoints: updatedWaypoints };
            getWaypointsInterceptor(route.id, updatedWaypoints);
            getRoutesInterceptor(routeOption.id, [updatedRoute]);
            putWaypointInterceptor(route.id, centerWaypoint.id);
            putSegmentInterceptor(route.id, centerWaypoint.id).as("putSegmentInterceptor");
            routeOptionsPage.map.dragAndDropPointOnMap({
                startCoordinates: [8.577_444_742_03, 49.130_843_862_7],
                dragX: 92,
                dragY: -149,
            });
            cy.get("@putSegmentInterceptor")
                .its("request.body")
                .should((requestBody) => {
                    const { segmentType, segmentData } = requestBody;

                    expect(segmentType).to.equal("arc");

                    const { radius, latitude, longitude } = segmentData;

                    expect(radius).to.equal(794);
                    expect(latitude).to.be.approximately(49.136_630_220_503_23, 0.000_000_001);
                    expect(longitude).to.be.approximately(8.575_210_736_661_061, 0.000_000_001);
                });
            routeOptionsPage.map.featureShouldBeVisible([8.585_363_042_5, 49.139_225_904_1], "waypoints-source");
        });

        it("User can move a waypoint with two arc segments by drag and dropping", () => {
            const routeOption = hqRouteOption;
            const departureWaypoint = anyWaypoint({
                ...routeOption.departureExternalVertiport,
                id: 1,
                routeSequenceIndex: 0,
                routeSegment: {
                    id: 2,
                    radius: 711.75,
                    latitude: 49.133_857_492_405_99,
                    longitude: 8.586_075_751_288_599,
                    type: "arc",
                    isInverted: true,
                },
            });
            const centerWaypoint = anyWaypoint({
                name: "Waypoint 2",
                lat: 49.130_843_862_7,
                lng: 8.577_444_742_03,
                id: 2,
                routeSequenceIndex: 1,
                routeSegment: {
                    id: 1,
                    latitude: 49.133_644_076_664_52,
                    longitude: 8.572_067_928_339_612,
                    radius: 500,
                    type: "arc",
                    isInverted: false,
                },
            });
            const arrivalWaypoint = anyWaypoint({
                ...routeOption.arrivalExternalVertiport,
                id: 3,
                routeSequenceIndex: 2,
            });
            const waypoints = [departureWaypoint, centerWaypoint, arrivalWaypoint];
            const route = anyRoute({
                name: "Hangar - HQ",
                waypoints,
            });
            setupInterceptors({ routes: [route], routeOption, waypoints });
            mountMap(routeOption.id);

            routeOptionsPage.map.routesPanel.routeButton("Hangar - HQ").click();
            routeOptionsPage.map.featureShouldBeVisible([8.577_444_742_03, 49.130_843_862_7], "waypoints-source");

            const updatedDepartureWaypoint = anyWaypoint({
                ...departureWaypoint,
                routeSegment: {
                    id: 2,
                    radius: 711.75,
                    latitude: 49.133_857_492_405_99,
                    longitude: 8.586_075_751_288_599,
                    type: "arc",
                    isInverted: true,
                },
            });
            const updatedCenterWaypoint = anyWaypoint({
                ...centerWaypoint,
                lat: 49.139_225_904_1,
                lng: 8.585_363_042_5,
                routeSegment: {
                    id: 1,
                    latitude: 49.136_630_220_503_23,
                    longitude: 8.575_210_736_661_061,
                    radius: 794,
                    isInverted: false,
                    type: "arc",
                },
            });
            const updatedWaypoints = [updatedDepartureWaypoint, updatedCenterWaypoint, arrivalWaypoint];
            const updatedRoute = { ...route, waypoints: updatedWaypoints };
            getWaypointsInterceptor(route.id, updatedWaypoints);
            getRoutesInterceptor(routeOption.id, [updatedRoute]);
            putWaypointInterceptor(route.id, centerWaypoint.id).as("putWaypointInterceptor");
            putSegmentInterceptor(route.id, centerWaypoint.id).as("putCenterSegmentInterceptor");
            putSegmentInterceptor(route.id, departureWaypoint.id).as("putDepartureSegmentInterceptor");
            routeOptionsPage.map.dragAndDropPointOnMap({
                startCoordinates: [8.577_444_742_03, 49.130_843_862_7],
                dragX: 92,
                dragY: -149,
            });
            cy.get("@putCenterSegmentInterceptor")
                .its("request.body")
                .should((requestBody) => {
                    const { segmentType, segmentData } = requestBody;

                    expect(segmentType).to.equal("arc");

                    const { radius, latitude, longitude } = segmentData;

                    expect(radius).to.equal(794);
                    expect(latitude).to.be.approximately(49.136_630_220_503_23, 0.000_000_001);
                    expect(longitude).to.be.approximately(8.575_210_736_661_061, 0.000_000_001);
                });
            cy.get("@putDepartureSegmentInterceptor")
                .its("request.body")
                .should((requestBody) => {
                    const { segmentType, segmentData } = requestBody;

                    expect(segmentType).to.equal("arc");

                    const { radius, latitude, longitude } = segmentData;

                    expect(radius).to.equal(711.75);
                    expect(latitude).to.be.approximately(49.134_188_111_553_12, 0.000_000_001);
                    expect(longitude).to.be.approximately(8.591_597_934_906_73, 0.000_000_001);
                });
            cy.get("@putWaypointInterceptor")
                .its("request.body")
                .should((requestBody) => {
                    const { lat, lng } = requestBody;
                    expect(lat).to.be.approximately(49.139_155_217_237_29, 0.000_000_001);
                    expect(lng).to.be.approximately(8.585_426_996_051_893, 0.000_000_001);
                });
            routeOptionsPage.map.featureShouldBeVisible([8.585_363_042_5, 49.139_225_904_1], "waypoints-source");
        });
    });
