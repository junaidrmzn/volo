import type { WindchillRequirement } from "@voloiq/flight-test-definition-api/v1";
import { anyWindchillRequirement } from "@voloiq/flight-test-definition-api/v1";
import { parameterRegex, uuidRegex } from "@voloiq/flight-test-definition-utils";
import type { InterceptorOptions } from "./MockResponse";
import { getResponseValuesArray } from "./MockResponse";

const baseUrl = "http://api.cypress.voloiq.io";

export const getAssignedWindchillRequirementsInterceptor = (
    windchillRequirements?: Partial<WindchillRequirement>[],
    options?: InterceptorOptions<WindchillRequirement>
) =>
    cy
        .intercept(
            "GET",
            new RegExp(
                `${baseUrl}/ftd/v1/definitions/${uuidRegex}/windchill-associated-requirements${parameterRegex}$`
            ),
            {
                ...getResponseValuesArray<WindchillRequirement>(anyWindchillRequirement, 200, windchillRequirements),
                ...options,
            }
        )
        .as("getAssignedWindchillRequirements");

export const assignWindchillRequirementsInterceptor = (options?: InterceptorOptions<undefined>) =>
    cy
        .intercept(
            "POST",
            new RegExp(
                `${baseUrl}/ftd/v1/definitions/${uuidRegex}/windchill-associated-requirements${parameterRegex}$`
            ),

            {
                statusCode: 201,
                ...options,
            }
        )
        .as("assignWindchillRequirements");

export const unassignWindchillRequirementsInterceptor = (options?: InterceptorOptions<undefined>) =>
    cy
        .intercept(
            "DELETE",
            new RegExp(
                `${baseUrl}/ftd/v1/definitions/${uuidRegex}/windchill-associated-requirements${parameterRegex}$`
            ),

            {
                statusCode: 204,
                ...options,
            }
        )
        .as("unassignWindchillRequirements");

export const patchWindchillAssociatedRequirementsInterceptor = (options?: InterceptorOptions<undefined>) =>
    cy
        .intercept(
            "PATCH",
            new RegExp(
                `${baseUrl}/ftd/v1/definitions/${uuidRegex}/windchill-associated-requirements${parameterRegex}$`
            ),
            {
                statusCode: 200,
                ...options,
            }
        )
        .as("patchWindchillAssociatedRequirements");
