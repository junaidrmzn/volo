import { mount } from "cypress/react";
import { mountWithWrappers } from "../commands/mountWithWrappers";
import "./commands";

declare global {
    namespace Cypress {
        // eslint-disable-next-line prefer-type-alias/prefer-type-alias
        interface Chainable {
            mount: typeof mount;
            mountWithWrappers: typeof mount;
        }
    }
}

Cypress.Commands.add("mount", mount);
Cypress.Commands.add("mountWithWrappers", mountWithWrappers);
Cypress.on("uncaught:exception", (error) => !error.message.includes("ResizeObserver loop limit exceeded"));
