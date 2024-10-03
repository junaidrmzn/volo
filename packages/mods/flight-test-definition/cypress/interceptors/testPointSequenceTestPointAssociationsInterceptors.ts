import {
    TestPointSequenceTestPointAssociation,
    anyTestPointSequenceTestPointAssociation,
} from "@voloiq/flight-test-definition-api/v1";
import { parameterRegex, uuidRegex } from "@voloiq/flight-test-definition-utils";
import { InterceptorOptions, getResponseValuesArray } from "./MockResponse";

const baseUrl = "http://api.cypress.voloiq.io";

export const bulkAddTestPointSequenceManualRowsInterceptor = (
    statusCode = 201,
    options?: InterceptorOptions<undefined>
) =>
    cy
        .intercept(
            "POST",
            new RegExp(
                `${baseUrl}/ftd/v1/orders/${uuidRegex}/test-point-sequence/${uuidRegex}/test-point-associations${parameterRegex}$`
            ),
            {
                statusCode,
                ...options,
            }
        )
        .as("bulkAddTestPointSequenceManualRows");

export const getAllTestPointSequenceTestPointAssociationsInterceptor = (
    testPointAssociations?: Partial<TestPointSequenceTestPointAssociation>[],
    options?: InterceptorOptions<undefined>
) =>
    cy
        .intercept(
            "GET",
            new RegExp(
                `${baseUrl}/ftd/v1/orders/${uuidRegex}/test-point-sequence/${uuidRegex}/test-point-associations${parameterRegex}$`
            ),
            {
                ...getResponseValuesArray<TestPointSequenceTestPointAssociation>(
                    anyTestPointSequenceTestPointAssociation,
                    200,
                    testPointAssociations
                ),
                ...options,
            }
        )
        .as("bulkEditTestPointSequenceTestPointAssociations");

export const bulkEditTestPointSequenceTestPointAssociationsInterceptor = (
    statusCode = 200,
    options?: InterceptorOptions<undefined>
) =>
    cy
        .intercept(
            "PATCH",
            new RegExp(
                `${baseUrl}/ftd/v1/orders/${uuidRegex}/test-point-sequence/${uuidRegex}/test-point-associations${parameterRegex}$`
            ),
            {
                statusCode,
                ...options,
            }
        )
        .as("bulkEditTestPointSequenceTestPointAssociations");

export const bulkDeleteTestPointSequenceTestPointAssociationsInterceptor = (
    statusCode = 204,
    options?: InterceptorOptions<undefined>
) =>
    cy
        .intercept(
            "DELETE",
            new RegExp(
                `${baseUrl}/ftd/v1/orders/${uuidRegex}/test-point-sequence/${uuidRegex}/test-point-associations${parameterRegex}$`
            ),
            {
                statusCode,
                ...options,
            }
        )
        .as("bulkDeleteTestPointSequenceTestPointAssociations");
