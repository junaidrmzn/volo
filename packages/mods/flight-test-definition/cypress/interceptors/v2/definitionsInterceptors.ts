import {
    FlightTestDefinitionChangesOverview,
    FlightTestDefinitionResponseBody,
    TabCountersResponseBody,
    anyDefinition,
    anyDefinitionRevision,
    anyTabCounters,
} from "@voloiq/flight-test-definition-api/v2";
import { parameterRegex, revisionRegex, uuidRegex } from "@voloiq/flight-test-definition-utils";
import type { InterceptorOptions } from "../MockResponse";
import { getResponseValues } from "../MockResponse";

const baseUrl = "http://api.cypress.voloiq.io";

export type ApiError = {
    id: string;
    timestamp: string;
    code: number;
    message: string;
    status: string;
    details: string[];
};

export const addDefinitionInterceptorV2 = (options?: InterceptorOptions<undefined>) =>
    cy
        .intercept("POST", new RegExp(`${baseUrl}/ftd/v2/definitions${parameterRegex}$`), {
            statusCode: 201,
            ...options,
        })
        .as("postDefinitionV2");

export const updateDefinitionInterceptorV2 = (
    body?: { data: Partial<FlightTestDefinitionResponseBody> },
    options?: InterceptorOptions<undefined>
) =>
    cy
        .intercept("PATCH", new RegExp(`${baseUrl}/ftd/v2/definitions/${uuidRegex}${parameterRegex}$`), {
            statusCode: 200,
            body,
            ...options,
        })
        .as("patchDefinitionV2");

export const updateDefinitionErrorInterceptorV2 = (error: ApiError, options?: InterceptorOptions<undefined>) =>
    cy
        .intercept("PATCH", new RegExp(`${baseUrl}/ftd/v2/definitions/${uuidRegex}${parameterRegex}$`), {
            statusCode: 400,
            body: { error },
            ...options,
        })
        .as("patchDefinitionErrorV2");

export const getDefinitionInterceptorV2 = (
    definition?: Partial<FlightTestDefinitionResponseBody>,
    options?: InterceptorOptions<FlightTestDefinitionResponseBody>
) =>
    cy
        .intercept("GET", new RegExp(`${baseUrl}/ftd/v2/definitions/${uuidRegex}${parameterRegex}$`), {
            ...getResponseValues<FlightTestDefinitionResponseBody>(anyDefinition, 200, definition),
            ...options,
        })
        .as("getDefinitionV2");

export const getDefinitionRevisionInterceptorV2 = (
    overwrites?: Partial<FlightTestDefinitionChangesOverview>,
    revision?: string,
    options?: InterceptorOptions<FlightTestDefinitionChangesOverview>
) =>
    cy
        .intercept(
            "GET",
            new RegExp(
                `${baseUrl}/ftd/v2/definitions/${uuidRegex}/revisions/${revision || revisionRegex}${parameterRegex}$`
            ),
            {
                ...getResponseValues<FlightTestDefinitionChangesOverview>(anyDefinitionRevision, 200, overwrites),
                ...options,
            }
        )
        .as("getDefinitionRevisionV2");

export const getAllTabCountersInterceptor = (definition?: Partial<TabCountersResponseBody>) =>
    cy
        .intercept("GET", new RegExp(`${baseUrl}/ftd/v2/definitions/${uuidRegex}/tab-counters`), {
            ...getResponseValues<TabCountersResponseBody>(anyTabCounters, 200, definition),
        })
        .as("getAllTabCountersInterceptor");
