import type { WindchillRequirement } from "@voloiq/flight-test-definition-api/v1";
import { anyWindchillRequirement } from "@voloiq/flight-test-definition-api/v1";
import { parameterRegex } from "@voloiq/flight-test-definition-utils";
import type { InterceptorOptions } from "./MockResponse";
import { getResponseValuesArray } from "./MockResponse";

const baseUrl = "http://api.cypress.voloiq.io";

export const getAllWindchillRequirementsInterceptor = (
    windchillRequirements: Partial<WindchillRequirement>[],
    options?: InterceptorOptions<WindchillRequirement>
) =>
    cy
        .intercept("GET", new RegExp(`${baseUrl}/ftd/v1/windchill-requirements${parameterRegex}$`), {
            ...getResponseValuesArray<WindchillRequirement>(anyWindchillRequirement, 200, windchillRequirements, 100),
            ...options,
        })
        .as("getAllWindchillRequirements");

export const patchWindchillRequirementsInterceptor = (options?: InterceptorOptions<undefined>) =>
    cy
        .intercept("PATCH", new RegExp(`${baseUrl}/ftd/v1/windchill-requirements${parameterRegex}$`), {
            statusCode: 200,
            ...options,
        })
        .as("patchWindchillRequirements");
