import type { AttachedFile } from "@voloiq/flight-test-definition-api/v1";
import { anyAttachedFile } from "@voloiq/flight-test-definition-api/v1";
import { parameterRegex, uuidRegex } from "@voloiq/flight-test-definition-utils";
import type { InterceptorOptions } from "./MockResponse";
import { getResponseValues, getResponseValuesArray } from "./MockResponse";

const baseUrl = "http://api.cypress.voloiq.io";

export const getAllAttachedFilesInterceptor = (
    attachedFiles?: Partial<AttachedFile>[],
    options?: InterceptorOptions<AttachedFile>
) =>
    cy
        .intercept("GET", new RegExp(`${baseUrl}/ftd/v1/definitions/${uuidRegex}/files${parameterRegex}$`), {
            ...getResponseValuesArray<AttachedFile>(anyAttachedFile, 200, attachedFiles),
            ...options,
        })
        .as("getAllAttachedFiles");

export const addAttachedFileInterceptor = (
    attachedFile?: Partial<AttachedFile>,
    options?: InterceptorOptions<AttachedFile>
) =>
    cy
        .intercept("POST", new RegExp(`${baseUrl}/ftd/v1/definitions/${uuidRegex}/files${parameterRegex}$`), {
            ...getResponseValues<AttachedFile>(anyAttachedFile, 201, attachedFile),
            ...options,
        })
        .as("postAttachedFile");

export const downloadAttachedFileInterceptor = (options?: InterceptorOptions<undefined>) =>
    cy
        .intercept(
            "GET",
            new RegExp(`${baseUrl}/ftd/v1/definitions/${uuidRegex}/files/${uuidRegex}/download${parameterRegex}$`),
            {
                statusCode: 200,
                ...options,
            }
        )
        .as("getAttachedFile");

export const deleteAttachedFileInterceptor = (options?: InterceptorOptions<undefined>) =>
    cy
        .intercept("DELETE", new RegExp(`${baseUrl}/ftd/v1/definitions/${uuidRegex}/files/${uuidRegex}$`), {
            statusCode: 204,
            ...options,
        })
        .as("deleteAttachedFile");
