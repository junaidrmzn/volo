import type { AircraftType } from "@voloiq-typescript-api/aircraft-management-types";
import { ProductLine } from "@voloiq/aircraft-management-api/v1";

export const addAircraftTypeInterceptor = () =>
    cy.intercept("POST", "http://api.cypress.voloiq.io/v1/aircraft-management/aircraft-types", {
        statusCode: 201,
    });

export const getAircraftTypeInterceptor = (aircraftType: AircraftType) =>
    cy
        .intercept("GET", `http://api.cypress.voloiq.io/v1/aircraft-management/aircraft-types/${aircraftType.id}*`, {
            statusCode: 200,
            body: {
                data: aircraftType,
            },
        })
        .as("getAircraftTypeInterceptor");

export const getProductLinesInterceptor = (productLines: ProductLine[]) =>
    cy
        .intercept("GET", "http://api.cypress.voloiq.io/v1/aircraft-management/product-lines", {
            statusCode: 200,
            body: {
                data: productLines,
            },
        })
        .as("getProductLinesInterceptor");

export const getAllAircraftTypesInterceptor = (aircraftTypes: AircraftType[]) =>
    cy.intercept("GET", `http://api.cypress.voloiq.io/v1/aircraft-management/aircraft-types*`, {
        statusCode: 200,
        body: {
            data: aircraftTypes,
        },
    });

export const editAircraftTypeInterceptor = (aircraftType: AircraftType) =>
    cy
        .intercept("PUT", `http://api.cypress.voloiq.io/v1/aircraft-management/aircraft-types/${aircraftType.id}*`, {
            statusCode: 200,
        })
        .as("editAircraftTypeInterceptor");
