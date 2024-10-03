import { PlanStatusTag } from "./PlanStatusTag";

describe("PlanStatusTag", () => {
    it("render draft status tag", () => {
        cy.mount(<PlanStatusTag status="DRAFT" />);
        cy.findByText(/draft/i).should("be.visible");
    });
    it("render awaiting approval ready status tag", () => {
        cy.mount(<PlanStatusTag status="AWAITING_APPROVAL" />);
        cy.findByText(/awaiting approval/i).should("be.visible");
    });
    it("render approved ready status tag", () => {
        cy.mount(<PlanStatusTag status="APPROVED" />);
        cy.findByText(/approved/i).should("be.visible");
    });
    it("render published status tag", () => {
        cy.mount(<PlanStatusTag status="PUBLISHED" />);
        cy.findByText(/published/i).should("be.visible");
    });
});
