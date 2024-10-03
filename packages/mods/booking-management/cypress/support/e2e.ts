// eslint-disable-next-line unicorn/prevent-abbreviations, no-restricted-imports
import "@testing-library/cypress/add-commands";
import "../commands";

const resizeObserverLoopErrorRegex = /^[^ ()ORb-eilmopr-tvxz]/;
Cypress.on("uncaught:exception", (error) => !resizeObserverLoopErrorRegex.test(error.message));
