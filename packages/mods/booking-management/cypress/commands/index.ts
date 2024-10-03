/// <reference types="cypress" />
import type { mount } from "cypress/react";
import { mountWithWrappers } from "./mountWithWrappers";

declare global {
    namespace Cypress {
        // eslint-disable-next-line prefer-type-alias/prefer-type-alias
        interface Chainable {
            mount: typeof mount;
        }
    }
}

Cypress.Commands.add("mount", mountWithWrappers);
Cypress.on("uncaught:exception", (error) => !error.message.includes("ResizeObserver loop limit exceeded"));
