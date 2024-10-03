import type { PathParams } from "msw";
import { rest } from "msw";
import type { CrewMember, Location, LocationInsert } from "@voloiq/logbook-api/v6";
import type { MockResponse, MockResponseArray } from "./MockResponse";
import { checkParamsMatches, getResponseValues, getResponseValuesArray } from "./MockResponse";

export const anyLocation = (overwrites?: Partial<Location>): Location => ({
    id: "wf435gweq4vrewr5",
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

export const makeGetAllLocationHandler = (
    expectedResponse?: MockResponseArray<Location>,
    expectedParams?: PathParams
) => {
    const { returnStatus, returnValue } = getResponseValuesArray<Location>(anyLocation, 200, expectedResponse);

    return rest.get(`${BACKEND_BASE_URL}/locations`, (request, response, context) => {
        if (expectedParams && !checkParamsMatches(request.url.searchParams, expectedParams)) {
            return response.networkError("Params not matching");
        }
        return response(context.status(returnStatus), context.json(returnValue));
    });
};

export const makePostLocationHandler = (expectedResponse?: MockResponse<CrewMember>, expectedParams?: PathParams) => {
    const { returnStatus, returnValue } = getResponseValues<Location>(anyLocation, 201, expectedResponse);

    return rest.post(`${BACKEND_BASE_URL}/locations`, (request, response, context) => {
        if (expectedParams && !checkParamsMatches(request.url.searchParams, expectedParams)) {
            return response.networkError("Params not matching");
        }
        return response(context.status(returnStatus), context.json(returnValue));
    });
};
