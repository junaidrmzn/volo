import { OfferStatusTag } from "./OfferStatusTag";

describe("OfferStatusTag", () => {
    it("render draft status tag", () => {
        cy.mount(<OfferStatusTag status="DRAFT" />);
        cy.findByText(/draft/i).should("be.visible");
    });

    it("render awaiting approval status tag", () => {
        cy.mount(<OfferStatusTag status="AWAITING_APPROVAL" />);
        cy.findByText(/awaiting approval/i).should("be.visible");
    });

    it("render approved status tag", () => {
        cy.mount(<OfferStatusTag status="APPROVED" />);
        cy.findByText(/approved/i).should("be.visible");
    });
});
