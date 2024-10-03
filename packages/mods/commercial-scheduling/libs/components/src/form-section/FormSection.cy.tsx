import { Text } from "@volocopter/design-library-react";
import { FormSection } from "./FormSection";

describe("FormSection", () => {
    it("render", () => {
        cy.mount(
            <FormSection label="Label">
                <Text>Test</Text>
            </FormSection>
        );
        cy.findByText("Label").should("be.visible");
        cy.findByText("Test").should("be.visible");
    });
});
