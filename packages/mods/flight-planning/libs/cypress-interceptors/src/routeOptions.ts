import { RouteOption, anyRouteOption } from "@voloiq/flight-planning-api/v1";
import { baseUrl } from "./constants";
import { getResponseValues } from "./utils/mockResponse";
import { uuidRegex } from "./utils/regexTemplates";

export const getRouteOptionInterceptor = (routeOption?: Partial<RouteOption>) =>
    cy.intercept("GET", new RegExp(`${baseUrl}/route-options/${routeOption?.id ?? uuidRegex}`), {
        ...getResponseValues(anyRouteOption, 200, routeOption),
    });

export const updateRouteOptionInterceptor = (routeOption?: Partial<RouteOption>) =>
    cy.intercept("PUT", new RegExp(`${baseUrl}/route-options/${routeOption?.id ?? uuidRegex}`), {
        ...getResponseValues(anyRouteOption, 200, routeOption),
    });
