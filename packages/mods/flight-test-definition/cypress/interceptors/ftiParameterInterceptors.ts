import type { AircraftZone, FTILink, Parameter, Workgroup } from "@voloiq/flight-test-definition-api/v1";
import { anyAircraftZone, anyFtiLink, anyFtiParameter, anyWorkgroup } from "@voloiq/flight-test-definition-api/v1";
import { parameterRegex, uuidRegex } from "@voloiq/flight-test-definition-utils";
import type { InterceptorOptions } from "./MockResponse";
import { getResponseValuesArray } from "./MockResponse";

const baseUrl = "http://api.cypress.voloiq.io";

export const getAllInstrumentationParametersInterceptor = (
    ftiParameters?: Partial<Parameter>[],
    options?: InterceptorOptions<Parameter>
) =>
    cy
        .intercept("GET", new RegExp(`${baseUrl}/ftd/v2/instrumentation-parameters${parameterRegex}$`), {
            ...getResponseValuesArray<Parameter>(anyFtiParameter, 200, ftiParameters),
            ...options,
        })
        .as("getAllInstrumentationParameters");

export const getAllLinkedFtiParametersInterceptor = (
    ftiParameters?: Partial<FTILink>[],
    options?: InterceptorOptions<FTILink>
) =>
    cy
        .intercept(
            "GET",
            new RegExp(`${baseUrl}/ftd/v1/definitions/${uuidRegex}/instrumentation-parameters${parameterRegex}$`),
            {
                ...getResponseValuesArray<FTILink>(anyFtiLink, 200, ftiParameters),
                ...options,
            }
        )
        .as("getAllLinkedFtiParameters");

export const bulkAddLinkedFtiParameterInterceptor = (options?: InterceptorOptions<undefined>) =>
    cy
        .intercept(
            "POST",
            new RegExp(`${baseUrl}/ftd/v1/definitions/${uuidRegex}/instrumentation-parameters${parameterRegex}$`),
            {
                statusCode: 201,
                ...options,
            }
        )
        .as("bulkPostLinkedFtiParameter");

export const bulkEditLinkedFtiParameterInterceptor = (options?: InterceptorOptions<undefined>) =>
    cy
        .intercept(
            "PATCH",
            new RegExp(`${baseUrl}/ftd/v1/definitions/${uuidRegex}/instrumentation-parameters${parameterRegex}$`),
            {
                statusCode: 200,
                ...options,
            }
        )
        .as("bulkPatchLinkedFtiParameter");

export const bulkDeleteLinkedFtiParameterInterceptor = (options?: InterceptorOptions<undefined>) =>
    cy
        .intercept(
            "DELETE",
            new RegExp(`${baseUrl}/ftd/v1/definitions/${uuidRegex}/instrumentation-parameters${parameterRegex}$`),
            {
                statusCode: 204,
                ...options,
            }
        )
        .as("bulkDeleteLinkedFtiParameter");

export const getAllAircraftZonesInterceptor = (
    aircraftZones?: Partial<AircraftZone>[],
    options?: InterceptorOptions<AircraftZone>
) =>
    cy
        .intercept("GET", new RegExp(`${baseUrl}/ftd/v1/aircraft-zones${parameterRegex}$`), {
            ...getResponseValuesArray<AircraftZone>(anyAircraftZone, 200, aircraftZones),
            ...options,
        })
        .as("getAllAircraftZones");

export const getAllWorkgroupsInterceptor = (
    workgroups?: Partial<Workgroup>[],
    options?: InterceptorOptions<Workgroup>
) =>
    cy
        .intercept("GET", new RegExp(`${baseUrl}/ftd/v1/workgroups${parameterRegex}$`), {
            ...getResponseValuesArray<Workgroup>(anyWorkgroup, 200, workgroups),
            ...options,
        })
        .as("getAllWorkgroups");
