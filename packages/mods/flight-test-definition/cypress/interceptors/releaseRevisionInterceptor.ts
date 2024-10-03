import { uuidRegex } from "@voloiq/flight-test-definition-utils";

const baseUrl = "http://api.cypress.voloiq.io";

export const releaseRevisionInterceptor = () =>
    cy
        .intercept("POST", new RegExp(`${baseUrl}/ftd/v1/definitions/${uuidRegex}/revisions`), {
            statusCode: 204,
            body: null,
        })
        .as("releaseRevisionInterceptor");
