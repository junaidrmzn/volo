import { Text } from "@volocopter/design-library-react";
import { ItemsWithDivision } from "./ItemsWithDivision";

const ItemsWithDivisionTest = (
    <ItemsWithDivision icon="minus">
        <Text>Left</Text>
        <Text>Right</Text>
    </ItemsWithDivision>
);

describe("ItemsWithDivision", () => {
    it("render texts with minus", () => {
        cy.mount(ItemsWithDivisionTest);
        cy.findByText("Left").should("be.visible");
        cy.findByLabelText(/minus/i);
        cy.findByText("Right").should("be.visible");
    });
});
