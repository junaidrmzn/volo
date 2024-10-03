/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
    Aircraft,
    AircraftInsert,
    CrewMember,
    CrewMemberInsert,
    Location,
    LocationInsert,
    LogInsert,
    Log as LogbookLog,
} from "@voloiq-typescript-api/logbook-types";
import { mount } from "cypress/react";
import type { ResponseEnvelope } from "@voloiq/service";
import { createAircraft } from "./aircraft";
import { createCrewMember } from "./crew-member";
import { createLocation } from "./location";
import { createLog } from "./log";
import { resetDatabase } from "./reset-database";
import { verifyCallCount } from "./verifyCallCount";

declare global {
    namespace Cypress {
        // eslint-disable-next-line prefer-type-alias/prefer-type-alias
        interface Chainable {
            createAircraft(aircraft: AircraftInsert): Chainable<Cypress.Response<ResponseEnvelope<Aircraft>>>;
            createCrewMember(crewMember: CrewMemberInsert): Chainable<Cypress.Response<ResponseEnvelope<CrewMember>>>;
            createLocation(location: LocationInsert): Chainable<Cypress.Response<ResponseEnvelope<Location>>>;
            createLog(log: LogInsert): Chainable<Cypress.Response<ResponseEnvelope<LogbookLog>>>;
            resetDatabase(): Chainable;
            mount: typeof mount;
            verifyCallCount(alias: string, expectedNumberOfCalls: number): Chainable;
        }
    }
}

Cypress.Commands.add("createAircraft", createAircraft);
Cypress.Commands.add("createCrewMember", createCrewMember);
Cypress.Commands.add("createLocation", createLocation);
Cypress.Commands.add("createLog", createLog);
Cypress.Commands.add("resetDatabase", resetDatabase);
Cypress.Commands.add("mount", mount);
Cypress.Commands.add("verifyCallCount", verifyCallCount);
