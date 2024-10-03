import type { Location, LocationInsert } from "@voloiq-typescript-api/logbook-types";
import type { ResponseEnvelope } from "@voloiq/service";

export const createLocation = (Location: LocationInsert) => {
    return cy.request<ResponseEnvelope<Location>>("POST", "/logbook/v5/locations", Location);
};
