import { Negotiate, anyNegotiate } from "@voloiq/notifications-api/v1";
import { baseUrl } from "./constants";
import { getResponseValues } from "./mockResponse";

export const getNegotiateInterceptor = (negotiate?: Partial<Negotiate>) =>
    cy.intercept("GET", new RegExp(`${baseUrl}/notification/v1/negotiate`), {
        ...getResponseValues(anyNegotiate, 200, negotiate),
    });
