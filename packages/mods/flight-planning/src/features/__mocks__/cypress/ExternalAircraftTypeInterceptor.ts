import type { ExternalAircraftType } from "@voloiq/flight-planning-api/v1";
import { anyExternalAircraftType } from "@voloiq/flight-planning-api/v1";
import { mockedBaseUrl } from "../../../testing/url";
import { checkParamsMatches, getResponseValuesArray } from "./MockResponse";
import type { CypressParameter, InterceptorOptions, MockResponseArray } from "./MockResponse";
import { parameterRegex } from "./RegexTemplate";

export const makeGetExternalAircraftTypesInterceptor = (
    expectedResponse?: MockResponseArray<ExternalAircraftType>,
    expectedParams?: CypressParameter,
    options?: InterceptorOptions<ExternalAircraftType>
) => {
    const { returnStatus, returnValue } = getResponseValuesArray<ExternalAircraftType>(
        anyExternalAircraftType,
        200,
        expectedResponse
    );
    const getExternalAircraftTypesRegex = new RegExp(
        `^${mockedBaseUrl}/external/aircraft-types${parameterRegex}$`,
        "m"
    );
    return cy
        .intercept("GET", getExternalAircraftTypesRegex, (request) => {
            if (expectedParams && !checkParamsMatches(request.query, expectedParams)) {
                request.destroy();
            }
            request.reply({
                body: returnValue,
                statusCode: returnStatus,
                ...options,
            });
        })
        .as("getExternalAircraftTypes");
};
