import type { ParameterSource } from "@voloiq-typescript-api/fti-types";
import type { PathParams } from "msw";
import { rest } from "msw";
import type { MockResponseArray } from "./MockResponse";
import { checkParamsMatches, getResponseValuesArray } from "./MockResponse";

export const anyParameterSource = (overwrites?: Partial<ParameterSource>): ParameterSource => ({
    id: "43g5bvrg5h4rb",
    createTime: "2022-08-02T00:00:00.000Z",
    updateTime: "2022-08-02T00:00:00.000Z",
    label: "Source",
    ...overwrites,
});

export const makeGetAllParameterSourceHandler = (
    expectedResponse?: MockResponseArray<ParameterSource>,
    expectedParams?: PathParams
) => {
    const { returnStatus, returnValue } = getResponseValuesArray<ParameterSource>(
        anyParameterSource,
        200,
        expectedResponse
    );

    return rest.get(`${BACKEND_BASE_URL}/parameter-sources`, (request, response, context) => {
        if (expectedParams && !checkParamsMatches(request.url.searchParams, expectedParams)) {
            return response.networkError("Params not matching");
        }
        return response(context.status(returnStatus), context.json(returnValue));
    });
};
