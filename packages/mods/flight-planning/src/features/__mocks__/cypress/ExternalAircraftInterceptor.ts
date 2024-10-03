import type { ExternalAircraft } from "@voloiq/flight-planning-api/v1";
import { anyExternalAircraft } from "@voloiq/flight-planning-api/v1";
import { mockedBaseUrl } from "../../../testing/url";
import { checkParamsMatches, getResponseValuesArray } from "./MockResponse";
import type { CypressParameter, InterceptorOptions, MockResponseArray } from "./MockResponse";

export const makeGetExternalAircraftsInterceptor = (
    expectedResponse?: MockResponseArray<ExternalAircraft>,
    expectedParams?: CypressParameter,
    options?: InterceptorOptions<ExternalAircraft>
) => {
    const { returnStatus, returnValue } = getResponseValuesArray<ExternalAircraft>(
        anyExternalAircraft,
        200,
        expectedResponse
    );
    const getExternalAircraftsRegex = new RegExp(`^${mockedBaseUrl}/external/aircraft$`, "m");
    return cy
        .intercept("GET", getExternalAircraftsRegex, (request) => {
            if (expectedParams && !checkParamsMatches(request.query, expectedParams)) {
                request.destroy();
            }
            request.reply({
                body: returnValue,
                statusCode: returnStatus,
                ...options,
            });
        })
        .as("getExternalAircrafts");
};
