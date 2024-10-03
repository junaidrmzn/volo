import type { PathParams } from "msw";
import { rest } from "msw";
import type { SoftwareConfig } from "@voloiq/logbook-api/v6";
import type { MockResponse, MockResponseArray } from "./MockResponse";
import { checkParamsMatches, getResponseValues, getResponseValuesArray } from "./MockResponse";

export const anySoftwareConfig = (overwrites?: Partial<SoftwareConfig>): SoftwareConfig => ({
    id: "AAA",
    configType: "FC",
    gitHash: "BBB",
    createTime: new Date().toISOString(),
    updateTime: new Date().toISOString(),
    inactive: false,
    ...overwrites,
});

export const makeGetSoftwareConfigHandler = (expectedResponse?: SoftwareConfig, expectedParams?: PathParams) => {
    const { returnStatus, returnValue } = getResponseValues<SoftwareConfig>(anySoftwareConfig, 200, expectedResponse);

    return rest.get(`${BACKEND_BASE_URL}/software-configs/:id`, (request, response, context) => {
        if (expectedParams && !checkParamsMatches(request.url.searchParams, expectedParams)) {
            return response.networkError("Params not matching");
        }
        return response(context.status(returnStatus), context.json(returnValue));
    });
};

export const makeGetAllSoftwareConfigHandler = (
    expectedResponse?: MockResponseArray<SoftwareConfig>,
    expectedParams?: PathParams
) => {
    const { returnStatus, returnValue } = getResponseValuesArray<SoftwareConfig>(
        anySoftwareConfig,
        200,
        expectedResponse
    );
    return rest.get(`${BACKEND_BASE_URL}/software-configs`, (request, response, context) => {
        if (expectedParams && !checkParamsMatches(request.url.searchParams, expectedParams)) {
            return response.networkError("Params not matching");
        }
        return response(context.status(returnStatus), context.json(returnValue));
    });
};

export const makePostSoftwareConfigHandler = (
    expectedResponse?: MockResponse<SoftwareConfig>,
    expectedParams?: PathParams
) => {
    const { returnStatus, returnValue } = getResponseValues<SoftwareConfig>(anySoftwareConfig, 201, expectedResponse);

    return rest.post(`${BACKEND_BASE_URL}/software-configs`, (request, response, context) => {
        if (expectedParams && !checkParamsMatches(request.url.searchParams, expectedParams)) {
            return response.networkError("Params not matching");
        }
        return response(context.status(returnStatus), context.json(returnValue));
    });
};

export const makeDeleteSoftwareConfigHandler = (expectedParams?: PathParams) => {
    return rest.delete(`${BACKEND_BASE_URL}/software-configs/:scID`, (request, response, context) => {
        if (expectedParams && !checkParamsMatches(request.url.searchParams, expectedParams)) {
            return response.networkError("Params not matching");
        }
        return response(context.status(200));
    });
};
