import { BookingStatusTag } from "./BookingStatusTag";

describe("BookingStatusTag", () => {
    it("render with valid status", () => {
        cy.mount(<BookingStatusTag status="VALID" />);
        cy.findByText("Valid").should("be.visible");
    });
    it("render with reserved status", () => {
        cy.mount(<BookingStatusTag status="RESERVED" />);
        cy.findByText("Reserved").should("be.visible");
    });
    it("render with cancelled status", () => {
        cy.mount(<BookingStatusTag status="CANCELLED" />);
        cy.findByText("Cancelled").should("be.visible");
    });
});
