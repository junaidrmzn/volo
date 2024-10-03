import { PlanSummaryCustomItemStatusTag } from "./PlanSummaryCustomItemStatusTag";

describe("PlanSummaryCustomItemStatusTag", () => {
    it("render draft status tag", () => {
        cy.mount(<PlanSummaryCustomItemStatusTag status="DRAFT" />);
        cy.findByText(/draft/i).should("be.visible");
    });
    it("render awaiting approval status tag", () => {
        cy.mount(<PlanSummaryCustomItemStatusTag status="AWAITING_APPROVAL" />);
        cy.findByText(/awaiting approval/i).should("be.visible");
    });
    it("render approved status tag", () => {
        cy.mount(<PlanSummaryCustomItemStatusTag status="APPROVED" />);
        cy.findByText(/approved/i).should("be.visible");
    });
    it("render overwritten status tag", () => {
        cy.mount(<PlanSummaryCustomItemStatusTag status="APPROVED" isCustomOverwritten />);
        cy.findByText(/overwritten/i).should("be.visible");
    });
});
