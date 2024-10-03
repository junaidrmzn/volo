import type { CrewRole } from "@voloiq-typescript-api/crew-api-types";

export const getCrewRoleInterceptor = (crewRole: CrewRole) =>
    cy.intercept("GET", `http://api.cypress.voloiq.io/crew-management/v1/crew-roles/${crewRole.id}?loadImages=true`, {
        statusCode: 200,
        body: {
            data: crewRole,
        },
    });

export const getCrewRoleWithEntriesInterceptor = (crewRole: CrewRole) =>
    cy.intercept("GET", `http://api.cypress.voloiq.io/crew-management/v1/crew-roles/?loadImages=true`, {
        statusCode: 200,
        body: {
            data: crewRole,
        },
    });

export const createCrewRoleInterceptor = () =>
    cy.intercept("POST", `http://api.cypress.voloiq.io/crew-management/v1/crew-roles`, {
        statusCode: 201,
    });

export const getAllCrewRolesInterceptor = (crewRoles: CrewRole[]) =>
    cy.intercept("GET", `http://api.cypress.voloiq.io/crew-management/v1/crew-roles?*`, {
        statusCode: 200,
        body: {
            data: crewRoles,
        },
    });

export const updateCrewRoleInterceptor = (crewRoleId: string) =>
    cy.intercept("PUT", `http://api.cypress.voloiq.io/crew-management/v1/crew-roles/${crewRoleId}`, {
        statusCode: 200,
    });

export const deleteCrewRoleInterceptor = (crewRoleId: string) =>
    cy.intercept("DELETE", `http://api.cypress.voloiq.io/crew-management/v1/crew-roles/${crewRoleId}`, {
        statusCode: 204,
    });
