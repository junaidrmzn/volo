import type { Aircraft } from "@voloiq-typescript-api/fti-types";
import type { PathParams } from "msw";
import { rest } from "msw";
import type { MockResponseArray } from "./MockResponse";
import { checkParamsMatches, getResponseValuesArray } from "./MockResponse";

export const anyAircraft = (overwrites?: Partial<Aircraft>): Aircraft => ({
    id: "43g5bvrg5h4rb",
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
