import { Connection, anyConnection } from "@voloiq/commercial-scheduling-api/v1";
import { connectionUrl } from "./endPoints";
import { paramsRegex } from "./regex";

export const getConnectionInterceptor = (overwrites?: Partial<Connection>) => {
    const url = new RegExp(`^${connectionUrl}${paramsRegex}$`);

    cy.intercept("GET", url, {
        statusCode: 200,
        body: {
            data: [anyConnection(overwrites)],
            error: null,
            meta: null,
            pagination: { page: 1, size: 10, totalPages: 1, totalElements: 1 },
        },
    }).as("getConnections");
};

export const getConnectionByIdInterceptor = (connection: Connection) => {
    const url = `${connectionUrl}/${connection.id}`;

    cy.intercept("GET", url, {
        statusCode: 200,
        body: {
            data: connection,
            error: null,
            meta: null,
            pagination: null,
        },
    }).as("getConnectionById");
};

export const createConnectionInterceptor = (connection: Connection) => {
    cy.intercept("POST", connectionUrl, {
        statusCode: 200,
        body: {
            data: connection,
            error: null,
            meta: null,
            pagination: null,
        },
    }).as("createConnection");
};

export const editConnectionInterceptor = (connection: Connection) => {
    const url = `${connectionUrl}/${connection.id}`;

    cy.intercept("PATCH", url, {
        statusCode: 200,
        body: {
            data: connection,
            error: null,
            meta: null,
            pagination: null,
        },
    }).as("editConnection");
};
