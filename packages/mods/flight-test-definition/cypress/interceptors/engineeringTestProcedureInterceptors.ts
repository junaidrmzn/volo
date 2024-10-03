import {
    EngineeringTestProcedure,
    EngineeringTestProcedureInsert,
    anyEngineeringTestProcedure,
} from "@voloiq/flight-test-definition-api/v1";
import { parameterRegex, uuidRegex } from "@voloiq/flight-test-definition-utils";
import { InterceptorOptions, getResponseValues, getResponseValuesArray } from "./MockResponse";

const baseUrl = "http://api.cypress.voloiq.io";

export const getAllEngineeringTestProceduresInterceptor = (
    engineeringTestProcedure?: Partial<EngineeringTestProcedure>[],
    options?: InterceptorOptions<EngineeringTestProcedure>
) =>
    cy
        .intercept(
            "GET",
            new RegExp(`${baseUrl}/ftd/v1/definitions/${uuidRegex}/engineering-test-procedures${parameterRegex}$`),
            {
                ...getResponseValuesArray<EngineeringTestProcedure>(
                    anyEngineeringTestProcedure,
                    200,
                    engineeringTestProcedure
                ),
                ...options,
            }
        )
        .as("getAllEngineeringTestProcedures");

export const addEngineeringTestProcedureInterceptor = (
    engineeringTestProcedure?: EngineeringTestProcedureInsert,
    options?: InterceptorOptions<EngineeringTestProcedure>
) =>
    cy
        .intercept(
            "POST",
            new RegExp(`${baseUrl}/ftd/v1/definitions/${uuidRegex}/engineering-test-procedures${parameterRegex}$`),
            {
                ...getResponseValues<EngineeringTestProcedure>(
                    anyEngineeringTestProcedure,
                    200,
                    engineeringTestProcedure
                ),
                ...options,
            }
        )
        .as("addEngineeringTestProcedure");

export const editEngineeringTestProcedureInterceptor = (
    engineeringTestProcedure?: Partial<EngineeringTestProcedureInsert>,
    options?: InterceptorOptions<EngineeringTestProcedure>
) =>
    cy
        .intercept(
            "PATCH",
            new RegExp(`${baseUrl}/ftd/v1/definitions/${uuidRegex}/engineering-test-procedures${parameterRegex}$`),
            {
                ...getResponseValues<EngineeringTestProcedure>(
                    anyEngineeringTestProcedure,
                    200,
                    engineeringTestProcedure
                ),
                ...options,
            }
        )
        .as("editEngineeringTestProcedure");

export const deleteEngineeringTestProcedureInterceptor = (options?: InterceptorOptions<undefined>) =>
    cy
        .intercept(
            "DELETE",
            new RegExp(`${baseUrl}/ftd/v1/definitions/${uuidRegex}/engineering-test-procedures${parameterRegex}$`),
            {
                statusCode: 204,
                ...options,
            }
        )
        .as("deleteEngineeringTestProcedure");
