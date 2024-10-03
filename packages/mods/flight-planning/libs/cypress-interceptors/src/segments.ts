import { baseUrl } from "./constants";
import { InterceptorOptions } from "./utils/mockResponse";

export const postSegmentInterceptor = (routeId: number, waypointId: number, options?: InterceptorOptions<undefined>) =>
    cy.intercept("POST", new RegExp(`${baseUrl}/routes/${routeId}/waypoints/${waypointId}/segment`), {
        statusCode: 201,
        ...options,
    });

export const putSegmentInterceptor = (routeId: number, waypointId: number, options?: InterceptorOptions<undefined>) =>
    cy.intercept("PUT", new RegExp(`${baseUrl}/routes/${routeId}/waypoints/${waypointId}/segment`), {
        statusCode: 201,
        ...options,
    });
