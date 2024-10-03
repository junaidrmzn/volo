import { AlertSnackBar } from "./AlertSnackBar";

describe("AlertSnackBar", () => {
    it("render error status ", () => {
        cy.mount(<AlertSnackBar status="ALL_INCONSISTENT" />);
        cy.findByTitle(/alert-banner/i).should("be.visible");
        cy.findByText(/not ready/i).should("be.visible");
    });
    it("render some warning status", () => {
        cy.mount(<AlertSnackBar status="SOME_INCONSISTENT" />);
        cy.findByTitle(/alert-banner/i).should("be.visible");
        cy.findByText(/some schedule item/i).should("be.visible");
    });
    it("render one warning status", () => {
        cy.mount(<AlertSnackBar status="ONE_INCONSISTENT" />);
        cy.findByTitle(/alert-banner/i).should("be.visible");
        cy.findByText(/one schedule item/i).should("be.visible");
    });
});
