describe("Flight Planning - CSFL tests", () => {
    before(() => {
        cy.exec("docker exec api_container python manage.py flush --no-input");
        cy.exec("docker exec api_container python manage.py loaddata testdata");
    });
    beforeEach(() => {
        cy.visit("/flight-planning");
    });
    afterEach(() => {
        cy.exec("docker exec api_container python manage.py flush --no-input");
        cy.exec("docker exec api_container python manage.py loaddata testdata");
    });

    it("Show alternative landing sites on the map", () => {
        cy.intercept("/v1/flight-planning/routes/*/csfl-sites", { fixture: "csflSites.json" }).as("matchedUrl");
        cy.visit("/flight-planning/route-options/2/map?displayedRoutes=2&selectedRoute=2");
        // open layer selection modal
        cy.get("[data-testid=toggle-map-layer-panel]").click();
        // activate csfl layer
        cy.get("[data-testid=switch-show-csfl-sites]").click();
        // click on one csfl site marker to open up sidebar
        cy.get("[data-testid='csfl-marker-AL S01 Field']").click();

        cy.findByText("AL S01 Field").should("exist");
    });
});
