import type { CsflSite, RouteCsflSitesLink } from "@voloiq-typescript-api/flight-planning-types";
import { Route, anyRoute } from "@voloiq/flight-planning-api/v1";
import { mockedBaseUrl } from "../../../testing/url";
import { anyCsflSite, anySelectedCsflSite, mockedCsflSites, mockedSelectedCsflSites } from "../csflSites";
import type { CypressParameter, InterceptorOptions, MockResponseArray } from "./MockResponse";
import { checkParamsMatches, getResponseValuesArray } from "./MockResponse";
import { numberRegex, parameterRegex } from "./RegexTemplate";

const mockedRoute = anyRoute();

export const makeGetRoutesInterceptor = (
    expectedResponse?: MockResponseArray<Route>,
    expectedParams?: CypressParameter,
    options?: InterceptorOptions<Route>
) => {
    const { returnStatus } = getResponseValuesArray<Route>(anyRoute, 200, expectedResponse);
    const routesRegex = new RegExp(`^${mockedBaseUrl}/route-options/${numberRegex}/routes${parameterRegex}$`, "m");
    return cy
        .intercept("GET", routesRegex, (request) => {
            if (expectedParams && !checkParamsMatches(request.query, expectedParams)) {
                request.destroy();
            }
            request.reply({
                body: {
                    data: [
                        anyRoute({ id: 1, name: "route1" }),
                        anyRoute({ id: 2, name: "route2" }),
                        anyRoute({ id: 3, name: "route3" }),
                        anyRoute({ id: 4, name: "route4" }),
                    ],
                },
                statusCode: returnStatus,
                ...options,
            });
        })
        .as("getRoutes");
};

export const makeDeleteRouteInterceptor = (expectedParams?: CypressParameter, options?: InterceptorOptions<null>) => {
    const deleteRouteRegex = new RegExp(`^${mockedBaseUrl}/routes/${mockedRoute.id}`, "m");
    return cy
        .intercept("DELETE", deleteRouteRegex, (request) => {
            if (expectedParams && !checkParamsMatches(request.query, expectedParams)) {
                request.destroy();
            }
            request.reply({
                statusCode: 204,
                ...options,
            });
        })
        .as("deleteRoute");
};

export const makeSimLogFileUploadInterceptor = (fileName: string) => {
    const getRouteRegex = new RegExp(
        `^https://my-testing-storage.blob.core.windows.net/uploads/${fileName}${parameterRegex}$`,
        "m"
    );
    return cy
        .intercept("PUT", getRouteRegex, (request) => {
            request.reply({
                statusCode: 201,
            });
        })
        .as("uploadSimLogFile");
};

export const makeComputeAltitudeProfileInterceptor = (routeId?: number) => {
    const computeAltitudeProfileRegex = new RegExp(
        `^${mockedBaseUrl}/routes/${routeId || mockedRoute.id}/altitude-profile$`,
        "m"
    );
    return cy
        .intercept("PATCH", computeAltitudeProfileRegex, (request) => {
            request.reply({ statusCode: 204 });
        })
        .as("computeAltitudeProfie");
};

export const makeGetCsflSitesInterceptor = (
    expectedResponse?: MockResponseArray<CsflSite>,
    expectedParams?: CypressParameter,
    options?: InterceptorOptions<CsflSite>
) => {
    const { returnStatus } = getResponseValuesArray<CsflSite>(anyCsflSite, 200, expectedResponse);
    const getCsflSitesRegex = new RegExp(`^${mockedBaseUrl}/routes/${mockedRoute.id}/csfl-sites`, "m");
    return cy
        .intercept("GET", getCsflSitesRegex, (request) => {
            if (expectedParams && !checkParamsMatches(request.query, expectedParams)) {
                request.destroy();
            }
            request.reply({
                body: { data: mockedCsflSites },
                statusCode: returnStatus,
                ...options,
            });
        })

        .as("getCsflSites");
};

export const makeGetSelectedCsflSitesInterceptor = (
    responseData?: RouteCsflSitesLink[],
    expectedResponse?: MockResponseArray<RouteCsflSitesLink>,
    expectedParams?: CypressParameter,
    options?: InterceptorOptions<RouteCsflSitesLink>
) => {
    const { returnStatus } = getResponseValuesArray<RouteCsflSitesLink>(anySelectedCsflSite, 200, expectedResponse);
    const getCsflSitesRegex = new RegExp(`^${mockedBaseUrl}/routes/${mockedRoute.id}/selected-csfl-sites`, "m");
    return cy
        .intercept("GET", getCsflSitesRegex, (request) => {
            if (expectedParams && !checkParamsMatches(request.query, expectedParams)) {
                request.destroy();
            }
            request.reply({
                body: { data: responseData ?? mockedSelectedCsflSites },
                statusCode: returnStatus,
                ...options,
            });
        })
        .as("getSelectedCsflSites");
};

export const makePostSelectedCsflSitesInterceptor = (
    expectedResponse?: MockResponseArray<RouteCsflSitesLink>,
    expectedParams?: CypressParameter,
    options?: InterceptorOptions<RouteCsflSitesLink>
) => {
    const { returnStatus } = getResponseValuesArray<RouteCsflSitesLink>(anySelectedCsflSite, 200, expectedResponse);
    const postCsflSitesRegex = new RegExp(`^${mockedBaseUrl}/routes/${mockedRoute.id}/selected-csfl-sites`, "m");
    return cy
        .intercept("POST", postCsflSitesRegex, (request) => {
            if (expectedParams && !checkParamsMatches(request.query, expectedParams)) {
                request.destroy();
            }
            request.reply({
                body: { data: mockedSelectedCsflSites },
                statusCode: returnStatus,
                ...options,
            });
        })
        .as("postSelectedCsflSites");
};
