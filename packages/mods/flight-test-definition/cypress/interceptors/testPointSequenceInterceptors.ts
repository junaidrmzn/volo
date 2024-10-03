import {
    TestPoint,
    TestPointSequence,
    TestPointSequenceTestPointAssociation,
    anyTestPoint,
    anyTestPointSequence,
    anyTestPointSequenceTestPointAssociation,
} from "@voloiq/flight-test-definition-api/v1";
import { parameterRegex, uuidRegex } from "@voloiq/flight-test-definition-utils";
import { InterceptorOptions, getResponseValues, getResponseValuesArray } from "./MockResponse";

const baseUrl = "http://api.cypress.voloiq.io";

export const getTestPointSequenceInterceptor = (
    testPointSequence?: Partial<TestPointSequence>,
    options?: InterceptorOptions<TestPointSequence>
) =>
    cy
        .intercept(
            "GET",
            new RegExp(`${baseUrl}/ftd/v1/orders/${uuidRegex}/test-point-sequence/${uuidRegex}${parameterRegex}$`),
            {
                ...getResponseValues<TestPointSequence>(anyTestPointSequence, 200, testPointSequence),
                ...options,
            }
        )
        .as("getTestPointSequence");

export const getAllTestPointSequencesInterceptor = (
    testPointSequences?: Partial<TestPointSequence>[],
    options?: InterceptorOptions<TestPointSequence>
) =>
    cy
        .intercept("GET", new RegExp(`${baseUrl}/ftd/v1/orders/${uuidRegex}/test-point-sequence${parameterRegex}$`), {
            ...getResponseValuesArray<TestPointSequence>(anyTestPointSequence, 200, testPointSequences),
            ...options,
        })
        .as("getAllTestPointSequences");

export const getAllTestPointSequenceTestPointAssociationsInterceptor = (
    testPointAssociations?: Partial<TestPointSequenceTestPointAssociation>[],
    options?: InterceptorOptions<TestPointSequenceTestPointAssociation>
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
        .as("getAllTestPointSequenceTestPointAssociations");

export const getAllTestPointSequenceTestPointsInterceptor = (
    testPointAssociations?: Partial<TestPoint>[],
    options?: InterceptorOptions<TestPoint>
) =>
    cy
        .intercept(
            "GET",
            new RegExp(
                `${baseUrl}/ftd/v1/orders/${uuidRegex}/test-point-sequence/${uuidRegex}/test-points${parameterRegex}$`
            ),
            {
                ...getResponseValuesArray<TestPoint>(anyTestPoint, 200, testPointAssociations),
                ...options,
            }
        )
        .as("getAllTestPointSequenceTestPoints");

export const bulkCreateTestPointSequencesInterceptor = (options?: InterceptorOptions<undefined>) =>
    cy
        .intercept("POST", new RegExp(`${baseUrl}/ftd/v1/orders/${uuidRegex}/test-point-sequence${parameterRegex}$`), {
            statusCode: 201,
            ...options,
        })
        .as("bulkCreateTestPointSequences");

export const bulkUpdateTestPointSequencesInterceptor = (statusCode = 201, options?: InterceptorOptions<undefined>) =>
    cy
        .intercept("PATCH", new RegExp(`${baseUrl}/ftd/v1/orders/${uuidRegex}/test-point-sequence${parameterRegex}$`), {
            statusCode,
            ...options,
        })
        .as("bulkUpdateTestPointSequences");

export const bulkDeleteTestPointSequencesInterceptor = (options?: InterceptorOptions<undefined>) =>
    cy
        .intercept(
            "DELETE",
            new RegExp(`${baseUrl}/ftd/v1/orders/${uuidRegex}/test-point-sequence${parameterRegex}$`),
            {
                statusCode: 204,
                ...options,
            }
        )
        .as("bulkDeleteTestPointSequences");

export const bulkCreateTestPointSequenceTestPointAssociationInterceptor = (options?: InterceptorOptions<undefined>) =>
    cy
        .intercept(
            "POST",
            new RegExp(
                `${baseUrl}/ftd/v1/orders/${uuidRegex}/test-point-sequence/${uuidRegex}/test-points${parameterRegex}$`
            ),
            {
                statusCode: 201,
                ...options,
            }
        )
        .as("bulkCreateTestPointSequenceTestPointAssociation");

export const bulkDeleteTestPointSequenceTestPointAssociationInterceptor = (options?: InterceptorOptions<undefined>) =>
    cy
        .intercept(
            "DELETE",
            new RegExp(
                `${baseUrl}/ftd/v1/orders/${uuidRegex}/test-point-sequence/${uuidRegex}/test-points${parameterRegex}$`
            ),
            {
                statusCode: 204,
                ...options,
            }
        )
        .as("bulkDeleteTestPointSequenceTestPointAssociation");
