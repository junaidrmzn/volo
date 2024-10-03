import type { ApplicableRequirement } from "@voloiq/flight-test-definition-api/v1";
import { anyApplicableRequirement } from "@voloiq/flight-test-definition-api/v1";
import { parameterRegex, uuidRegex } from "@voloiq/flight-test-definition-utils";
import type { InterceptorOptions } from "./MockResponse";
import { getResponseValuesArray } from "./MockResponse";

const baseUrl = "http://api.cypress.voloiq.io";

export const bulkSetApplicableRequirementsInterceptor = (options?: InterceptorOptions<undefined>) =>
    cy
        .intercept(
            "POST",
            new RegExp(
                `${baseUrl}/ftd/v1/definitions/${uuidRegex}/procedures/${uuidRegex}/applicable-requirements${parameterRegex}$`
            ),
            {
                statusCode: 201,
                ...options,
            }
        )
        .as("bulkPostApplicableRequirements");

export const getAllApplicableRequirementsInterceptor = (
    applicableRequirements?: Partial<ApplicableRequirement>[],
    options?: InterceptorOptions<ApplicableRequirement>
) =>
    cy
        .intercept(
            "GET",
            new RegExp(
                `${baseUrl}/ftd/v1/definitions/${uuidRegex}/procedures/${uuidRegex}/applicable-requirements${parameterRegex}$`
            ),
            {
                ...getResponseValuesArray<ApplicableRequirement>(anyApplicableRequirement, 200, applicableRequirements),
                ...options,
            }
        )
        .as("getAllApplicableRequirements");
