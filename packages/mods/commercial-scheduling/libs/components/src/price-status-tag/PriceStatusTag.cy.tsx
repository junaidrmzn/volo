import { PriceStatusTag } from "./PriceStatusTag";

describe("PriceStatusTag", () => {
    it("render draft status tag", () => {
        cy.mount(<PriceStatusTag status="DRAFT" />);
        cy.findByText(/draft/i).should("be.visible");
    });
    it("render awaiting approval status tag", () => {
        cy.mount(<PriceStatusTag status="AWAITING_APPROVAL" />);
        cy.findByText(/awaiting approval/i).should("be.visible");
    });
    it("render approved status tag", () => {
        cy.mount(<PriceStatusTag status="APPROVED" />);
        cy.findByText(/approved/i).should("be.visible");
    });
});
