import type { Event } from "@voloiq-typescript-api/network-scheduling-types";
import { Aircraft } from "@voloiq/network-scheduling-management-api/v1";

export const getAllEventsInterceptor = (events: Event[]) =>
    cy.intercept("GET", "http://api.cypress.voloiq.io/v1/network-scheduling-management/events*", {
        statusCode: 200,
        body: {
            data: events,
        },
    });

export const getEventInterceptor = (event: Event) =>
    cy.intercept("GET", `http://api.cypress.voloiq.io/v1/network-scheduling-management/events/${event.id}`, {
        statusCode: 200,
        body: {
            data: event,
        },
    });

export const deleteEventInterceptor = (event: Event) =>
    cy.intercept("DELETE", `http://api.cypress.voloiq.io/v1/network-scheduling-management/events/${event.id}`, {
        statusCode: 204,
        body: {},
    });

export const addEventInterceptor = (event: Event) =>
    cy.intercept("POST", "http://api.cypress.voloiq.io/v1/network-scheduling-management/events", {
        statusCode: 201,
        body: {
            data: event,
        },
    });

export const editEventInterceptor = (event: Event) =>
    cy.intercept("PUT", `http://api.cypress.voloiq.io/v1/network-scheduling-management/events/${event.id}`, {
        statusCode: 200,
        body: {
            data: event,
        },
    });

export const getAllAircraftsInterceptor = (aircrafts: Aircraft[]) =>
    cy.intercept("GET", `http://api.cypress.voloiq.io/v1/network-scheduling-management/aircraft*`, {
        statusCode: 200,
        body: {
            data: aircrafts,
        },
    });

export const bulkEditEventInterceptors = (events: Event[]) =>
    cy
        .intercept("PUT", "http://api.cypress.voloiq.io/v1/network-scheduling-management/aircraft-events/bulk-edit*", {
            statusCode: 200,
            body: {
                data: events,
            },
        })
        .as("bulkEditEventInterceptors");
