import { CorridorClearanceType, anyCorridorClearanceType } from "@voloiq/flight-planning-api/v1";
import { baseUrl } from "./constants";
import { InterceptorOptions, getResponseValuesObject } from "./utils/mockResponse";

export const postCorridorClearanceInterceptor = (routeId: number, options?: InterceptorOptions<undefined>) =>
    cy.intercept("POST", new RegExp(`${baseUrl}/routes/${routeId}/corridor-clearance`), {
        statusCode: 202,
        ...options,
    });

export const getCorridorClearanceInterceptor = (routeId: number, data?: Partial<CorridorClearanceType>) =>
    cy.intercept("GET", new RegExp(`${baseUrl}/routes/${routeId}/corridor-clearance`), {
        ...getResponseValuesObject(anyCorridorClearanceType, 200, data),
    });
