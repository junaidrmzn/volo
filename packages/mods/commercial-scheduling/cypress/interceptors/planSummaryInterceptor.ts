import { PlanSummary, anyPlanSummary } from "@voloiq/commercial-scheduling-api/v1";
import { planSummaryUrl, planUrl } from "./endPoints";
import { numberRegex, paramsRegex } from "./regex";

export const getPlanSummaryInterceptor = (planId: string, overwrites?: Partial<PlanSummary>) => {
    const url = new RegExp(`^${planUrl}/${planId}/summary${paramsRegex}$`);
    cy.intercept("GET", url, {
        statusCode: 200,
        body: {
            data: [anyPlanSummary(overwrites)],
            error: null,
            meta: null,
            pagination: null,
        },
    }).as("getPlanSummary");
};

export const addPlanSummaryInterceptor = (overwrites?: Partial<PlanSummary>) => {
    const url = new RegExp(`^${planSummaryUrl}`);
    cy.intercept("POST", url, {
        statusCode: 201,
        body: {
            data: anyPlanSummary(overwrites),
        },
    }).as("addPlanSummary");
};

export const editPlanSummaryInterceptor = (scheduleId: string, overwrites?: Partial<PlanSummary>) => {
    const url = new RegExp(`^${planSummaryUrl}/${scheduleId}`);
    cy.intercept("PUT", url, {
        statusCode: 200,
        body: {
            data: anyPlanSummary(overwrites),
        },
    }).as("editPlanSummary");
};

export const deletePlanSummaryCustomizationInterceptor = () => {
    const url = `${planSummaryUrl}/${numberRegex}`;
    cy.intercept("DELETE", url, {
        statusCode: 204,
    }).as("deletePlanSummaryCustomization");
};

export const approvePlanSummaryInterceptor = (overwrites?: Partial<PlanSummary>) => {
    const url = new RegExp(`^${planSummaryUrl}/approve`);
    cy.intercept("PUT", url, {
        statusCode: 200,
        body: {
            data: anyPlanSummary(overwrites),
        },
    }).as("approvePlanSummary");
};

export const overwritePlanSummaryInterceptor = (scheduleId: string, overwrites?: Partial<PlanSummary>) => {
    const url = new RegExp(`^${planSummaryUrl}/${scheduleId}/overwrite`);
    cy.intercept("PUT", url, {
        statusCode: 200,
        body: {
            data: anyPlanSummary(overwrites),
        },
    }).as("overwritePlanSummary");
};
