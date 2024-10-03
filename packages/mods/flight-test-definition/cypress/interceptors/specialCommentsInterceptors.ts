import type { SpecialComment } from "@voloiq/flight-test-definition-api/v1";
import { anySpecialComment } from "@voloiq/flight-test-definition-api/v1";
import { parameterRegex, uuidRegex } from "@voloiq/flight-test-definition-utils";
import type { InterceptorOptions } from "./MockResponse";
import { getResponseValuesArray } from "./MockResponse";

const baseUrl = "http://api.cypress.voloiq.io";

export const getAllSpecialCommentsInterceptor = (
    specialComments?: Partial<SpecialComment>[],
    options?: InterceptorOptions<SpecialComment>
) =>
    cy
        .intercept("GET", new RegExp(`${baseUrl}/ftd/v1/definitions/${uuidRegex}/special-comments${parameterRegex}$`), {
            ...getResponseValuesArray<SpecialComment>(anySpecialComment, 200, specialComments),
            ...options,
        })
        .as("getAllSpecialComments");

export const createSpecialCommentsInterceptor = (options?: InterceptorOptions<undefined>) =>
    cy
        .intercept(
            "POST",
            new RegExp(`${baseUrl}/ftd/v1/definitions/${uuidRegex}/special-comments${parameterRegex}$`),
            {
                statusCode: 201,
                ...options,
            }
        )
        .as("postSpecialComments");

export const updateSpecialCommentsInterceptor = (options?: InterceptorOptions<undefined>) =>
    cy
        .intercept(
            "PATCH",
            new RegExp(`${baseUrl}/ftd/v1/definitions/${uuidRegex}/special-comments${parameterRegex}$`),
            {
                statusCode: 200,
                ...options,
            }
        )
        .as("patchSpecialComments");

export const deleteSpecialCommentsInterceptor = (options?: InterceptorOptions<undefined>) =>
    cy
        .intercept(
            "DELETE",
            new RegExp(`${baseUrl}/ftd/v1/definitions/${uuidRegex}/special-comments${parameterRegex}$`),
            {
                statusCode: 204,
                ...options,
            }
        )
        .as("deleteSpecialComments");
