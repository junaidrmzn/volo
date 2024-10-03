import { ScheduleItemStatusTag } from "./ScheduleItemStatusTag";

describe("ScheduleItemStatusTag", () => {
    it("render draft status tag", () => {
        cy.mount(<ScheduleItemStatusTag status="DRAFT" />);
        cy.findByText(/draft/i).should("be.visible");
    });
    it("render ordered status tag", () => {
        cy.mount(<ScheduleItemStatusTag status="ORDERED" />);
        cy.findByText(/ordered/i).should("be.visible");
    });
    it("render planned status tag", () => {
        cy.mount(<ScheduleItemStatusTag status="PLANNED" />);
        cy.findByText(/planned/i).should("be.visible");
    });
    it("render offered status tag", () => {
        cy.mount(<ScheduleItemStatusTag status="OFFERED" />);
        cy.findByText(/offered/i).should("be.visible");
    });
    it("render booked status tag", () => {
        cy.mount(<ScheduleItemStatusTag status="BOOKED" />);
        cy.findByText(/booked/i).should("be.visible");
    });
    it("render cancelled status tag", () => {
        cy.mount(<ScheduleItemStatusTag status="CANCELLED" />);
        cy.findByText(/cancelled/i).should("be.visible");
    });
    it("render closed status tag", () => {
        cy.mount(<ScheduleItemStatusTag status="CLOSED" />);
        cy.findByText(/closed/i).should("be.visible");
    });
});
