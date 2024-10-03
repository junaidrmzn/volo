import { Waypoint, anyWaypoint } from "@voloiq/flight-planning-api/v1";
import { baseUrl } from "./constants";
import { getResponseValuesArray, getResponseValuesObject } from "./utils/mockResponse";
import { parameterRegex } from "./utils/regexTemplates";

export const postWaypointInterceptor = (routeId: number, waypoint?: Partial<Waypoint>) =>
    cy.intercept("POST", new RegExp(`${baseUrl}/routes/${routeId}/waypoints`), {
        ...getResponseValuesObject(anyWaypoint, 201, waypoint),
    });

export const getWaypointsInterceptor = (routeId: number, routes?: Partial<Waypoint>[]) =>
    cy.intercept("GET", new RegExp(`${baseUrl}/routes/${routeId}/waypoints${parameterRegex}$`), {
        ...getResponseValuesArray(anyWaypoint, 200, routes),
    });

export const putWaypointInterceptor = (routeId: number, waypointId: number) =>
    cy.intercept("PUT", new RegExp(`${baseUrl}/routes/${routeId}/waypoints/${waypointId}`), {
        statusCode: 201,
    });

export const putWaypointInterceptorWithObject = (routeId: number, waypointId: number, waypoint?: Partial<Waypoint>) =>
    cy.intercept("PUT", new RegExp(`${baseUrl}/routes/${routeId}/waypoints/${waypointId}`), {
        ...getResponseValuesObject(anyWaypoint, 201, waypoint),
    });

export const deleteWaypointInterceptor = (routeId: number, waypointId: number) =>
    cy.intercept("DELETE", new RegExp(`${baseUrl}/routes/${routeId}/waypoints/${waypointId}`), {
        statusCode: 204,
    });
