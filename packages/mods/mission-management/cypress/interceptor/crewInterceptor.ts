import type { CrewMemberWithReservations, CrewRole } from "@voloiq-typescript-api/crew-api-types";
import { BASE_URL, PARAMETER_REGEX, UUID_REGEX } from "./regex";

export const availablePilotsListInterceptor = (pilots: CrewMemberWithReservations[]) =>
    cy.intercept(
        "GET",
        new RegExp(
            `${BASE_URL}/v1/network-scheduling-management/crew-members/availability/${UUID_REGEX}${PARAMETER_REGEX}$`
        ),
        {
            statusCode: 200,
            body: {
                data: pilots,
            },
        }
    );

export const availableCrewMembersListInterceptor = (crewMembers: CrewMemberWithReservations[]) =>
    cy.intercept(
        "GET",
        new RegExp(
            `${BASE_URL}/v1/network-scheduling-management/crew-members/availability/${UUID_REGEX}${PARAMETER_REGEX}$`
        ),
        {
            statusCode: 200,
            body: {
                data: crewMembers,
            },
        }
    );

export const getAllCrewRolesInterceptor = (crewRoles: CrewRole[]) =>
    cy.intercept("GET", new RegExp(`${BASE_URL}/v1/network-scheduling-management/crew-roles${PARAMETER_REGEX}$`), {
        statusCode: 200,
        body: {
            data: crewRoles,
        },
    });
