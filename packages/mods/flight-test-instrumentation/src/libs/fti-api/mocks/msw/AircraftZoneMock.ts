import type { AircraftZone } from "@voloiq-typescript-api/fti-types";
import type { PathParams } from "msw";
import { rest } from "msw";
import type { MockResponseArray } from "./MockResponse";
import { checkParamsMatches, getResponseValuesArray } from "./MockResponse";

export const anyAircraftZone = (overwrites?: Partial<AircraftZone>): AircraftZone => ({
    id: "43g5bvrg5h4rb",
    createTime: "2022-08-02T00:00:00.000Z",
    updateTime: "2022-08-02T00:00:00.000Z",
    label: "EU",
    ...overwrites,
});

export const makeGetAllAircraftZoneHandler = (
    expectedResponse?: MockResponseArray<AircraftZone>,
    expectedParams?: PathParams
) => {
    const { returnStatus, returnValue } = getResponseValuesArray<AircraftZone>(anyAircraftZone, 200, expectedResponse);

    return rest.get(`${BACKEND_BASE_URL}/aircraft-zones`, (request, response, context) => {
        if (expectedParams && !checkParamsMatches(request.url.searchParams, expectedParams)) {
            return response.networkError("Params not matching");
        }
        return response(context.status(returnStatus), context.json(returnValue));
    });
};
