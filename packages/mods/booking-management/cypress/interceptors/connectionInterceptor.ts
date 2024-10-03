import { Connection, anyConnection } from "@voloiq/booking-management-api/v1";
import { connectionUrl } from "./endPoints";
import { paramsRegex } from "./regex";

export const getConnectionsInterceptor = (overwrites?: Partial<Connection>) => {
    const url = new RegExp(`^${connectionUrl}${paramsRegex}$`);

    cy.intercept("GET", url, {
        statusCode: 200,
        body: {
            data: [anyConnection(overwrites)],
            error: null,
            meta: null,
            pagination: { page: 1, size: 1, totalPages: 1, totalElements: 1 },
        },
    }).as("getConnections");
};
