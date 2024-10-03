import type { ParameterGroup } from "@voloiq/flight-test-definition-api/v1";
import { anyParameterGroup } from "@voloiq/flight-test-definition-api/v1";
import { uuidRegex } from "@voloiq/flight-test-definition-utils";
import type { InterceptorOptions } from "./MockResponse";
import { getResponseValues, getResponseValuesArray } from "./MockResponse";

const baseUrl = "http://api.cypress.voloiq.io";
export const getAllParameterGroupsInterceptor = (
    parameterGroups?: Partial<ParameterGroup>[],
    options?: InterceptorOptions<ParameterGroup>
) =>
    cy
        .intercept("GET", new RegExp(`${baseUrl}/ftd/v1/parameter-groups`), {
            ...getResponseValuesArray<ParameterGroup>(anyParameterGroup, 200, parameterGroups),
            ...options,
        })
        .as("getAllParameterGroups");

export const postParameterGroupsInterceptor = (
    parameterGroups?: Partial<ParameterGroup>,
    options?: InterceptorOptions<ParameterGroup>
) =>
    cy
        .intercept("POST", new RegExp(`${baseUrl}/ftd/v1/parameter-groups`), {
            ...getResponseValues<ParameterGroup>(anyParameterGroup, 200, parameterGroups),
            ...options,
        })
        .as("postParameterGroups");

export const deleteParameterGroupsInterceptor = (options?: InterceptorOptions<ParameterGroup>) =>
    cy
        .intercept("DELETE", new RegExp(`${baseUrl}/ftd/v1/parameter-groups/${uuidRegex}`), {
            statusCode: 204,
            ...options,
        })
        .as("deleteParameterGroups");
