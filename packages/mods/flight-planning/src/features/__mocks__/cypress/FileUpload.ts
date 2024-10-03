import { Waypoint } from "@voloiq/flight-planning-api/v1";
import { anyFileUrl } from "../uploadLink";
import type { CypressParameter, InterceptorOptions, MockResponseArray } from "./MockResponse";
import { checkParamsMatches } from "./MockResponse";
import { parameterRegex } from "./RegexTemplate";

export const makeGetSimLogFileUploadLinkInterceptor = (
    routeId: number,
    fileName: string,
    expectedResponse?: MockResponseArray<Waypoint>,
    expectedParams?: CypressParameter,
    options?: InterceptorOptions<Waypoint>
) => {
    const uploadLinkRegex = new RegExp(`^/routes/${routeId}/conducted-route/upload-link${parameterRegex}$`, "m");
    return cy
        .intercept("GET", uploadLinkRegex, (request) => {
            if (expectedParams && !checkParamsMatches(request.query, expectedParams)) {
                request.destroy();
            }
            request.reply({
                body: { data: anyFileUrl(fileName) },
                statusCode: 200,
                ...options,
            });
        })
        .as("getSimLogFileUploadLink");
};

export const makeGetKmlFileUploadLinkInterceptor = (
    routeOptionId: number,
    fileName: string,
    expectedParams?: CypressParameter,
    options?: InterceptorOptions<Waypoint>
) => {
    const uploadLinkRegex = new RegExp(`^/route-options/${routeOptionId}/kml/upload-link${parameterRegex}$`, "m");
    return cy
        .intercept("GET", uploadLinkRegex, (request) => {
            if (expectedParams && !checkParamsMatches(request.query, expectedParams)) {
                request.destroy();
            }
            request.reply({
                body: { data: anyFileUrl(`kml-files/${fileName}`) },
                statusCode: 200,
                ...options,
            });
        })
        .as("getKmlFileUploadLink");
};
