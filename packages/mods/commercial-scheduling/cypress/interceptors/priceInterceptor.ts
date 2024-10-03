import { Price, anyPrice, anyPriceItem } from "@voloiq/commercial-scheduling-api/v1";
import { planUrl, priceItemUrl, priceUrl } from "./endPoints";

export const getPricesInterceptor = (planId: string, overwrites?: Partial<Price>) => {
    const url = `${planUrl}/${planId}/commercial-prices`;

    cy.intercept("GET", url, {
        statusCode: 200,
        body: {
            data: anyPrice(overwrites),
            error: null,
            meta: null,
            pagination: null,
        },
    }).as("getPrices");
};

export const addPriceInterceptor = (priceId: string) => {
    const url = `${priceUrl}/${priceId}/commercial-price-items/all-days-all-routes`;

    cy.intercept("POST", url, {
        statusCode: 200,
        body: {
            data: anyPriceItem({ commercialPriceId: priceId }),
            error: null,
            meta: null,
            pagination: null,
        },
    }).as("addPrice");
};

export const editPriceItemInterceptor = (priceItemId: string) => {
    const url = `${priceItemUrl}/${priceItemId}`;

    cy.intercept("PATCH", url, {
        statusCode: 200,
        body: {
            data: anyPriceItem({ id: priceItemId }),
            error: null,
            meta: null,
            pagination: null,
        },
    }).as("editPrice");
};

export const approvePriceInterceptor = (priceId: string) => {
    const url = `${priceUrl}/${priceId}/approve`;

    cy.intercept("PUT", url, {
        statusCode: 200,
        body: {
            data: anyPrice({ id: priceId }),
            error: null,
            meta: null,
            pagination: null,
        },
    }).as("approvePrice");
};

export const rejectPriceInterceptor = (priceId: string) => {
    const url = `${priceUrl}/${priceId}/reject`;

    cy.intercept("PUT", url, {
        statusCode: 200,
        body: {
            data: anyPrice({ id: priceId }),
            error: null,
            meta: null,
            pagination: null,
        },
    }).as("rejectPrice");
};

export const requestPriceApproveInterceptor = (priceId: string) => {
    const url = `${priceUrl}/${priceId}`;
    cy.intercept("PATCH", url, {
        statusCode: 200,
        body: {
            data: anyPrice({ id: priceId }),
            error: null,
            meta: null,
            pagination: null,
        },
    }).as("requestPriceApproval");
};
