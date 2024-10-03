import type { ApplicableRequirement, ImportantNote } from "@voloiq/flight-test-definition-api/v1";
import { anyImportantNote } from "@voloiq/flight-test-definition-api/v1";
import { parameterRegex, uuidRegex } from "@voloiq/flight-test-definition-utils";
import type { InterceptorOptions } from "./MockResponse";
import { getResponseValuesArray } from "./MockResponse";

const baseUrl = "http://api.cypress.voloiq.io";

export const bulkCreateImportantNotesInterceptor = (options?: InterceptorOptions<undefined>) =>
    cy
        .intercept(
            "POST",
            new RegExp(
                `${baseUrl}/ftd/v1/definitions/${uuidRegex}/procedures/${uuidRegex}/important-notes${parameterRegex}$`
            ),
            {
                statusCode: 201,
                ...options,
            }
        )
        .as("bulkPostImportantNotes");

export const getAllImportantNotesInterceptor = (
    importantNotes?: Partial<ImportantNote>[],
    options?: InterceptorOptions<ApplicableRequirement>
) =>
    cy
        .intercept(
            "GET",
            new RegExp(
                `${baseUrl}/ftd/v1/definitions/${uuidRegex}/procedures/${uuidRegex}/important-notes${parameterRegex}$`
            ),
            {
                ...getResponseValuesArray<ImportantNote>(anyImportantNote, 200, importantNotes),
                ...options,
            }
        )
        .as("getAllImportantNotes");

export const bulkUpdateImportantNotesInterceptor = (options?: InterceptorOptions<undefined>) =>
    cy
        .intercept(
            "PATCH",
            new RegExp(
                `${baseUrl}/ftd/v1/definitions/${uuidRegex}/procedures/${uuidRegex}/important-notes${parameterRegex}$`
            ),
            {
                statusCode: 200,
                ...options,
            }
        )
        .as("bulkPatchImportantNotes");

export const bulkDeleteImportantNotesInterceptor = (options?: InterceptorOptions<undefined>) =>
    cy
        .intercept(
            "DELETE",
            new RegExp(
                `${baseUrl}/ftd/v1/definitions/${uuidRegex}/procedures/${uuidRegex}/important-notes${parameterRegex}$`
            ),
            {
                statusCode: 204,
                ...options,
            }
        )
        .as("bulkDeleteImportantNotes");
