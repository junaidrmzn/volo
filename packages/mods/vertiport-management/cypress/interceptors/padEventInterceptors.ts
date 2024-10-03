export const createPadEventInterceptor = (vertiportId: string, padId: string) =>
    cy.intercept(
        "POST",
        `http://api.cypress.voloiq.io/vertiport-management/v1/vertiports/${vertiportId}/pads/${padId}/events`,
        {
            statusCode: 201,
        }
    );
