import type { Pad } from "@voloiq/vertiport-management-api/v1";

export const createPadInterceptor = (vertiportId: string) =>
    cy.intercept("POST", `http://api.cypress.voloiq.io/vertiport-management/v1/vertiports/${vertiportId}/pads`, {
        statusCode: 201,
    });

export const getAllPadsInterceptor = (vertiportId: string, pads: Pad[]) =>
    cy.intercept("GET", `http://api.cypress.voloiq.io/vertiport-management/v1/vertiports/${vertiportId}/pads?*`, {
        statusCode: 200,
        body: {
            data: pads,
        },
    });

export const updatePadInterceptor = (vertiportId: string, padId: string) =>
    cy.intercept(
        "PUT",
        `http://api.cypress.voloiq.io/vertiport-management/v1/vertiports/${vertiportId}/pads/${padId}`,
        {
            statusCode: 200,
        }
    );

export const deletePadInterceptor = (vertiportId: string, padId: string) =>
    cy.intercept(
        "DELETE",
        `http://api.cypress.voloiq.io/vertiport-management/v1/vertiports/${vertiportId}/pads/${padId}`,
        {
            statusCode: 204,
        }
    );
