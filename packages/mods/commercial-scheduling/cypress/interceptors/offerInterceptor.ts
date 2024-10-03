import { Offer, anyOffer, anyOfferItem } from "@voloiq/commercial-scheduling-api/v1";
import { offerItemUrl, offerUrl, planUrl } from "./endPoints";

export const getOffersInterceptor = (planId: string, overwrites?: Partial<Offer>) => {
    const url = `${planUrl}/${planId}/commercial-offers`;

    cy.intercept("GET", url, {
        statusCode: 200,
        body: {
            data: anyOffer(overwrites),
            error: null,
            meta: null,
            pagination: null,
        },
    }).as("getOffers");
};

export const requestOfferApproveInterceptor = (offerId: string) => {
    const url = `${offerUrl}/${offerId}`;
    cy.intercept("PATCH", url, {
        statusCode: 200,
        body: {
            data: anyOffer({ id: offerId, status: "AWAITING_APPROVAL" }),
            error: null,
            meta: null,
            pagination: null,
        },
    }).as("requestOfferApproval");
};

export const editOfferItemInterceptor = (offerItemId: string) => {
    const url = `${offerItemUrl}/${offerItemId}`;

    cy.intercept("PATCH", url, {
        statusCode: 200,
        body: {
            data: anyOfferItem({ commercialOfferId: offerItemId }),
            error: null,
            meta: null,
            pagination: null,
        },
    }).as("editOffer");
};

export const addOfferItemInterceptor = (offerId: string) => {
    const url = `${offerUrl}/${offerId}/commercial-offer-items/all-days-all-routes`;

    cy.intercept("POST", url, {
        statusCode: 200,
        body: {
            data: anyOffer(),
            error: null,
            meta: null,
            pagination: null,
        },
    }).as("addOffer");
};

export const approveOfferInterceptor = (offerId: string) => {
    const url = `${offerUrl}/${offerId}/approve`;

    cy.intercept("PUT", url, {
        statusCode: 200,
        body: {
            data: anyOffer({ id: offerId }),
            error: null,
            meta: null,
            pagination: null,
        },
    }).as("approveOffer");
};

export const rejectOfferInterceptor = (offerId: string) => {
    const url = `${offerUrl}/${offerId}/reject`;

    cy.intercept("PUT", url, {
        statusCode: 200,
        body: {
            data: anyOffer({ id: offerId }),
            error: null,
            meta: null,
            pagination: null,
        },
    }).as("rejectPrice");
};
