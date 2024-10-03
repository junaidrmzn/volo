/* eslint-disable unicorn/prevent-abbreviations,no-restricted-imports */
import "@4tw/cypress-drag-drop";
import "@testing-library/cypress/add-commands";
import "../commands";

Cypress.on("uncaught:exception", (error) => {
    // returning false here prevents Cypress from failing the test
    if (error.message.includes("ResizeObserver loop completed with undelivered notifications")) {
        return false;
    }

    return true;
});
