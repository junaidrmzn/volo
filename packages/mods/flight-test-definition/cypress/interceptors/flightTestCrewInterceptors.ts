import { FlightTestCrew, anyFlightTestCrew } from "@voloiq/flight-test-definition-api/v1";
import { parameterRegex, uuidRegex } from "@voloiq/flight-test-definition-utils";
import { InterceptorOptions, getResponseValuesArray } from "./MockResponse";

const baseUrl = "http://api.cypress.voloiq.io";

export const getAllFlightTestCrewInterceptor = (
    flightTestCards?: Partial<FlightTestCrew>[],
    options?: InterceptorOptions<FlightTestCrew>
) =>
    cy
        .intercept("GET", new RegExp(`${baseUrl}/ftd/v1/orders/${uuidRegex}/crew${parameterRegex}$`), {
            ...getResponseValuesArray<FlightTestCrew>(anyFlightTestCrew, 200, flightTestCards),
            ...options,
        })
        .as("getAllFlightTestCrew");

export const bulkCreateFlightTestCrewInterceptor = (options?: InterceptorOptions<undefined>) =>
    cy
        .intercept("POST", new RegExp(`${baseUrl}/ftd/v1/orders/${uuidRegex}/crew${parameterRegex}$`), {
            statusCode: 201,
            ...options,
        })
        .as("bulkCreateFlightTestCrew");

export const bulkUpdateFlightTestCrewInterceptor = (statusCode = 200, options?: InterceptorOptions<undefined>) =>
    cy
        .intercept("PATCH", new RegExp(`${baseUrl}/ftd/v1/orders/${uuidRegex}/crew${parameterRegex}$`), {
            statusCode,
            ...options,
        })
        .as("bulkUpdateFlightTestCrew");

export const bulkDeleteFlightTestCrewInterceptor = (options?: InterceptorOptions<undefined>) =>
    cy
        .intercept("DELETE", new RegExp(`${baseUrl}/ftd/v1/orders/${uuidRegex}/crew${parameterRegex}$`), {
            statusCode: 204,
            ...options,
        })
        .as("bulkDeleteFlightTestCrew");
