import { TestHazardAssessment, anyTestHazardAssessment } from "@voloiq/flight-test-definition-api/v1";
import { parameterRegex, uuidRegex } from "@voloiq/flight-test-definition-utils";
import { InterceptorOptions, getResponseValues, getResponseValuesArray } from "./MockResponse";

const baseUrl = "http://api.cypress.voloiq.io";

export const getAllTestHazardAssessmentsInterceptor = (
    partialTestHazardAssessmentList?: Partial<TestHazardAssessment>[]
) =>
    cy
        .intercept("GET", new RegExp(`${baseUrl}/ftd/v1/test-hazard-assessments${parameterRegex}$`), {
            ...getResponseValuesArray<TestHazardAssessment>(
                anyTestHazardAssessment,
                200,
                partialTestHazardAssessmentList
            ),
        })
        .as("getAllTestHazardAssessments");

export const getTestHazardAssessmentInterceptor = (partialTestHazardAssessment?: Partial<TestHazardAssessment>) =>
    cy
        .intercept("GET", new RegExp(`${baseUrl}/ftd/v1/test-hazard-assessments/${uuidRegex}${parameterRegex}$`), {
            ...getResponseValues<TestHazardAssessment>(anyTestHazardAssessment, 200, partialTestHazardAssessment),
        })
        .as("getTestHazardAssessment");

export const createTestHazardAssessmentInterceptor = (options?: InterceptorOptions<undefined>) =>
    cy
        .intercept("POST", new RegExp(`${baseUrl}/ftd/v1/test-hazard-assessments${parameterRegex}$`), {
            statusCode: 201,
            ...options,
        })
        .as("createTestHazardAssessment");

export const patchTestHazardAssessmentInterceptor = (partialTestHazardAssessment?: Partial<TestHazardAssessment>) =>
    cy
        .intercept("PATCH", new RegExp(`${baseUrl}/ftd/v1/test-hazard-assessments/${uuidRegex}${parameterRegex}$`), {
            ...getResponseValues<TestHazardAssessment>(anyTestHazardAssessment, 200, partialTestHazardAssessment),
        })
        .as("patchTestHazardAssessment");

export const softDeleteTestHazardAssessmentInterceptor = (options?: InterceptorOptions<undefined>) =>
    cy
        .intercept("DELETE", new RegExp(`${baseUrl}/ftd/v1/test-hazard-assessments/${uuidRegex}${parameterRegex}$`), {
            statusCode: 204,
            ...options,
        })
        .as("softDeleteTestHazardAssessment");

export const getAssignedTestHazardAssessmentsInterceptor = (
    testHazardAssessments?: Partial<TestHazardAssessment>[],
    options?: InterceptorOptions<TestHazardAssessment>
) =>
    cy
        .intercept(
            "GET",
            new RegExp(`${baseUrl}/ftd/v1/definitions/${uuidRegex}/test-hazard-assessments${parameterRegex}$`),
            {
                ...getResponseValuesArray<TestHazardAssessment>(anyTestHazardAssessment, 200, testHazardAssessments),
                ...options,
            }
        )
        .as("getAssignedTestHazardAssessments");

export const assignTestHazardAssessmentsInterceptor = (options?: InterceptorOptions<undefined>) =>
    cy
        .intercept(
            "POST",
            new RegExp(`${baseUrl}/ftd/v1/definitions/${uuidRegex}/test-hazard-assessments${parameterRegex}$`),

            {
                statusCode: 201,
                ...options,
            }
        )
        .as("assignTestHazardAssessments");

export const unassignTestHazardAssessmentsInterceptor = (options?: InterceptorOptions<undefined>) =>
    cy
        .intercept(
            "DELETE",
            new RegExp(`${baseUrl}/ftd/v1/definitions/${uuidRegex}/test-hazard-assessments${parameterRegex}$`),

            {
                statusCode: 204,
                ...options,
            }
        )
        .as("unassignTestHazardAssessments");
