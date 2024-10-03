// eslint-disable-next-line no-restricted-imports
import "@testing-library/cypress/add-commands";
import "../commands";

Cypress.on("uncaught:exception", () => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
});
