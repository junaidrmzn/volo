import type { Aircraft, AircraftInsert } from "@voloiq-typescript-api/logbook-types";
import type { ResponseEnvelope } from "@voloiq/service";

export const createAircraft = (aircraft: AircraftInsert) => {
    return cy.request<ResponseEnvelope<Aircraft>>("POST", "/logbook/v5/aircraft", aircraft);
};
