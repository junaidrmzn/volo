import type { AircraftType } from "@voloiq-typescript-api/aircraft-management-types";
import type { CrewMember, CrewMemberWithNames } from "@voloiq-typescript-api/crew-api-types";
import type { Region } from "@voloiq-typescript-api/vertiport-management-types";
import { parameterRegex, uuidRegex } from "./regex";

export const getCrewMemberInterceptor = (crewMember: CrewMemberWithNames) =>
    cy.intercept(
        "GET",
        new RegExp(`http://api.cypress.voloiq.io/crew-management/v1/crew-members/with-names/${uuidRegex}`),
        {
            statusCode: 200,
            body: {
                data: crewMember,
            },
        }
    );

export const createCrewMemberInterceptor = () =>
    cy.intercept(
        "POST",
        new RegExp(`http://api.cypress.voloiq.io/crew-management/v1/crew-members/with-assignments${parameterRegex}`),
        {
            statusCode: 201,
        }
    );

export const updateCrewMemberWithAssignmentsInterceptor = () =>
    cy.intercept(
        "PUT",
        new RegExp(`http://api.cypress.voloiq.io/crew-management/v1/crew-members/with-assignments/${uuidRegex}$`),
        {
            statusCode: 200,
        }
    );

export const getCrewMemberWithAssignmentsInterceptor = (crewMember: CrewMember) =>
    cy.intercept(
        "GET",
        new RegExp(`http://api.cypress.voloiq.io/crew-management/v1/crew-members/with-assignments/${uuidRegex}$`),
        {
            statusCode: 200,
            body: {
                data: crewMember,
            },
        }
    );

export const getAllCrewMembersInterceptor = (crewMembers: CrewMemberWithNames[]) =>
    cy.intercept(
        "GET",
        new RegExp(`http://api.cypress.voloiq.io/crew-management/v1/crew-members/with-names${parameterRegex}$`),
        {
            statusCode: 200,
            body: {
                data: crewMembers,
            },
        }
    );

export const updateCrewMemberInterceptor = () =>
    cy.intercept("PUT", new RegExp(`http://api.cypress.voloiq.io/crew-management/v1/crew-members/${uuidRegex}$`), {
        statusCode: 200,
    });

export const deleteCrewMemberInterceptor = () =>
    cy.intercept("DELETE", new RegExp(`http://api.cypress.voloiq.io/crew-management/v1/crew-members/${uuidRegex}$`), {
        statusCode: 204,
    });

export const regionsListWithEntriesInterceptor = (regions: Region[]) =>
    cy.intercept("GET", new RegExp(`http://api.cypress.voloiq.io/crew-management/v1/regions${parameterRegex}$`), {
        statusCode: 200,
        body: {
            data: regions,
        },
    });

export const aircraftTypesListWithEntriesInterceptor = (aircraftTypes: AircraftType[]) =>
    cy.intercept(
        "GET",
        new RegExp(`http://api.cypress.voloiq.io/crew-management/v1/aircraft-types${parameterRegex}$`),
        {
            statusCode: 200,
            body: {
                data: aircraftTypes,
            },
        }
    );

export const bulkEditCrewMembersInterceptors = (crewMembers: CrewMemberWithNames[]) =>
    cy
        .intercept(
            "PUT",
            new RegExp(`http://api.cypress.voloiq.io/crew-management/v1/crew-members/bulk-edit${parameterRegex}$`),
            {
                statusCode: 200,
                body: {
                    data: crewMembers,
                },
            }
        )
        .as("bulkEditCrewMembersInterceptors");
