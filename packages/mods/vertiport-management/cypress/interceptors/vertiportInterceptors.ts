import type { Region, StringPair, Vertiport } from "@voloiq/vertiport-management-api/v1";

export const vertiportsListWithEntriesInterceptor = (vertiports: Vertiport[]) =>
    cy.intercept("GET", "http://api.cypress.voloiq.io/vertiport-management/v1/vertiports?*", {
        statusCode: 200,
        body: {
            data: vertiports,
        },
    });

export const regionsListWithEntriesInterceptor = (regions: Region[]) =>
    cy.intercept("GET", "http://api.cypress.voloiq.io/vertiport-management/v1/regions?*", {
        statusCode: 200,
        body: {
            data: regions,
        },
    });

export const servicesListWithEntriesInterceptor = (services: StringPair[]) =>
    cy.intercept("GET", "http://api.cypress.voloiq.io/vertiport-management/v1/vertiports/services*", {
        statusCode: 200,
        body: {
            data: services,
        },
    });

export const getVertiportInterceptor = (vertiport: Vertiport) =>
    cy.intercept(
        "GET",
        `http://api.cypress.voloiq.io/vertiport-management/v1/vertiports/${vertiport.id}?loadImages=true`,
        {
            statusCode: 200,
            body: {
                data: vertiport,
            },
        }
    );

export const getRegionInterceptor = (region: Region) =>
    cy.intercept("GET", `http://api.cypress.voloiq.io/vertiport-management/v1/regions/${region.id}?loadImages=true`, {
        statusCode: 200,
        body: {
            data: region,
        },
    });

export const createVertiportInterceptor = () =>
    cy.intercept("POST", `http://api.cypress.voloiq.io/vertiport-management/v1/vertiports`, {
        statusCode: 201,
    });

export const createRegionInterceptor = () =>
    cy.intercept("POST", `http://api.cypress.voloiq.io/vertiport-management/v1/regions`, {
        statusCode: 201,
    });

export const getAllVertiportsInterceptor = (vertiports: Vertiport[]) =>
    cy.intercept("GET", `http://api.cypress.voloiq.io/vertiport-management/v1/vertiports?*`, {
        statusCode: 200,
        body: {
            data: vertiports,
        },
    });

export const updateVertiportInterceptor = (vertiportId: string) =>
    cy.intercept("PUT", `http://api.cypress.voloiq.io/vertiport-management/v1/vertiports/${vertiportId}`, {
        statusCode: 200,
    });

export const updateRegionInterceptor = (regionId: string) =>
    cy.intercept("PUT", `http://api.cypress.voloiq.io/vertiport-management/v1/regions/${regionId}`, {
        statusCode: 200,
    });

export const deleteVertiportInterceptor = (vertiportId: string) =>
    cy.intercept("DELETE", `http://api.cypress.voloiq.io/vertiport-management/v1/vertiports/${vertiportId}`, {
        statusCode: 204,
    });

export const bulkEditRegionInterceptors = (region: Region) =>
    cy
        .intercept("PUT", "http://api.cypress.voloiq.io/vertiport-management/v1/regions/bulk-edit*", {
            statusCode: 200,
            body: {
                data: [region],
            },
        })
        .as("bulkEditRegionInterceptors");

export const bulkEditVertiportInterceptors = (vertiport: Vertiport) =>
    cy
        .intercept("PUT", "http://api.cypress.voloiq.io/vertiport-management/v1/vertiports/bulk-edit*", {
            statusCode: 200,
            body: {
                data: [vertiport],
            },
        })
        .as("bulkEditVertiportInterceptors");
