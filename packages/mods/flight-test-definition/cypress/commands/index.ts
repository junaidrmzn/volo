import type { mount } from "cypress/react";
import { mountWithWrappers } from "./mountWithWrappers";

declare global {
    namespace Cypress {
        // eslint-disable-next-line prefer-type-alias/prefer-type-alias
        interface Chainable {
            mount: typeof mount;
            mountTestPoint: typeof mount;
            mountFlightTestOrder: typeof mount;
            mountWithWrappers: typeof mount;
            mountSpecificUrlGeneralInformation: typeof mount;
            mountSpecificUrlTestMissionAndWeather: typeof mount;
        }
    }
}

Cypress.Commands.add("mount", (children) => mountWithWrappers(children, "/flight-test-suite/definitions"));
Cypress.Commands.add("mountTestPoint", (children) => mountWithWrappers(children, "/flight-test-suite/test-points"));
Cypress.Commands.add("mountFlightTestOrder", (children) => mountWithWrappers(children, "/flight-test-suite/orders"));
Cypress.Commands.add("mountSpecificUrlGeneralInformation", (children) =>
    mountWithWrappers(children, "/flight-test-suite/orders/00afb2b0-52b3-495e-99a4-b68f36f44bba#general-information")
);
Cypress.Commands.add("mountSpecificUrlTestMissionAndWeather", (children) =>
    mountWithWrappers(
        children,
        "/flight-test-suite/orders/00afb2b0-52b3-495e-99a4-b68f36f44bba#test-mission-and-weather"
    )
);
Cypress.on("uncaught:exception", (error) => !error.message.includes("ResizeObserver"));
