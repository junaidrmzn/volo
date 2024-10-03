import type { Requirement } from "@voloiq/flight-test-definition-api/v1";
import { anyRequirement } from "@voloiq/flight-test-definition-api/v1";
import { parameterRegex, uuidRegex } from "@voloiq/flight-test-definition-utils";
import type { InterceptorOptions } from "./MockResponse";
import { getResponseValuesArray } from "./MockResponse";

const baseUrl = "http://api.cypress.voloiq.io";

export const getAllRequirementsInterceptor = (
    requirements?: Partial<Requirement>[],
    options?: InterceptorOptions<Requirement>
) =>
    cy
        .intercept("GET", new RegExp(`${baseUrl}/ftd/v1/definitions/${uuidRegex}/requirements${parameterRegex}$`), {
            ...getResponseValuesArray<Requirement>(anyRequirement, 200, requirements),
            ...options,
        })
        .as("getAllRequirements");

export const bulkCreateRequirementsInterceptor = (options?: InterceptorOptions<undefined>) =>
    cy
        .intercept("POST", new RegExp(`${baseUrl}/ftd/v1/definitions/${uuidRegex}/requirements${parameterRegex}$`), {
            statusCode: 201,
            ...options,
        })
        .as("bulkPostRequirements");

export const bulkUpdateRequirementsInterceptor = (options?: InterceptorOptions<undefined>) =>
    cy
        .intercept("PATCH", new RegExp(`${baseUrl}/ftd/v1/definitions/${uuidRegex}/requirements${parameterRegex}$`), {
            statusCode: 200,
            ...options,
        })
        .as("bulkPatchRequirements");

export const bulkDeleteRequirementsInterceptor = (options?: InterceptorOptions<undefined>) =>
    cy
        .intercept("DELETE", new RegExp(`${baseUrl}/ftd/v1/definitions/${uuidRegex}/requirements${parameterRegex}$`), {
            statusCode: 204,
            ...options,
        })
        .as("bulkDeleteRequirements");
