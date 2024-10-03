import { TextsWithArrow } from "./TextsWithArrow";

describe("TextsWithArrow", () => {
    it("render texts with arrow", () => {
        cy.mount(<TextsWithArrow leftText="Left" rightText="Right" />);
        cy.findByText("Left").should("be.visible");
        cy.findByLabelText(/arrowright/i);
        cy.findByText("Right").should("be.visible");
    });
});
