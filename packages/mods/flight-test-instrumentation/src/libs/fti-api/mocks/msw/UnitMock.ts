import type { Unit } from "@voloiq-typescript-api/fti-types";
import type { PathParams } from "msw";
import { rest } from "msw";
import type { MockResponseArray } from "./MockResponse";
import { checkParamsMatches, getResponseValuesArray } from "./MockResponse";

export const anyUnit = (overwrites?: Partial<Unit>): Unit => ({
    id: "d7d89c68-6590-4aed-8e10-efd2630dcd17",
    label: "m/s",
    createTime: new Date().toISOString(),
    updateTime: new Date().toISOString(),
    ...overwrites,
});

export const makeGetAllUnitsHandler = (expectedResponse?: MockResponseArray<Unit>, expectedParams?: PathParams) => {
    const { returnStatus, returnValue } = getResponseValuesArray<Unit>(anyUnit, 200, expectedResponse);

    return rest.get(`${BACKEND_BASE_URL}/units`, (request, response, context) => {
        if (expectedParams && !checkParamsMatches(request.url.searchParams, expectedParams)) {
            return response.networkError("Params not matching");
        }
        return response(context.status(returnStatus), context.json(returnValue));
    });
};
