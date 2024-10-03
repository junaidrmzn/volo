import { VerticalTerrainResponse, anyTerrainData } from "@voloiq/flight-planning-api/v1";
import { baseUrl } from "./constants";
import { InterceptorOptions, getResponseValuesObject } from "./utils/mockResponse";

export const postTerrainInterceptor = (routeId: number, options?: InterceptorOptions<undefined>) => {
    cy.intercept("POST", new RegExp(`${baseUrl}/routes/${routeId}/terrain`), {
        statusCode: 202,
        ...options,
    });
};

export const getTerrainDataInterceptor = (routeId: number, data?: Partial<VerticalTerrainResponse>) =>
    cy.intercept("GET", new RegExp(`${baseUrl}/routes/${routeId}/terrain`), {
        ...getResponseValuesObject(anyTerrainData, 200, data),
    });
