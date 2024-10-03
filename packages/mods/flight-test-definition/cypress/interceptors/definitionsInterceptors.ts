import {
    FlightTestDefinitionOverviewListResponseBody,
    FlightTestDefinitionOverviewResponseBody,
    FlightTestDefinitionResponseBody,
    anyDefinition,
    anyDefinitionByGroup as anyDefinitionByGroupV2,
} from "@voloiq/flight-test-definition-api/v2";
import { parameterRegex, uuidRegex } from "@voloiq/flight-test-definition-utils";
import type { InterceptorOptions } from "./MockResponse";
import { getResponseValues, getResponseValuesArray } from "./MockResponse";

const baseUrl = "http://api.cypress.voloiq.io";

export const getAllDefinitionsByAtaInterceptor = (
    partialDefinitionOverviewList?: Partial<
        Omit<FlightTestDefinitionOverviewListResponseBody, "value"> & {
            value: Partial<FlightTestDefinitionOverviewResponseBody>[];
        }
    >[],
    options?: InterceptorOptions<FlightTestDefinitionOverviewListResponseBody>
) =>
    cy
        .intercept("GET", new RegExp(`${baseUrl}/ftd/v1/definitions-by-ata${parameterRegex}$`), {
            ...getResponseValuesArray<
                Omit<FlightTestDefinitionOverviewListResponseBody, "value"> & {
                    value: Partial<FlightTestDefinitionOverviewResponseBody>[];
                }
            >(anyDefinitionByGroupV2, 200, partialDefinitionOverviewList),
            ...options,
        })
        .as("getAllDefinitionsByAta");

export const getAllDefinitionsInterceptor = (
    partialDefinitionOverviewList?: Partial<FlightTestDefinitionResponseBody>[],
    options?: InterceptorOptions<FlightTestDefinitionOverviewListResponseBody>
) =>
    cy
        .intercept("GET", new RegExp(`${baseUrl}/ftd/v2/definitions-all${parameterRegex}$`), {
            ...getResponseValuesArray<FlightTestDefinitionResponseBody>(
                anyDefinition,
                200,
                partialDefinitionOverviewList
            ),
            ...options,
        })
        .as("getAllDefinitions");

export const deleteDefinitionInterceptor = (options?: InterceptorOptions<undefined>) =>
    cy
        .intercept("DELETE", new RegExp(`${baseUrl}/ftd/v1/definitions/${uuidRegex}${parameterRegex}$`), {
            statusCode: 200,
            ...options,
        })
        .as("deleteDefinition");

export const getDefinitionInterceptor = (
    definition?: Partial<FlightTestDefinitionResponseBody>,
    options?: InterceptorOptions<FlightTestDefinitionResponseBody>
) =>
    cy
        .intercept("GET", new RegExp(`${baseUrl}/ftd/v1/definitions/${uuidRegex}${parameterRegex}$`), {
            ...getResponseValues<FlightTestDefinitionResponseBody>(anyDefinition, 200, definition),
            ...options,
        })
        .as("getDefinition");
