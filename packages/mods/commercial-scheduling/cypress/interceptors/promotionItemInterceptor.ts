import { PromotionItem, anyPromotionItem } from "@voloiq/commercial-scheduling-api/v1";
import { promotionUrl } from "./endPoints";
import { paramsRegex } from "./regex";

export const getPromotionItemInterceptor = (promotionId: string, overwrites?: Partial<PromotionItem>) => {
    const url = new RegExp(`^${promotionUrl}/${promotionId}/promotion-items${paramsRegex}$`);

    cy.intercept("GET", url, {
        statusCode: 200,
        body: {
            data: [anyPromotionItem(overwrites)],
            error: null,
            meta: null,
            pagination: { page: 1, size: 10, totalPages: 1, totalElements: 1 },
        },
    }).as("getPromotionItems");
};
export const publishPromotionItemInterceptor = (promotionId: string, overwrites?: Partial<PromotionItem>) => {
    const url = new RegExp(`^${promotionUrl}/${promotionId}/publish`);

    cy.intercept("PUT", url, {
        statusCode: 200,
        body: {
            data: [anyPromotionItem(overwrites)],
            error: null,
            meta: null,
            pagination: { page: 1, size: 10, totalPages: 1, totalElements: 1 },
        },
    }).as("publishPromotionItems");
};
