import { PromotionItemStatusTag } from "./PromotionItemStatusTag";

describe("PromotionItemStatusTag", () => {
    it("render draft status tag", () => {
        cy.mount(<PromotionItemStatusTag status="CREATED" />);
        cy.findByText(/created/i).should("be.visible");
    });
    it("render claimed status tag", () => {
        cy.mount(<PromotionItemStatusTag status="CLAIMED" />);
        cy.findByText(/claimed/i).should("be.visible");
    });
    it("render redeemed status tag", () => {
        cy.mount(<PromotionItemStatusTag status="REDEEMED" />);
        cy.findByText(/redeemed/i).should("be.visible");
    });
    it("render invalidated status tag", () => {
        cy.mount(<PromotionItemStatusTag status="INVALIDATED" />);
        cy.findByText(/invalidated/i).should("be.visible");
    });
});
