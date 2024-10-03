import type { UTMServiceProvider } from "@voloiq-typescript-api/flight-planning-types";
import { mockedBaseUrl } from "../../../testing/url";
import type { CypressParameter, InterceptorOptions, MockResponseArray } from "./MockResponse";
import { checkParamsMatches, getResponseValuesArray } from "./MockResponse";

export const anyServiceProvider = (overrides?: Partial<UTMServiceProvider>): UTMServiceProvider => ({
    id: 1,
    countryCode: "DE",
    name: "DFS",
    ...overrides,
});

export const makeGetServiceProvidersInterceptor = (
    expectedResponse?: MockResponseArray<UTMServiceProvider>,
    expectedParams?: CypressParameter,
    options?: InterceptorOptions<UTMServiceProvider>
) => {
    const { returnStatus, returnValue } = getResponseValuesArray<UTMServiceProvider>(
        anyServiceProvider,
        200,
        expectedResponse
    );
    const getServiceProvidersRegex = new RegExp(`^${mockedBaseUrl}/flight-plans/service-providers$`, "m");
    return cy
        .intercept("GET", getServiceProvidersRegex, (request) => {
            if (expectedParams && !checkParamsMatches(request.query, expectedParams)) {
                request.destroy();
            }
            request.reply({
                body: returnValue,
                statusCode: returnStatus,
                ...options,
            });
        })
        .as("getServiceProviders");
};
