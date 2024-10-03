import type { RouteOption } from "@voloiq/flight-planning-api/v1";
import { mockedBaseUrl } from "../../../testing/url";
import { createMockedRouteOption } from "../routeOption";
import type { CypressParameter, InterceptorOptions, MockResponse, MockResponseArray } from "./MockResponse";
import { checkParamsMatches, getResponseValues, getResponseValuesArray } from "./MockResponse";
import { numberRegex, parameterRegex } from "./RegexTemplate";

export const makeGetRouteOptionsInterceptor = (
    expectedResponse?: MockResponseArray<RouteOption>,
    expectedParams?: CypressParameter,
    options?: InterceptorOptions<RouteOption>
) => {
    const { returnStatus, returnValue } = getResponseValuesArray<RouteOption>(
        createMockedRouteOption,
        200,
        expectedResponse
    );
    const routeOptionsRegex = new RegExp(`^${mockedBaseUrl}/route-options${parameterRegex}$`, "m");
    return cy
        .intercept("GET", routeOptionsRegex, (request) => {
            if (expectedParams && !checkParamsMatches(request.query, expectedParams)) {
                request.destroy();
            }
            request.reply({
                body: returnValue,
                statusCode: returnStatus,
                ...options,
            });
        })
        .as("getRouteOptions");
};

export const makeGetRouteOptionInterceptor = (
    expectedResponse?: MockResponse<RouteOption>,
    expectedParams?: CypressParameter,
    options?: InterceptorOptions<RouteOption>
) => {
    const { returnStatus, returnValue } = getResponseValues<RouteOption>(
        createMockedRouteOption,
        200,
        expectedResponse
    );
    const getRouteOptionRegex = new RegExp(`^${mockedBaseUrl}/route-options/${numberRegex}${parameterRegex}$`, "m");
    return cy
        .intercept("GET", getRouteOptionRegex, (request) => {
            if (expectedParams && !checkParamsMatches(request.query, expectedParams)) {
                request.destroy();
            }
            request.reply({
                body: returnValue,
                statusCode: returnStatus,
                ...options,
            });
        })
        .as("getRouteOption");
};

export const makePostRouteOptionInterceptor = (
    expectedResponse?: MockResponse<RouteOption>,
    expectedParams?: CypressParameter,
    options?: InterceptorOptions<RouteOption>
) => {
    const { returnStatus, returnValue } = getResponseValues<RouteOption>(
        createMockedRouteOption,
        201,
        expectedResponse
    );
    const postRouteOptionRegex = new RegExp(`^${mockedBaseUrl}/route-options$`, "m");
    return cy
        .intercept("POST", postRouteOptionRegex, (request) => {
            if (expectedParams && !checkParamsMatches(request.query, expectedParams)) {
                request.destroy();
            }
            request.reply({
                body: returnValue,
                statusCode: returnStatus,
                ...options,
            });
        })
        .as("postRouteOption");
};

export const makeDeleteRouteOptionInterceptor = (
    expectedParams?: CypressParameter,
    options?: InterceptorOptions<null>
) => {
    const deleteRouteOptionRegex = new RegExp(`^${mockedBaseUrl}/route-options/${parameterRegex}$`, "m");
    return cy
        .intercept("DELETE", deleteRouteOptionRegex, (request) => {
            if (expectedParams && !checkParamsMatches(request.query, expectedParams)) {
                request.destroy();
            }
            request.reply({
                statusCode: 204,
                ...options,
            });
        })
        .as("deleteRouteOption");
};

export const makeKmlFileUploadInterceptor = (fileName: string) => {
    const kmlFileUpload = new RegExp(
        `^https://my-testing-storage.blob.core.windows.net/uploads/kml-files/${fileName}${parameterRegex}$`,
        "m"
    );
    return cy
        .intercept("PUT", kmlFileUpload, (request) => {
            request.reply({
                statusCode: 201,
            });
        })
        .as("uploadKmlFile");
};

export const makeKmlFileUploadedStatusInterceptor = (routeOptionId: string | number) => {
    const kmlFileUploadedStatus = new RegExp(`^/route-options/${routeOptionId}/kml/status/uploaded$`, "m");
    return cy
        .intercept("POST", kmlFileUploadedStatus, (request) => {
            request.reply({
                statusCode: 202,
            });
        })
        .as("uploadedKmlFileStatus");
};
