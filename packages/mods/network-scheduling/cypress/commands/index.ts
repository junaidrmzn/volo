import type {
    Aircraft,
    AircraftCreate,
    AircraftType,
    AircraftTypeCreate,
} from "@voloiq-typescript-api/aircraft-management-types";
import { mount } from "cypress/react";
import type { ResponseEnvelope } from "@voloiq/service";
import { createAircraft, createAircraftType, resetAircraftManagementDatabase } from "./aircraftManagementData";
import { mountWithWrappers } from "./mountWithWrappers";
import { resetNetworkSchedulingDatabase } from "./networkSchedulingData";

declare global {
    namespace Cypress {
        // eslint-disable-next-line prefer-type-alias/prefer-type-alias
        interface Chainable {
            mount: typeof mount;
            resetNetworkSchedulingDatabase(): Chainable;
            resetAircraftManagementDatabase(): Chainable;
            createAircraftType(
                aircraftType: AircraftTypeCreate
            ): Chainable<Cypress.Response<ResponseEnvelope<AircraftType>>>;
            createAircraft(aircraft: AircraftCreate): Chainable<Cypress.Response<ResponseEnvelope<Aircraft>>>;
        }
    }
}

Cypress.Commands.add("mount", mountWithWrappers);
Cypress.on("uncaught:exception", (error) => !error.message.includes("ResizeObserver loop limit exceeded"));

Cypress.Commands.add("resetNetworkSchedulingDatabase", resetNetworkSchedulingDatabase);
Cypress.Commands.add("resetAircraftManagementDatabase", resetAircraftManagementDatabase);
Cypress.Commands.add("createAircraftType", createAircraftType);
Cypress.Commands.add("createAircraft", createAircraft);
