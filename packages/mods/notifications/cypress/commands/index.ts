/// <reference types="cypress" />
import { mountWithWrappers } from "./mountWithWrappers";

declare global {
    namespace Cypress {
        // eslint-disable-next-line prefer-type-alias/prefer-type-alias
        interface Chainable {
            mount: typeof mountWithWrappers;
        }
    }
}

Cypress.Commands.add("mount", mountWithWrappers);
