import type { AircraftType } from "@voloiq-typescript-api/aircraft-management-types";
import type { Vertiport } from "@voloiq-typescript-api/vertiport-management-types";
import { Aircraft, AircraftWithReservations, WorkOrder } from "@voloiq/aircraft-management-api/v1";

export const getAllAircraftsInterceptors = (aircrafts: Aircraft[]) =>
    cy
        .intercept("GET", "http://api.cypress.voloiq.io/v1/aircraft-management/aircraft*", {
            statusCode: 200,
            body: {
                data: aircrafts,
            },
        })
        .as("getAllAircraftsInterceptors");

export const getAircraftInterceptor = (aircraft: Aircraft) =>
    cy
        .intercept("GET", `http://api.cypress.voloiq.io/v1/aircraft-management/aircraft/${aircraft?.id}`, {
            statusCode: 200,
            body: {
                data: aircraft,
            },
        })
        .as("getAircraftInterceptor");

export const getAllAircraftTypesInterceptors = (aircraftTypes: AircraftType[]) =>
    cy
        .intercept("GET", "http://api.cypress.voloiq.io/v1/aircraft-management/aircraft-types*", {
            statusCode: 200,
            body: {
                data: aircraftTypes,
            },
        })
        .as("getAllAircraftTypesInterceptors");

export const getAllHomebasesInterceptors = (homebases: Vertiport[]) =>
    cy
        .intercept("GET", "http://api.cypress.voloiq.io/v1/aircraft-management/vertiports*", {
            statusCode: 200,
            body: {
                data: homebases,
            },
        })
        .as("getAllHomebasesInterceptors");

export const getAllHomebasesWithIdsInterceptors = (homebases: Vertiport[]) =>
    cy
        .intercept("GET", "http://api.cypress.voloiq.io/vertiport-management/v1/vertiports?*", {
            statusCode: 200,
            body: {
                data: homebases,
            },
        })
        .as("getAllHomebasesWithIdsInterceptors");

export const addAircraftInterceptor = () =>
    cy
        .intercept("POST", "http://api.cypress.voloiq.io/v1/aircraft-management/aircraft", {
            statusCode: 201,
        })
        .as("createAircraft");

export const editAircraftInterceptor = (aircraft: Aircraft) =>
    cy
        .intercept("PUT", `http://api.cypress.voloiq.io/v1/aircraft-management/aircraft/${aircraft.id}`, {
            statusCode: 200,
            body: {
                data: aircraft,
            },
        })
        .as("editAircraftInterceptor");

export const aircraftReservationsInterceptor = (aircraftReservations: AircraftWithReservations[]) =>
    cy
        .intercept("GET", `http://api.cypress.voloiq.io/v1/aircraft-management/aircraft/reservations?*`, {
            statusCode: 200,
            body: {
                data: aircraftReservations,
            },
        })
        .as("aircraftReservationsInterceptor");

export const deleteAircraftInterceptor = (aircraftId: string) =>
    cy.intercept("PATCH", `http://api.cypress.voloiq.io/v1/aircraft-management/aircraft/${aircraftId}`, {
        statusCode: 204,
    });

export const bulkEditAircraftInterceptors = (aircraft: Aircraft) =>
    cy
        .intercept("PUT", "http://api.cypress.voloiq.io/v1/aircraft-management/aircrafts/bulk-edit*", {
            statusCode: 200,
            body: {
                data: [aircraft],
            },
        })
        .as("bulkEditAircraftInterceptors");

export const getAllAircraftWorkOrdersInterceptor = (aircraftId: string, workOrders: WorkOrder[]) =>
    cy
        .intercept("GET", `http://api.cypress.voloiq.io/v1/aircraft-management/aircraft/${aircraftId}/work-orders*`, {
            statusCode: 200,
            body: {
                data: workOrders,
            },
        })
        .as("getAllAircraftWorkOrdersInterceptor");
