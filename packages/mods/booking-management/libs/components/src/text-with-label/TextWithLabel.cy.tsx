import { TextWithLabel } from "./TextWithLabel";

describe("TextWithLabel", () => {
    it("render text with label", () => {
        cy.mount(<TextWithLabel label="Label">Text</TextWithLabel>);
        cy.findByText("Label").should("be.visible");
        cy.findByText("Text").should("be.visible");
    });
});
