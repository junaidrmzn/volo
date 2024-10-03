import { LoadingPage } from "./LoadingPage";

describe("LoadingPage", () => {
    it("render", () => {
        cy.mount(<LoadingPage />);
        cy.findByText("Loading...").should("be.visible");
    });
});
