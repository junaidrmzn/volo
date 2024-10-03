/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Parameter, ParameterInsert, ParameterPatch } from "@voloiq-typescript-api/fti-types";
import { mount } from "cypress/react";
import type { ResponseEnvelope } from "@voloiq/service";
import { createParameter, updateParameter } from "./parameter";
import { resetDatabase } from "./reset-database";

declare global {
    namespace Cypress {
        // eslint-disable-next-line prefer-type-alias/prefer-type-alias
        interface Chainable {
            createParameter(parameter: ParameterInsert): Chainable<Cypress.Response<ResponseEnvelope<Parameter>>>;
            updateParameter(
                parameterId: string,
                parameter: ParameterPatch
            ): Chainable<Cypress.Response<ResponseEnvelope<Parameter>>>;
            resetDatabase(): Chainable;
            mount: typeof mount;
        }
    }
}

Cypress.Commands.add("createParameter", createParameter);
Cypress.Commands.add("updateParameter", updateParameter);
Cypress.Commands.add("resetDatabase", resetDatabase);
Cypress.Commands.add("mount", mount);
