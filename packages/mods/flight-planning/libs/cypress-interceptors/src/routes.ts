import { Route, anyRoute } from "@voloiq/flight-planning-api/v1";
import { baseUrl } from "./constants";
import { getResponseValuesArray } from "./utils/mockResponse";
import { parameterRegex } from "./utils/regexTemplates";

export const getRoutesInterceptor = (routeOptionId: number, routes?: Partial<Route>[]) =>
    cy.intercept("GET", new RegExp(`${baseUrl}/route-options/${routeOptionId}/routes${parameterRegex}$`), {
        ...getResponseValuesArray(anyRoute, 200, routes),
    });
