import type { AdditionalComment } from "@voloiq/flight-test-definition-api/v1";
import { anyAdditionalComment } from "@voloiq/flight-test-definition-api/v1";
import { parameterRegex, uuidRegex } from "@voloiq/flight-test-definition-utils";
import type { InterceptorOptions } from "./MockResponse";
import { getResponseValuesArray } from "./MockResponse";

const baseUrl = "http://api.cypress.voloiq.io";

export const bulkCreateAdditionalCommentsInterceptor = (options?: InterceptorOptions<undefined>) =>
    cy
        .intercept(
            "POST",
            new RegExp(
                `${baseUrl}/ftd/v1/definitions/${uuidRegex}/procedures/${uuidRegex}/additional-comments${parameterRegex}$`
            ),

            {
                statusCode: 201,
                ...options,
            }
        )
        .as("bulkPostAdditionalComments");

export const getAllAdditionalCommentsInterceptor = (
    additionalComments?: Partial<AdditionalComment>[],
    options?: InterceptorOptions<AdditionalComment>
) =>
    cy
        .intercept(
            "GET",
            new RegExp(
                `${baseUrl}/ftd/v1/definitions/${uuidRegex}/procedures/${uuidRegex}/additional-comments${parameterRegex}$`
            ),
            { ...getResponseValuesArray<AdditionalComment>(anyAdditionalComment, 200, additionalComments), ...options }
        )
        .as("getAllAdditionalComments");

export const bulkUpdateAdditionalCommentsInterceptor = (options?: InterceptorOptions<undefined>) =>
    cy
        .intercept(
            "PATCH",
            new RegExp(
                `${baseUrl}/ftd/v1/definitions/${uuidRegex}/procedures/${uuidRegex}/additional-comments${parameterRegex}$`
            ),
            {
                statusCode: 200,
                ...options,
            }
        )
        .as("bulkPatchAdditionalComments");

export const bulkDeleteAdditionalCommentsInterceptor = (options?: InterceptorOptions<undefined>) =>
    cy
        .intercept(
            "DELETE",
            new RegExp(
                `${baseUrl}/ftd/v1/definitions/${uuidRegex}/procedures/${uuidRegex}/additional-comments${parameterRegex}$`
            ),
            {
                statusCode: 204,
                ...options,
            }
        )
        .as("bulkDeleteAdditionalComments");
