import type { CrewMemberWithNames, CrewMembersBlockingTimes } from "@voloiq-typescript-api/crew-api-types";
import { parameterRegex, uuidRegex } from "./regex";

export const getAllCrewMembersBlockingTimesInterceptor = (crewMembersBlockingTimes: CrewMembersBlockingTimes[]) =>
    cy.intercept("GET", "http://api.cypress.voloiq.io/crew-management/v1/crew-management/calendar?*", {
        statusCode: 200,
        body: {
            data: crewMembersBlockingTimes,
        },
    });

export const getCrewMemberBlockingTimesInterceptor = (crewMembersBlockingTimes: CrewMembersBlockingTimes[]) =>
    cy.intercept(
        "GET",
        new RegExp(
            `http://api.cypress.voloiq.io/crew-management/v1/crew-management/${uuidRegex}/calendar${parameterRegex}$`
        ),
        {
            statusCode: 200,
            body: {
                data: crewMembersBlockingTimes,
            },
        }
    );

export const getCrewMemberByNameRequestInterceptor = (name?: string, crewMember?: CrewMemberWithNames) =>
    cy.intercept(
        "GET",
        `http://api.cypress.voloiq.io/crew-management/v1/crew-management/calendar/search?name=${name}`,
        {
            statusCode: 200,
            body: {
                data: crewMember,
            },
        }
    );

export const addCrewMemberBlockingTimeInterceptor = () => {
    const url = new RegExp(
        `^http://api.cypress.voloiq.io/crew-management/v1/crew-management/${uuidRegex}/calendar/block$`
    );
    cy.intercept("POST", url, {
        statusCode: 201,
    });
};

export const updateCrewMemberBlockingTimeInterceptor = () => {
    const url = new RegExp(
        `^http://api.cypress.voloiq.io/crew-management/v1/crew-management/${uuidRegex}/calendar/${uuidRegex}$`
    );
    cy.intercept("PUT", url, {
        statusCode: 200,
    });
};

export const deleteCrewMemberBlockingTimeInterceptor = () => {
    const url = new RegExp(
        `^http://api.cypress.voloiq.io/crew-management/v1/crew-management/${uuidRegex}/calendar/${uuidRegex}$`
    );
    cy.intercept("DELETE", url, {
        statusCode: 204,
    });
};
