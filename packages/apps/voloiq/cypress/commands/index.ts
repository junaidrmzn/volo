import { MountWithWrappers, mountWithWrappers } from "./mountWithWrappers";

declare global {
    namespace Cypress {
        // eslint-disable-next-line prefer-type-alias/prefer-type-alias
        interface Chainable {
            mount: MountWithWrappers;
        }
    }
}

Cypress.Commands.add("mount", mountWithWrappers);
