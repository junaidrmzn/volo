import type { VerticalTerrain } from "@voloiq-typescript-api/flight-planning-types";
import { anyRoute } from "@voloiq/flight-planning-api/v1";
import { mockedBaseUrl } from "../../../testing/url";
import { getVerticalTerrainResponse } from "../verticalTerrain";
import type { CypressParameter, InterceptorOptions, MockResponseArray } from "./MockResponse";
import { checkParamsMatches, getResponseValuesArray } from "./MockResponse";
import { parameterRegex } from "./RegexTemplate";

export const makeGetVerticalTerrainInterceptor = (
    expectedResponse?: MockResponseArray<VerticalTerrain[]>,
    expectedParams?: CypressParameter,
    options?: InterceptorOptions<VerticalTerrain>
) => {
    const mockRoute = anyRoute();
    const { returnStatus, returnValue } = getResponseValuesArray<VerticalTerrain[]>(
        getVerticalTerrainResponse,
        200,
        expectedResponse
    );
    const verticalTerrainRegex = new RegExp(`^${mockedBaseUrl}/routes/${mockRoute.id}/terrain${parameterRegex}$`, "m");
    return cy
        .intercept("GET", verticalTerrainRegex, (request) => {
            if (expectedParams && !checkParamsMatches(request.query, expectedParams)) {
                request.destroy();
            }
            request.reply({
                body: returnValue,
                statusCode: returnStatus,
                ...options,
            });
        })
        .as("getVerticalTerrain")
        .intercept("POST", verticalTerrainRegex, (request) => {
            if (expectedParams && !checkParamsMatches(request.query, expectedParams)) {
                request.destroy();
            }
            request.reply({
                body: {},
                statusCode: returnStatus,
                ...options,
            });
        })
        .as("postVerticalTerrain");
};
