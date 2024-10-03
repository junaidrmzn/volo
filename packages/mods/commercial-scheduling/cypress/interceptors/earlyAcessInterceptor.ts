import { EarlyAccess, anyEarlyAccess } from "@voloiq/commercial-scheduling-api/v1";
import { promotionUrl } from "./endPoints";
import { paramsRegex } from "./regex";

export const getEarlyAccessInterceptor = (overwrites?: Partial<EarlyAccess>) => {
    const url = new RegExp(`^${promotionUrl}/early-accesses${paramsRegex}$`);

    cy.intercept("GET", url, {
        statusCode: 200,
        body: {
            data: [anyEarlyAccess(overwrites)],
            error: null,
            meta: null,
            pagination: { page: 1, size: 10, totalPages: 1, totalElements: 1 },
        },
    }).as("getEarlyAccesses");
};
export const uploadEarlyAccessInterceptor = (overwrites?: Partial<EarlyAccess>) => {
    const url = `${promotionUrl}/upload`;

    cy.intercept("POST", url, {
        statusCode: 200,
        body: {
            data: anyEarlyAccess(overwrites),
            error: null,
            meta: null,
            pagination: null,
        },
    }).as("uploadEarlyAccess");
};
export const getEarlyAccessDetailInterceptor = (earlyAccessId: string, overwrites?: Partial<EarlyAccess>) => {
    const url = `${promotionUrl}/${earlyAccessId}`;

    cy.intercept("GET", url, {
        statusCode: 200,
        body: {
            data: anyEarlyAccess(overwrites),
            error: null,
            meta: null,
            pagination: { page: 1, size: 10, totalPages: 1, totalElements: 1 },
        },
    }).as("getEarlyAccesses");
};
