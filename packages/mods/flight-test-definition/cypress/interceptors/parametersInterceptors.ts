import type { TestPointParameter } from "@voloiq/flight-test-definition-api/v1";
import { anyTestPointParameter } from "@voloiq/flight-test-definition-api/v1";
import { parameterRegex, uuidRegex } from "@voloiq/flight-test-definition-utils";
import type { InterceptorOptions } from "./MockResponse";
import { getResponseValues, getResponseValuesArray } from "./MockResponse";

const baseUrl = "http://api.cypress.voloiq.io";

export const createParameterInterceptor = (options?: InterceptorOptions<undefined>) =>
    cy
        .intercept("POST", new RegExp(`${baseUrl}/ftd/v1/test-point-parameters${parameterRegex}$`), {
            statusCode: 201,
            ...options,
        })
        .as("postParameter");
export const updateParameterInterceptor = (options?: InterceptorOptions<undefined>) =>
    cy
        .intercept("PATCH", new RegExp(`${baseUrl}/ftd/v1/test-point-parameters/${uuidRegex}${parameterRegex}$`), {
            statusCode: 200,
            ...options,
        })
        .as("patchParameter");
export const deleteParameterInterceptor = (options?: InterceptorOptions<undefined>) =>
    cy
        .intercept("DELETE", new RegExp(`${baseUrl}/ftd/v1/test-point-parameters/${uuidRegex}${parameterRegex}$`), {
            statusCode: 200,
            ...options,
        })
        .as("deleteParameter");

export const getAllParametersInterceptor = (
    parameters?: Partial<TestPointParameter>[],
    options?: InterceptorOptions<TestPointParameter>
) =>
    cy
        .intercept("GET", new RegExp(`${baseUrl}/ftd/v1/test-point-parameters${parameterRegex}$`), {
            ...getResponseValuesArray<TestPointParameter>(anyTestPointParameter, 200, parameters),
            ...options,
        })
        .as("getAllParameters");

export const getParameterInterceptor = (
    parameter?: Partial<TestPointParameter>,
    options?: InterceptorOptions<TestPointParameter>
) =>
    cy
        .intercept("GET", new RegExp(`${baseUrl}/ftd/v1/test-point-parameters/${uuidRegex}${parameterRegex}$`), {
            ...getResponseValues<TestPointParameter>(anyTestPointParameter, 200, parameter),
            ...options,
        })
        .as("getParameter");
