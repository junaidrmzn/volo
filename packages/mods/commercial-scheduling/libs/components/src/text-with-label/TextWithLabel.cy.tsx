import { TextWithLabel } from "./TextWithLabel";

describe("TextWithLabel", () => {
    it("render text with label", () => {
        const label = "Label";
        const text = "Text";

        cy.mount(<TextWithLabel label={label} text={text} />);
        cy.findByText(label).should("be.visible");
        cy.findByText(text).should("be.visible");
    });

    it("render text with label and suffix", () => {
        const label = "Label";
        const text = "Text";
        const suffix = "Suffix";

        cy.mount(<TextWithLabel label={label} text={text} suffix={suffix} />);
        cy.findByText(label).should("be.visible");
        cy.findByText(`${text} ${suffix}`).should("be.visible");
    });

    it("render noTextLabel for falsy text", () => {
        const label = "Label";
        const text = undefined;
        const noTextLabel = "No Text";

        cy.mount(<TextWithLabel label={label} text={text} noTextLabel={noTextLabel} />);
        cy.findByText(label).should("be.visible");
        cy.findByText(noTextLabel).should("be.visible");
    });
});
