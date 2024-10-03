import type { SignatureRecord } from "@voloiq/flight-test-definition-api/v1";
import { anySignatureRecord } from "@voloiq/flight-test-definition-api/v1";
import { parameterRegex, uuidRegex } from "@voloiq/flight-test-definition-utils";
import type { InterceptorOptions } from "./MockResponse";
import { getResponseValuesArray } from "./MockResponse";

const baseUrl = "http://api.cypress.voloiq.io";

export const getSignatureRecordsInterceptor = (
    records?: Partial<SignatureRecord>[],
    options?: InterceptorOptions<SignatureRecord>
) =>
    cy
        .intercept(
            "GET",
            new RegExp(`${baseUrl}/ftd/v1/definitions/${uuidRegex}/approval-signatory${parameterRegex}$`),
            {
                ...getResponseValuesArray<SignatureRecord>(anySignatureRecord, 200, records),
                ...options,
            }
        )
        .as("getSignatureRecords");

export const bulkPostSignatureRecordsInterceptor = (options?: InterceptorOptions<undefined>) =>
    cy
        .intercept(
            "POST",
            new RegExp(`${baseUrl}/ftd/v1/definitions/${uuidRegex}/approval-signatory${parameterRegex}$`),
            {
                statusCode: 201,
                ...options,
            }
        )
        .as("bulkPostSignatureRecords");

export const bulkPatchSignatureRecordsInterceptor = (options?: InterceptorOptions<undefined>) =>
    cy
        .intercept(
            "PATCH",
            new RegExp(`${baseUrl}/ftd/v1/definitions/${uuidRegex}/approval-signatory${parameterRegex}$`),
            {
                statusCode: 200,
                ...options,
            }
        )
        .as("bulkPatchSignatureRecords");
