import { anyPlanProcessProgress } from "@voloiq/commercial-scheduling-api/v1";
import { planProcessUrl } from "./endPoints";

export const getPlanProcessProgressInterceptor = (processId: string) => {
    const url = new RegExp(`^${planProcessUrl}/${processId}/progress`);

    cy.intercept("GET", url, {
        statusCode: 200,
        body: {
            data: anyPlanProcessProgress(),
            error: null,
            meta: null,
            pagination: null,
        },
    }).as("getPlanProcessProgress");
};
