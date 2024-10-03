import type { PathParams } from "msw";
import { rest } from "msw";
import type { Aircraft, AircraftInsert } from "@voloiq/logbook-api/v6";
import type { MockResponse, MockResponseArray } from "./MockResponse";
import { checkParamsMatches, getResponseValues, getResponseValuesArray } from "./MockResponse";

export const anyAircraft = (overwrites?: Partial<Aircraft>): Aircraft => ({
    id: "43g5bvrg5h4rb",
    productLine: "VC",
    aircraftType: "VC1-2",
    msn: "01",
    createTime: new Date().toISOString(),
    updateTime: new Date().toISOString(),
    ...overwrites,
});

export const anyAircraftInsert = (overwrites?: Partial<AircraftInsert>): AircraftInsert => ({
    productLine: "VC",
    aircraftType: "VC1-2",
    msn: "01",
    ...overwrites,
});

export const makeGetAllAircraftHandler = (
    expectedResponse?: MockResponseArray<Aircraft>,
    expectedParams?: PathParams
) => {
    const { returnStatus, returnValue } = getResponseValuesArray<Aircraft>(anyAircraft, 200, expectedResponse);

    return rest.get(`${BACKEND_BASE_URL}/aircraft`, (request, response, context) => {
        if (expectedParams && !checkParamsMatches(request.url.searchParams, expectedParams)) {
            return response.networkError("Params not matching");
        }
        return response(context.status(returnStatus), context.json(returnValue));
    });
};

export const makePostAircraftHandler = (expectedResponse?: MockResponse<Aircraft>, expectedParams?: PathParams) => {
    const { returnStatus, returnValue } = getResponseValues<Aircraft>(anyAircraft, 201, expectedResponse);

    return rest.post(`${BACKEND_BASE_URL}/aircraft`, (request, response, context) => {
        if (expectedParams && !checkParamsMatches(request.url.searchParams, expectedParams)) {
            return response.networkError("Params not matching");
        }
        return response(context.status(returnStatus), context.json(returnValue));
    });
};
