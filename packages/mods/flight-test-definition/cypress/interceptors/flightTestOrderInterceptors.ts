import type { FlightTestOrder } from "@voloiq/flight-test-definition-api/v1";
import { anyFlightTestOrder } from "@voloiq/flight-test-definition-api/v1";
import type { FlightTestOrder as FlightTestOrderV2 } from "@voloiq/flight-test-definition-api/v2";
import { anyFlightTestOrder as anyFlightTestOrderV2 } from "@voloiq/flight-test-definition-api/v2";
import { parameterRegex, uuidRegex } from "@voloiq/flight-test-definition-utils";
import { InterceptorOptions, getResponseValues, getResponseValuesArray } from "./MockResponse";

const baseUrl = "http://api.cypress.voloiq.io";

export const getAllFlightTestOrdersInterceptor = (
    flightTestOrders?: Partial<FlightTestOrder>[],
    options?: InterceptorOptions<FlightTestOrder>
) =>
    cy
        .intercept("GET", new RegExp(`${baseUrl}/ftd/v1/orders${parameterRegex}$`), {
            ...getResponseValuesArray<FlightTestOrder>(anyFlightTestOrder, 200, flightTestOrders),
            ...options,
        })
        .as("getAllFlightTestOrders");

export const getAllFlightTestOrdersV2Interceptor = (
    flightTestOrders?: Partial<FlightTestOrderV2>[],
    options?: InterceptorOptions<FlightTestOrderV2>
) =>
    cy
        .intercept("GET", new RegExp(`${baseUrl}/ftd/v2/orders${parameterRegex}$`), {
            ...getResponseValuesArray<FlightTestOrderV2>(anyFlightTestOrderV2, 200, flightTestOrders),
            ...options,
        })
        .as("getAllFlightTestOrdersV2");

export const getFlightTestOrderInterceptor = (
    flightTestOrder?: Partial<FlightTestOrder>,
    options?: InterceptorOptions<FlightTestOrder>
) =>
    cy
        .intercept("GET", new RegExp(`${baseUrl}/ftd/v1/orders/${uuidRegex}${parameterRegex}$`), {
            ...getResponseValues<FlightTestOrder>(anyFlightTestOrder, 200, flightTestOrder),
            ...options,
        })
        .as("getFlightTestOrder");

export const getFlightTestOrderV2Interceptor = (
    flightTestOrder?: Partial<FlightTestOrderV2>,
    options?: InterceptorOptions<FlightTestOrderV2>
) =>
    cy
        .intercept("GET", new RegExp(`${baseUrl}/ftd/v2/orders/${uuidRegex}${parameterRegex}$`), {
            ...getResponseValues<FlightTestOrderV2>(anyFlightTestOrderV2, 200, flightTestOrder),
            ...options,
        })
        .as("getFlightTestOrderV2");

export const createFlightTestOrderInterceptor = (options?: InterceptorOptions<undefined>) =>
    cy
        .intercept("POST", `${baseUrl}/ftd/v1/orders`, {
            statusCode: 201,
            ...options,
        })
        .as("createFlightTestOrder");

export const updateFlightTestOrderInterceptor = (options?: InterceptorOptions<undefined>) =>
    cy
        .intercept("PATCH", new RegExp(`${baseUrl}/ftd/v1/orders/${uuidRegex}${parameterRegex}$`), {
            statusCode: 200,
            ...options,
        })
        .as("patchFlightTestOrder");

export const updateFlightTestOrderV2Interceptor = (options?: InterceptorOptions<undefined>) =>
    cy
        .intercept("PATCH", new RegExp(`${baseUrl}/ftd/v2/orders/${uuidRegex}${parameterRegex}$`), {
            statusCode: 200,
            ...options,
        })
        .as("patchFlightTestOrderV2");

export const deleteFlightTestOrderInterceptor = (options?: InterceptorOptions<undefined>) =>
    cy
        .intercept("DELETE", new RegExp(`${baseUrl}/ftd/v1/orders/${uuidRegex}${parameterRegex}$`), {
            statusCode: 204,
            ...options,
        })
        .as("deleteFlightTestOrder");

export const exportFlightTestOrderInterceptor = (options?: InterceptorOptions<undefined>) =>
    cy
        .intercept("POST", new RegExp(`${baseUrl}/ftd/v1/orders/${uuidRegex}/pdf$`), {
            statusCode: 200,
            ...options,
        })
        .as("exportFlightTestOrder");

export const requestApprovalFlightTestOrderInterceptor = (options?: InterceptorOptions<undefined>) =>
    cy
        .intercept("POST", new RegExp(`${baseUrl}/ftd/v1/orders/${uuidRegex}/request-approval$`), {
            statusCode: 200,
            ...options,
        })
        .as("requestApprovalFlightTestOrder");

export const declineFlightTestOrderInterceptor = (options?: InterceptorOptions<undefined>) =>
    cy
        .intercept("POST", new RegExp(`${baseUrl}/ftd/v2/orders/${uuidRegex}/decline$`), {
            statusCode: 200,
            ...options,
        })
        .as("requestApprovalFlightTestOrder");
