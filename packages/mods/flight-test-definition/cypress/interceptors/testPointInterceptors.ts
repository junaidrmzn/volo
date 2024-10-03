import type {
    TestPoint,
    TestPointAttempt,
    TestPointAttemptPatch,
    TestPointGroup,
    TestPointInsert,
} from "@voloiq/flight-test-definition-api/v1";
import { anyTestPoint, anyTestPointAttempt, anyTestPointGroup } from "@voloiq/flight-test-definition-api/v1";
import { anyTestPointGroup as anyTestPointGroupV2 } from "@voloiq/flight-test-definition-api/v2";
import type {
    TestPointAttemptPatch as TestPointAttemptPatchV2,
    TestPointGroup as TestPointGroupV2,
} from "@voloiq/flight-test-definition-api/v2";
import { parameterRegex, uuidRegex } from "@voloiq/flight-test-definition-utils";
import type { InterceptorOptions } from "./MockResponse";
import { getResponseValues, getResponseValuesArray } from "./MockResponse";

const baseUrl = "http://api.cypress.voloiq.io";

export const getAllTestPointsInterceptor = (
    testPoints?: Partial<TestPoint>[],
    options?: InterceptorOptions<TestPoint>
) =>
    cy
        .intercept("GET", new RegExp(`${baseUrl}/ftd/v1/test-point${parameterRegex}$`), {
            ...getResponseValuesArray<TestPoint>(anyTestPoint, 200, testPoints),
            ...options,
        })
        .as("getAllTestPoints");
export const getTestPointInterceptor = (testPoint?: Partial<TestPoint>, options?: InterceptorOptions<TestPoint>) =>
    cy
        .intercept("GET", new RegExp(`${baseUrl}/ftd/v1/test-points/${uuidRegex}${parameterRegex}$`), {
            ...getResponseValues<TestPoint>(anyTestPoint, 200, testPoint),
            ...options,
        })
        .as("getTestPoint");

export const getAllTestPointsOfProcedureInterceptor = (
    testPoints?: Partial<TestPoint>[],
    options?: InterceptorOptions<TestPoint>
) =>
    cy
        .intercept(
            "GET",
            new RegExp(
                `${baseUrl}/ftd/v1/definitions/${uuidRegex}/procedures/${uuidRegex}/test-points${parameterRegex}$`
            ),
            {
                ...getResponseValuesArray<TestPoint>(anyTestPoint, 200, testPoints),
                ...options,
            }
        )
        .as("getAllTestPointsOfProcedure");

export const bulkCreateTestPointInterceptor = (options?: InterceptorOptions<TestPointInsert>) =>
    cy
        .intercept(
            "POST",
            new RegExp(
                `${baseUrl}/ftd/v1/definitions/${uuidRegex}/procedures/${uuidRegex}/test-points${parameterRegex}$`
            ),
            {
                statusCode: 201,
                ...options,
            }
        )
        .as("bulkCreateTestPoint");

export const getAllTestPointGroupsInterceptor = (
    testPoints?: Partial<TestPointGroup>[],
    options?: InterceptorOptions<TestPointGroup>
) =>
    cy
        .intercept("GET", new RegExp(`${baseUrl}/ftd/v1/test-point-groups${parameterRegex}$`), {
            ...getResponseValuesArray<TestPointGroup>(anyTestPointGroup, 200, testPoints),
            ...options,
        })
        .as("getAllTestPointGroups");

export const getAllTestPointGroupsV2Interceptor = (
    testPoints?: Partial<TestPointGroupV2>[],
    options?: InterceptorOptions<TestPointGroupV2>
) =>
    cy
        .intercept("GET", new RegExp(`${baseUrl}/ftd/v2/test-point-groups${parameterRegex}$`), {
            ...getResponseValuesArray<TestPointGroupV2>(anyTestPointGroupV2, 200, testPoints),
            ...options,
        })
        .as("getAllTestPointGroupsV2");

export const createTestPointAttemptInterceptor = (
    testPointAttempt: Partial<TestPointAttempt>,
    options?: InterceptorOptions<TestPointAttempt>
) =>
    cy
        .intercept("POST", new RegExp(`${baseUrl}/ftd/v1/test-points/${uuidRegex}/attempts${parameterRegex}$`), {
            ...getResponseValues<TestPointAttempt>(anyTestPointAttempt, 201, testPointAttempt),
            ...options,
        })
        .as("createTestPointAttempt");

export const updateTestPointAttemptInterceptor = (options?: InterceptorOptions<TestPointAttemptPatch>) =>
    cy
        .intercept("PATCH", new RegExp(`${baseUrl}/ftd/v1/test-points/${uuidRegex}/attempts/${uuidRegex}$`), {
            statusCode: 200,
            ...options,
        })
        .as("updateTestPointAttempt");

export const updateTestPointAttemptV2Interceptor = (options?: InterceptorOptions<TestPointAttemptPatchV2>) =>
    cy
        .intercept("PATCH", new RegExp(`${baseUrl}/ftd/v2/test-points/${uuidRegex}/attempts/${uuidRegex}$`), {
            statusCode: 200,
            ...options,
        })
        .as("updateTestPointAttemptV2");
