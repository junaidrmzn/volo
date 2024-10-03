import type { mount } from "cypress/react";
import { addEsuTypes } from "./addEsuTypes";
import { addLocations } from "./addLocations";
import { addVertiport } from "./addVertiport";
import { addVtolTypes } from "./addVtolTypes";
import { mountWithWrappers } from "./mountWithWrappers";
import { resetVertiportManagementDatabase } from "./resetVertiportManagementDatabase";

declare global {
    namespace Cypress {
        // eslint-disable-next-line prefer-type-alias/prefer-type-alias
        interface Chainable {
            mount: typeof mount;
            resetVertiportManagementDatabase(): Chainable;
            addVtolTypes(): Chainable;
            addEsuTypes(): Chainable;
            addVertiport(): Chainable;
            addLocations(): Chainable;
        }
    }
}

Cypress.Commands.add("mount", mountWithWrappers);
Cypress.on("uncaught:exception", (error) => !error.message.includes("ResizeObserver loop limit exceeded"));
Cypress.Commands.add("resetVertiportManagementDatabase", resetVertiportManagementDatabase);
Cypress.Commands.add("addVtolTypes", addVtolTypes);
Cypress.Commands.add("addEsuTypes", addEsuTypes);
Cypress.Commands.add("addVertiport", addVertiport);
Cypress.Commands.add("addLocations", addLocations);
