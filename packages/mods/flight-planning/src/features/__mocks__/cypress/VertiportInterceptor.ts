import type { Vertiport } from "@voloiq/flight-planning-api/v1";
import { anyVertiport } from "@voloiq/flight-planning-api/v1";
import { mockedBaseUrl } from "../../../testing/url";
import type { CypressParameter, InterceptorOptions, MockResponseArray } from "./MockResponse";
import { checkParamsMatches, getResponseValuesArray } from "./MockResponse";
import { parameterRegex } from "./RegexTemplate";

export const makeGetVertiportsInterceptor = (
    expectedResponse?: MockResponseArray<Vertiport>,
    expectedParams?: CypressParameter,
    options?: InterceptorOptions<Vertiport>
) => {
    const { returnStatus, returnValue } = getResponseValuesArray<Vertiport>(anyVertiport, 200, expectedResponse);
    const getAllVertiportRegex = new RegExp(`^${mockedBaseUrl}/vertiports${parameterRegex}$`, "m");
    return cy
        .intercept("GET", getAllVertiportRegex, (request) => {
            if (expectedParams && !checkParamsMatches(request.query, expectedParams)) {
                request.destroy();
            }
            request.reply({
                body: returnValue,
                statusCode: returnStatus,
                ...options,
            });
        })
        .as("getVertiports");
};
