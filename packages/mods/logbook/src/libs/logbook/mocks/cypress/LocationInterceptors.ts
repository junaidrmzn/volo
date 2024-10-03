import { UUID } from "uuidjs";
import type { Location, LocationInsert } from "@voloiq/logbook-api/v6";
import type { CypressParameter, InterceptorOptions, MockResponse, MockResponseArray } from "./MockResponse";
import { checkParamsMatches, getResponseValues, getResponseValuesArray } from "./MockResponse";
import { parameterRegex } from "./RegexTemplates";

export const anyLocation = (overwrites?: Partial<Location>): Location => ({
    id: UUID.generate(),
    icaoCode: "FRA",
    latitude: 0,
    longitude: 0,
    createTime: new Date().toISOString(),
    updateTime: new Date().toISOString(),
    ...overwrites,
});

export const anyLocationInsert = (overwrites?: Partial<LocationInsert>): LocationInsert => ({
    icaoCode: "FRA",
    latitude: 0,
    longitude: 0,
    ...overwrites,
});

export const makeGetAllLocationInterceptor = (
    expectedResponse?: MockResponseArray<Location>,
    expectedParams?: CypressParameter,
    options?: InterceptorOptions<Location>
) => {
    const { returnStatus, returnValue } = getResponseValuesArray<Location>(anyLocation, 200, expectedResponse);

    const getAllLocationRegex = new RegExp(`^${BACKEND_BASE_URL}/locations${parameterRegex}$`, "m");
    return cy
        .intercept("GET", getAllLocationRegex, (request) => {
            if (expectedParams && !checkParamsMatches(request.query, expectedParams)) {
                return request.destroy();
            }
            return request.reply({
                body: returnValue,
                statusCode: returnStatus,
                ...options,
            });
        })
        .as("getAllLocation");
};

export const makePostLocationInterceptor = (
    expectedResponse?: MockResponse<Location>,
    expectedParams?: CypressParameter,
    options?: InterceptorOptions<Location>
) => {
    const { returnStatus, returnValue } = getResponseValues<Location>(anyLocation, 201, expectedResponse);

    const postLocationRegex = new RegExp(`^${BACKEND_BASE_URL}/locations${parameterRegex}$`, "m");
    return cy
        .intercept("POST", postLocationRegex, (request) => {
            if (expectedParams && !checkParamsMatches(request.query, expectedParams)) {
                return request.destroy();
            }
            return request.reply({
                body: returnValue,
                statusCode: returnStatus,
                ...options,
            });
        })
        .as("postLocation");
};
