/* eslint-disable unicorn/prevent-abbreviations,no-restricted-imports */
import "@4tw/cypress-drag-drop";
import "@testing-library/cypress/add-commands";

declare global {
    namespace Cypress {
        // eslint-disable-next-line prefer-type-alias/prefer-type-alias
        interface Chainable {
            /**
             * Custom Method to check wheather a element is within the viewport of the screen
             */
            isInViewport(element: string): Chainable<Element>;
        }
    }
}
before(() => {
    Cypress.Commands.add("isInViewport", (element) => {
        cy.get(element).then(($element) => {
            // eslint-disable-next-line cypress/no-unnecessary-waiting
            cy.window().should((window) => {
                if (!$element || !$element[0]) return;
                const { documentElement } = window.document;
                const bottom = documentElement.clientHeight;
                const right = documentElement.clientWidth;
                const rect = $element[0].getBoundingClientRect();
                chai.expect(rect.top).to.be.lessThan(bottom);
                chai.expect(rect.bottom).to.be.greaterThan(0);
                chai.expect(rect.right).to.be.greaterThan(0);
                chai.expect(rect.left).to.be.lessThan(right);
            });
        });
    });
});
