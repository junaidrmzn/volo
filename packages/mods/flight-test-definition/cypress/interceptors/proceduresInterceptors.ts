import {
    Procedure,
    ProcedurePatch,
    ProcedureRevision,
    anyProcedure,
    anyProcedureRevision,
} from "@voloiq/flight-test-definition-api/v1";
import { parameterRegex, uuidRegex } from "@voloiq/flight-test-definition-utils";
import type { InterceptorOptions } from "./MockResponse";
import { getResponseValues, getResponseValuesArray } from "./MockResponse";
import { ApiError } from "./v2/definitionsInterceptors";

const baseUrl = "http://api.cypress.voloiq.io";

export const bulkCreateProcedureInterceptor = (options?: InterceptorOptions<undefined>) =>
    cy
        .intercept("POST", new RegExp(`${baseUrl}/ftd/v1/definitions/${uuidRegex}/procedures${parameterRegex}$`), {
            statusCode: 201,
            ...options,
        })
        .as("bulkPostProcedure");

export const updateProcedureInterceptor = (
    body?: { data: Partial<ProcedurePatch> },
    options?: InterceptorOptions<undefined>
) =>
    cy
        .intercept(
            "PATCH",
            new RegExp(`${baseUrl}/ftd/v1/definitions/${uuidRegex}/procedures/${uuidRegex}${parameterRegex}$`),
            {
                statusCode: 200,
                body,
                ...options,
            }
        )
        .as("patchProcedure");

export const updateProcedureErrorInterceptor = (error: ApiError, options?: InterceptorOptions<undefined>) =>
    cy
        .intercept(
            "PATCH",
            new RegExp(`${baseUrl}/ftd/v1/definitions/${uuidRegex}/procedures/${uuidRegex}${parameterRegex}$`),
            {
                statusCode: 400,
                body: { error },
                ...options,
            }
        )
        .as("patchProcedureError");

export const getProcedureInterceptor = (procedure?: Partial<Procedure>, options?: InterceptorOptions<Procedure>) =>
    cy
        .intercept(
            "GET",
            new RegExp(`${baseUrl}/ftd/v1/definitions/${uuidRegex}/procedures/${uuidRegex}${parameterRegex}$`),
            {
                ...getResponseValues<Procedure>(anyProcedure, 200, procedure),
                ...options,
            }
        )
        .as("getProcedure");

export const getAllProceduresInterceptor = (
    procedures?: Partial<Procedure>[],
    options?: InterceptorOptions<Procedure>
) =>
    cy
        .intercept("GET", new RegExp(`${baseUrl}/ftd/v1/definitions/${uuidRegex}/procedures${parameterRegex}$`), {
            ...getResponseValuesArray<Procedure>(anyProcedure, 200, procedures),
            ...options,
        })
        .as("getAllProcedures");

export const getAllProceduresV2Interceptor = (
    procedures?: Partial<Procedure>[],
    options?: InterceptorOptions<Procedure>
) =>
    cy
        .intercept("GET", new RegExp(`${baseUrl}/ftd/v2/definitions/${uuidRegex}/procedures${parameterRegex}$`), {
            ...getResponseValuesArray<Procedure>(anyProcedure, 200, procedures),
            ...options,
        })
        .as("getAllProceduresV2");

export const bulkUpdateProcedureInterceptor = (options?: InterceptorOptions<undefined>) =>
    cy
        .intercept("PATCH", new RegExp(`${baseUrl}/ftd/v1/definitions/${uuidRegex}/procedures${parameterRegex}$`), {
            statusCode: 200,
            ...options,
        })
        .as("bulkPatchProcedure");

export const bulkDeleteProcedureInterceptor = (options?: InterceptorOptions<undefined>) =>
    cy
        .intercept("DELETE", new RegExp(`${baseUrl}/ftd/v1/definitions/${uuidRegex}/procedures${parameterRegex}$`), {
            statusCode: 204,
            ...options,
        })
        .as("bulkDeleteProcedure");

export const getAllRootProceduresInterceptor = (
    procedures?: Partial<Procedure>[],
    options?: InterceptorOptions<Procedure>
) =>
    cy
        .intercept("GET", new RegExp(`${baseUrl}/ftd/v1/procedures${parameterRegex}$`), {
            ...getResponseValuesArray<Procedure>(anyProcedure, 200, procedures),
            ...options,
        })
        .as("getAllRootProcedures");

export const getReleasedProcedureInterceptor = (
    revision: string,
    procedure?: Partial<Procedure>,
    options?: InterceptorOptions<Procedure>
) =>
    cy
        .intercept(
            "GET",
            new RegExp(
                `${baseUrl}/ftd/v1/definitions/${uuidRegex}/revisions/${revision}/procedures/${uuidRegex}${parameterRegex}$`
            ),
            {
                ...getResponseValues<Procedure>(anyProcedure, 200, procedure),
                ...options,
            }
        )
        .as("getReleasedProcedure");

export const getAllProcedureRevisionsInterceptor = (
    revisions?: Partial<ProcedureRevision>[],
    options?: InterceptorOptions<ProcedureRevision>
) =>
    cy
        .intercept(
            "GET",
            new RegExp(
                `${baseUrl}/ftd/v1/definitions/${uuidRegex}/procedures/${uuidRegex}/revisions${parameterRegex}$`
            ),
            {
                ...getResponseValuesArray<ProcedureRevision>(anyProcedureRevision, 200, revisions),
                ...options,
            }
        )
        .as("getAllProcedureRevisions");
