import { Plan, PlanProcess, anyPlan } from "@voloiq/commercial-scheduling-api/v1";
import { planUrl } from "./endPoints";
import { paramsRegex } from "./regex";

export const getPlanInterceptor = (overwrites?: Partial<Plan>) => {
    const url = new RegExp(`^${planUrl}${paramsRegex}$`);

    cy.intercept("GET", url, {
        statusCode: 200,
        body: {
            data: [anyPlan(overwrites)],
            error: null,
            meta: null,
            pagination: { page: 1, size: 10, totalPages: 1, totalElements: 4 },
        },
    }).as("getPlans");
};

export const getPlanByIdInterceptor = (plan: Plan) => {
    const url = `${planUrl}/${plan.id}`;

    cy.intercept("GET", url, {
        statusCode: 200,
        body: {
            data: plan,
            error: null,
            meta: null,
            pagination: { page: 0, size: 0, totalPages: 0, totalElements: 0 },
        },
    }).as("getPlanById");
};

export const createPlanInterceptor = (planProcess: PlanProcess) => {
    const url = new RegExp(`^${planUrl}/upload-ssim${paramsRegex}$`);

    cy.intercept("POST", url, {
        statusCode: 200,
        body: {
            data: planProcess,
            error: null,
            meta: null,
            pagination: null,
        },
    }).as("createPlan");
};

export const editPlanInterceptor = (plan: Plan) => {
    const url = `${planUrl}/${plan.id}`;

    cy.intercept("PATCH", url, {
        statusCode: 200,
        body: {
            data: plan,
            error: null,
            meta: null,
            pagination: { page: 0, size: 0, totalPages: 0, totalElements: 0 },
        },
    }).as("editPlan");
};

export const deletePlanInterceptor = (planId: string) => {
    const url = `${planUrl}/${planId}`;

    cy.intercept("DELETE", url, {
        statusCode: 204,
    }).as("deletePlan");
};

export const requestPlanApprovalInterceptor = (planId: string) => {
    const url = `${planUrl}/${planId}/request-approval`;

    cy.intercept("PUT", url, {
        statusCode: 200,
        body: {
            data: anyPlan({ id: planId }),
            error: null,
            meta: null,
            pagination: null,
        },
    }).as("requestPlanApproval");
};

export const approvePlanInterceptor = (planId: string) => {
    const url = `${planUrl}/${planId}/approve`;

    cy.intercept("PUT", url, {
        statusCode: 200,
        body: {
            data: anyPlan({ id: planId }),
            error: null,
            meta: null,
            pagination: null,
        },
    }).as("approvePlan");
};

export const rejectPlanInterceptor = (planId: string) => {
    const url = `${planUrl}/${planId}/reject`;

    cy.intercept("PUT", url, {
        statusCode: 200,
        body: {
            data: anyPlan({ id: planId }),
            error: null,
            meta: null,
            pagination: null,
        },
    }).as("rejectPlan");
};

export const publishPlanIntercepter = (planId: string) => {
    const url = `${planUrl}/${planId}/publish`;
    cy.intercept("PUT", url, {
        statusCode: 200,
    }).as("publishPlan");
};
