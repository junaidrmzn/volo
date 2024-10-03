import { Waypoint, anyRoute, anyWaypoint } from "@voloiq/flight-planning-api/v1";
import { mockedBaseUrl } from "../../../testing/url";
import type { CypressParameter, InterceptorOptions, MockResponse, MockResponseArray } from "./MockResponse";
import { checkParamsMatches, getResponseValues, getResponseValuesArray } from "./MockResponse";
import { parameterRegex } from "./RegexTemplate";

export const makeGetWaypointsInterceptor = (
    expectedResponse?: MockResponseArray<Waypoint>,
    expectedParams?: CypressParameter,
    options?: InterceptorOptions<Waypoint>
) => {
    const { returnStatus } = getResponseValuesArray<Waypoint>(anyWaypoint, 200, expectedResponse);
    const getWaypointsRegex = new RegExp(`^${mockedBaseUrl}/routes/${anyRoute().id}/waypoints${parameterRegex}$`, "m");
    return cy
        .intercept("GET", getWaypointsRegex, (request) => {
            if (expectedParams && !checkParamsMatches(request.query, expectedParams)) {
                request.destroy();
            }
            request.reply({
                body: {
                    data: [
                        anyWaypoint({ id: 1, name: "WP1", routeSequenceIndex: 0, lng: 0, lat: 0, alt: 7 }),
                        anyWaypoint({ id: 2, name: "WP2", routeSequenceIndex: 1, lng: 1, lat: 2, alt: 11 }),
                        anyWaypoint({ id: 3, name: "WP3", routeSequenceIndex: 2, lng: 3, lat: 5, alt: 13 }),
                    ],
                },
                statusCode: returnStatus,
                ...options,
            });
        })
        .as("getWaypoints");
};

export const makePutWaypointInterceptor = (
    expectedResponse?: MockResponse<Waypoint>,
    expectedParams?: CypressParameter,
    options?: InterceptorOptions<Waypoint>
) => {
    const { returnStatus, returnValue } = getResponseValues<Waypoint>(anyWaypoint, 200, expectedResponse);
    const putWaypointRegex = new RegExp(`^${mockedBaseUrl}/routes/${anyRoute().id}/waypoints/${anyWaypoint().id}`, "m");
    return cy
        .intercept("PUT", putWaypointRegex, (request) => {
            if (expectedParams && !checkParamsMatches(request.query, expectedParams)) {
                request.destroy();
            }
            request.reply({
                body: returnValue,
                statusCode: returnStatus,
                ...options,
            });
        })
        .as("putWaypoint");
};

export const makeDeleteWaypointInterceptor = (
    expectedParams?: CypressParameter,
    options?: InterceptorOptions<null>
) => {
    const deleteWaypointRegex = new RegExp(
        `^${mockedBaseUrl}/routes/${anyRoute().id}/waypoints/${anyWaypoint().id}`,
        "m"
    );
    return cy
        .intercept("DELETE", deleteWaypointRegex, (request) => {
            if (expectedParams && !checkParamsMatches(request.query, expectedParams)) {
                request.destroy();
            }
            request.reply({
                statusCode: 204,
                ...options,
            });
        })
        .as("deleteWaypoint");
};
