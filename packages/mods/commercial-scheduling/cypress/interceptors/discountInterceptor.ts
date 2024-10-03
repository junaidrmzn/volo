import { Discount, anyDiscount } from "@voloiq/commercial-scheduling-api/v1";
import { promotionUrl } from "./endPoints";
import { paramsRegex } from "./regex";

export const getDiscountInterceptor = (overwrites?: Partial<Discount>) => {
    const url = new RegExp(`^${promotionUrl}/discounts${paramsRegex}$`);

    cy.intercept("GET", url, {
        statusCode: 200,
        body: {
            data: [anyDiscount(overwrites)],
            error: null,
            meta: null,
            pagination: { page: 1, size: 10, totalPages: 1, totalElements: 1 },
        },
    }).as("getDiscounts");
};

export const uploadDiscountInterceptor = (overwrites?: Partial<Discount>) => {
    const url = `${promotionUrl}/upload`;

    cy.intercept("POST", url, {
        statusCode: 200,
        body: {
            data: anyDiscount(overwrites),
            error: null,
            meta: null,
            pagination: null,
        },
    }).as("uploadDiscount");
};

export const getDiscountDetailInterceptor = (discountId: string, overwrites?: Partial<Discount>) => {
    const url = `${promotionUrl}/${discountId}`;

    cy.intercept("GET", url, {
        statusCode: 200,
        body: {
            data: anyDiscount(overwrites),
            error: null,
            meta: null,
            pagination: { page: 1, size: 10, totalPages: 1, totalElements: 1 },
        },
    }).as("getDiscounts");
};
