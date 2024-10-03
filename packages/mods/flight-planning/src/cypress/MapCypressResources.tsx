import { Box } from "@volocopter/design-library-react";
import { AppShell } from "@voloiq/app-shell";
import { authConfigurationStub } from "@voloiq/auth";
import {
    Route,
    RouteOption,
    Waypoint,
    anyRoute,
    anyRouteOption,
    anyVertiport,
    anyWaypoint,
} from "@voloiq/flight-planning-api/v1";
import {
    getCorridorClearanceInterceptor,
    getCsflSitesInterceptor,
    getExternalAircraftTypesInterceptor,
    getRouteOptionInterceptor,
    getRoutesInterceptor,
    getSelectedCsflSitesInterceptor,
    getTerrainDataInterceptor,
    getWaypointsInterceptor,
    postCorridorClearanceInterceptor,
    postTerrainInterceptor,
} from "@voloiq/flight-planning-cypress-interceptors";
import { routeOptionsPage } from "@voloiq/flight-planning-cypress-page-objects";
import { MapFocusController } from "@voloiq/map";
import { MemoryRouter } from "@voloiq/routing";
import { ServiceProvider } from "@voloiq/service";
import { AppWithoutProviders } from "../App";
import { FlightStatusProvider } from "../contexts/flight-status";
import { ReactQueryClientProvider } from "../contexts/queryclient/ReactQueryContext";
import { SegmentEditingProvider } from "../features/map-route-layer/segment-editing";
import { SelectedRouteSequenceIndexProvider } from "../features/selected-route-sequence-index";
import { mockTerrainData } from "./utils";

export const corridorClearanceDataFotVerticalProfileTests = {
    corridorObstacles: [
        {
            obstacleGeom: "POINT(2.27485 48.89429)",
            obstacleHeight: 350,
            obstacleType: "corridor_obstacle",
            isCollision: true,
            isClearanceViolation: false,
        },
        {
            obstacleGeom: "POINT(2.2989 48.8997)",
            obstacleHeight: 650,
            obstacleType: "highest_obstacle",
            isCollision: true,
            isClearanceViolation: false,
        },
        {
            obstacleGeom: "POINT(2.22469324 48.82866422)",
            obstacleHeight: 130,
            obstacleType: "corridor_obstacle",
            isCollision: false,
            isClearanceViolation: true,
        },
        {
            obstacleGeom: "POINT(2.28313 48.84227)",
            obstacleHeight: 80,
            obstacleType: "corridor_obstacle",
            isCollision: false,
            isClearanceViolation: true,
        },
    ],
    graphObstacles: [
        {
            obstacleDistance: 1250,
            obstacleFlightAltitude: 80,
            obstacleType: "corridoe_obstacle",
        },
        {
            obstacleDistance: 10_500,
            obstacleFlightAltitude: 200,
            obstacleType: "corridoe_obstacle",
        },
        {
            obstacleDistance: 11_650,
            obstacleFlightAltitude: 280,
            obstacleType: "highest_obstacle",
        },
        {
            obstacleDistance: 21_500,
            obstacleFlightAltitude: 70,
            obstacleType: "corridoe_obstacle",
        },
    ],
};

export const corridorClearanceQueryResult = {
    corridorObstacles: [
        {
            obstacleGeom: "POINT(2.267245273 48.836452215)",
            obstacleHeight: 234,
            obstacleType: "corridor_obstacle",
            isCollision: false,
            isClearanceViolation: true,
        },
        {
            obstacleGeom: "POINT(2.2425622 48.83587452)",
            obstacleHeight: 467,
            obstacleType: "highest_obstacle",
            isCollision: false,
            isClearanceViolation: true,
        },
        {
            obstacleGeom: "POINT(2.22369324 48.82866422)",
            obstacleHeight: 324,
            obstacleType: "corridor_obstacle",
            isCollision: true,
            isClearanceViolation: false,
        },
    ],
    graphObstacles: [
        {
            obstacleDistance: 1442,
            obstacleFlightAltitude: 244,
            obstacleType: "corridoe_obstacle",
        },
        {
            obstacleDistance: 2800,
            obstacleFlightAltitude: 356,
            obstacleType: "highest_obstacle",
        },
        {
            obstacleDistance: 3500,
            obstacleFlightAltitude: 178,
            obstacleType: "corridoe_obstacle",
        },
    ],
};

export const mountMap = (routeOptionId: number) =>
    cy.mount(
        <MapFocusController>
            <SegmentEditingProvider>
                <SelectedRouteSequenceIndexProvider>
                    <FlightStatusProvider>
                        <AppShell
                            withAuth
                            withI18n
                            withParametersCache
                            withTheme
                            withFeatureFlags
                            authConfiguration={authConfigurationStub}
                            featureFlagSettings={{ baseUrl: "", environmentId: "" }}
                            localFeatureFlagsConfiguration={{ "ui-redesign": { enabled: false } }}
                        >
                            <ReactQueryClientProvider>
                                <MemoryRouter initialEntries={[`/route-options/${routeOptionId}/map`]}>
                                    <ServiceProvider baseUrl="http://api.cypress.voloiq.io">
                                        <Box height="100vh">
                                            <AppWithoutProviders preserveDrawingBuffer />
                                        </Box>
                                    </ServiceProvider>
                                </MemoryRouter>
                            </ReactQueryClientProvider>
                        </AppShell>
                    </FlightStatusProvider>
                </SelectedRouteSequenceIndexProvider>
            </SegmentEditingProvider>
        </MapFocusController>
    );
type SetupInterceptorsOptions = {
    routeOption?: RouteOption;
    waypoints?: Waypoint[];
    routes?: Route[];
};
export const setupInterceptors = (options: SetupInterceptorsOptions = {}) => {
    const { routeOption = anyRouteOption(), routes = [anyRoute()] } = options;
    const isVerticalProfile = routes[0] && routes[0].name.includes("vertical-profile");
    if (routes[0]) {
        getRouteOptionInterceptor(routeOption).as("getRouteOptionInterceptor");
        getRoutesInterceptor(routeOption.id, routes).as("getRoutesInterceptor");
        getExternalAircraftTypesInterceptor();
        getWaypointsInterceptor(routes[0].id, routes[0].waypoints);
        getCsflSitesInterceptor(routes[0].id);
        getSelectedCsflSitesInterceptor(routes[0].id);
        postTerrainInterceptor(routes[0].id);
        postCorridorClearanceInterceptor(routes[0].id);
        getCorridorClearanceInterceptor(
            routes[0].id,
            isVerticalProfile ? corridorClearanceDataFotVerticalProfileTests : corridorClearanceQueryResult
        );
        getTerrainDataInterceptor(routes[0].id, mockTerrainData(true));
    }
};
export const hqWaypoints = {
    hq_deprature_vertiport: {
        name: "Volocopter HQ",
        lat: 49.127_910_049_527_44,
        lng: 8.589_691_115_856_592,
        id: 1,
        routeSequenceIndex: 0,
    },
    center_waypoint: {
        name: "Waypoint 2",
        lat: 49.130_843_862_7,
        lng: 8.577_444_742_03,
        id: 2,
        routeSequenceIndex: 1,
    },
    hq_arrival_vertiport: {
        name: "Volocopter Airservices Hangar",
        lat: 49.133_777_675_847_91,
        lng: 8.565_198_368_194_462,
        id: 3,
        routeSequenceIndex: 2,
    },
};
export const parisWaypoints = {
    paris_voloport_1: {
        name: "Paris_Voloport_1",
        id: 1,
        lat: 48.819_823_433_452,
        lng: 2.223_443_244_123,
        routeSequenceIndex: 0,
    },
    waypoint_1: {
        name: "island_waypoint",
        lat: 48.824_375_324,
        lng: 2.231_394_242,
        id: 101,
        routeSequenceIndex: 1,
    },
    waypoint_2: {
        name: "marcel_waypoint",
        lat: 48.833_591_221,
        lng: 2.243_626_163,
        id: 102,
        routeSequenceIndex: 2,
    },
    waypoint_3: {
        name: "saint-cloud-waypoint",
        lat: 48.838_352_715,
        lng: 2.257_175_573,
        id: 103,
        routeSequenceIndex: 3,
    },
    paris_voloport_2: {
        name: "Paris_Voloport_2",
        id: 2,
        lat: 48.838_481_223_913,
        lng: 2.274_198_368_194,
        routeSequenceIndex: 4,
    },
};
export const parisSecondWaypoints = {
    paris_voloport_1: {
        name: "Paris_Voloport_1",
        id: 1,
        lat: 48.819_823_433_452,
        lng: 2.223_443_244_123,
        routeSequenceIndex: 0,
    },
    waypoint_1: {
        name: "island_waypoint",
        lat: 48.820_375_324,
        lng: 2.239_394_242,
        id: 201,
        routeSequenceIndex: 1,
    },
    waypoint_2: {
        name: "marcel_waypoint",
        lat: 48.839_591_221,
        lng: 2.249_626_163,
        id: 202,
        routeSequenceIndex: 2,
    },
    waypoint_3: {
        name: "saint-cloud-waypoint",
        lat: 48.830_352_715,
        lng: 2.250_175_573,
        id: 203,
        routeSequenceIndex: 3,
    },
    paris_voloport_2: {
        name: "Paris_Voloport_2",
        id: 2,
        lat: 48.838_481_223_913,
        lng: 2.274_198_368_194,
        routeSequenceIndex: 4,
    },
};
export const hqRouteOption = anyRouteOption({
    departureExternalVertiport: anyVertiport({
        name: "Volocopter HQ",
        lat: 49.127_910_049_527_44,
        lng: 8.589_691_115_856_592,
    }),
    arrivalExternalVertiport: anyVertiport({
        name: "Volocopter Airservices Hangar",
        lat: 49.133_777_675_847_91,
        lng: 8.565_198_368_194_462,
    }),
});

export const parisVerticalProfileWaypoints = {
    paris_voloport_1: {
        name: "Paris-Voloport-1",
        id: 1,
        alt: 25,
        lat: 48.819_823_433_452,
        lng: 2.223_443_244_123,
        routeSequenceIndex: 0,
    },
    waypoint_1: {
        name: "Garden-Waypoint",
        lat: 48.858_542_232,
        lng: 2.220_094_242,
        id: 101,
        alt: 250,
        routeSequenceIndex: 1,
    },
    waypoint_2: {
        name: "Defence-Waypoint",
        lat: 48.891_324_423,
        lng: 2.240_226_163,
        id: 102,
        alt: 220,
        routeSequenceIndex: 2,
    },
    waypoint_3: {
        name: "Clichy-Waypoint",
        lat: 48.903_352_715,
        lng: 2.319_375_573,
        id: 103,
        alt: 160,
        routeSequenceIndex: 3,
    },
    waypoint_4: {
        name: "Palace-Waypoint",
        id: 104,
        lat: 48.853_581_223_913,
        lng: 2.294_998_368_194,
        alt: 100,
        routeSequenceIndex: 4,
    },
    paris_voloport_2: {
        name: "Paris-Voloport-2",
        id: 2,
        lat: 48.838_481_223_913,
        lng: 2.274_198_368_194,
        alt: 54,
        routeSequenceIndex: 5,
    },
};

export const hqWaypointsArray: Waypoint[] = [
    anyWaypoint(hqWaypoints.hq_deprature_vertiport),
    anyWaypoint(hqWaypoints.center_waypoint),
    anyWaypoint(hqWaypoints.hq_arrival_vertiport),
];
export const hqRoute = anyRoute({
    name: "Hangar - HQ",
    waypoints: hqWaypointsArray,
});

export const parisRouteOption = anyRouteOption({
    departureExternalVertiport: anyVertiport(parisWaypoints.paris_voloport_1),
    arrivalExternalVertiport: anyVertiport(parisWaypoints.paris_voloport_2),
});

export const parisVerticalProfileRouteOption = anyRouteOption({
    departureExternalVertiport: anyVertiport(parisVerticalProfileWaypoints.paris_voloport_1),
    arrivalExternalVertiport: anyVertiport(parisVerticalProfileWaypoints.paris_voloport_2),
});
export const parisWaypointsArray = [
    anyWaypoint(parisRouteOption.departureExternalVertiport),
    anyWaypoint(parisWaypoints.waypoint_1),
    anyWaypoint(parisWaypoints.waypoint_2),
    anyWaypoint(parisWaypoints.waypoint_3),
    anyWaypoint(parisRouteOption.arrivalExternalVertiport),
];
export const parisSecondWaypointsArray = [
    anyWaypoint(parisRouteOption.departureExternalVertiport),
    anyWaypoint(parisSecondWaypoints.waypoint_1),
    anyWaypoint(parisSecondWaypoints.waypoint_2),
    anyWaypoint(parisSecondWaypoints.waypoint_3),
    anyWaypoint(parisRouteOption.arrivalExternalVertiport),
];

export const parisVerticalProfileWaypointsArray = [
    anyWaypoint(parisVerticalProfileRouteOption.departureExternalVertiport),
    anyWaypoint(parisVerticalProfileWaypoints.waypoint_1),
    anyWaypoint(parisVerticalProfileWaypoints.waypoint_2),
    anyWaypoint(parisVerticalProfileWaypoints.waypoint_3),
    anyWaypoint(parisVerticalProfileWaypoints.waypoint_4),
    anyWaypoint(parisVerticalProfileRouteOption.arrivalExternalVertiport),
];
export const parisRoute = anyRoute({
    id: Math.floor(Math.random() * 100),
    name: "paris-route-test",
    waypoints: parisWaypointsArray,
});
export const parisSecondRoute = anyRoute({
    id: Math.floor(Math.random() * 100),
    name: "paris-route2-test",
    waypoints: parisSecondWaypointsArray,
});
export const parisVerticalProfileRoute = anyRoute({
    id: Math.floor(Math.random() * 100),
    name: "paris-vertical-profile-test",
    waypoints: parisVerticalProfileWaypointsArray,
});

export const parisObstaclesArray = [
    {
        geom: {
            lng: 2.267_245_273,
            lat: 48.836_452_215,
        },
        altitude: 234,
        obstacleType: "corridor_obstacle",
        isCollision: false,
        isClearanceViolation: true,
    },
    {
        geom: {
            lng: 2.242_562_2,
            lat: 48.835_874_52,
        },
        altitude: 467,
        obstacleType: "highest_obstacle",
        isCollision: false,
        isClearanceViolation: true,
    },
    {
        geom: {
            lng: 2.223_693_24,
            lat: 48.828_664_22,
        },
        altitude: 324,
        obstacleType: "corridor_obstacle",
        isCollision: true,
        isClearanceViolation: false,
    },
];
export type WaypointData = {
    [key: string]: {
        name: string;
        lat: number;
        lng: number;
        id: number;
        alt?: number;
        routeSequenceIndex: number;
    };
};
export const checkIfVoloportsExist = (routeWaypoints: WaypointData, area = "paris") => {
    if (area === "paris" && routeWaypoints.paris_voloport_1 && routeWaypoints.paris_voloport_2) {
        routeOptionsPage.map.validateFeatureData({
            featureCoordinates: [routeWaypoints.paris_voloport_1.lng, routeWaypoints.paris_voloport_1.lat],
            layerId: "waypoints-layer",
            dataToValidate: { key: "waypointType", value: "voloport" },
        });
        routeOptionsPage.map.validateFeatureData({
            featureCoordinates: [routeWaypoints.paris_voloport_2.lng, routeWaypoints.paris_voloport_2.lat],
            layerId: "waypoints-layer",
            dataToValidate: { key: "waypointType", value: "voloport" },
        });
    }
};

export const mapMounting = (options: { routes: Route[]; routeOption: RouteOption }): Cypress.Chainable => {
    const { routes, routeOption } = options;
    setupInterceptors({ routes, routeOption });
    return mountMap(routeOption.id);
};
