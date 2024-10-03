import { PromotionStatusTag } from "./PromotionStatusTag";

describe("PromotionStatusTag", () => {
    it("render draft status tag", () => {
        cy.mount(<PromotionStatusTag status="DRAFT" />);
        cy.findByText(/draft/i).should("be.visible");
    });
    it("render published status tag", () => {
        cy.mount(<PromotionStatusTag status="PUBLISHED" />);
        cy.findByText(/published/i).should("be.visible");
    });
});
