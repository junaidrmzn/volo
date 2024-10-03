import type { CrewMember, CrewMemberInsert } from "@voloiq-typescript-api/logbook-types";
import type { ResponseEnvelope } from "@voloiq/service";

export const createCrewMember = (crewMember: CrewMemberInsert) => {
    return cy.request<ResponseEnvelope<CrewMember>>("POST", "/logbook/v5/crew-members", crewMember);
};
