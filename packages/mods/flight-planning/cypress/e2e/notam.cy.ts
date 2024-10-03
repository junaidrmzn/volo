describe("Flight Planning - NOTAM tests", () => {
    // before(() => {
    //     cy.exec("docker exec api_container python manage.py flush --no-input");
    //     cy.exec("docker exec api_container python manage.py loaddata testdata");
    // });
    beforeEach(() => {
        cy.visit("/flight-planning");
    });
    // afterEach(() => {
    //     cy.exec("docker exec api_container python manage.py flush --no-input");
    //     cy.exec("docker exec api_container python manage.py loaddata testdata");
    // });

    it("Show NOTAMs on the map", () => {
        cy.intercept("/v1/flight-planning/route-options/1/notams*", { fixture: "notams.json" }).as("matchedUrl");
        cy.visit("/flight-planning/route-options/1/map?selectedRoute=1");
        // open layer selection modal
        cy.get("[data-testid=toggle-map-layer-panel]").click();
        // activate notam layer
        cy.get("[data-testid=switch-show-notam]").click();
        // click on one notam marker to open up popup
        cy.get("[data-testid=notam-marker-40965c2d-22a5-4ab3-905c-5453703dd254]").click();

        cy.get(".maplibregl-popup").should("exist");
    });

    it("Show NOTAMs as List in Sidebar and focus them", () => {
        cy.intercept("/v1/flight-planning/route-options/1/notams*", { fixture: "notams.json" }).as("matchedUrl");
        cy.visit("/flight-planning/route-options/1/map/notams?selectedRoute=1");
        // right sidebar should be open
        cy.findByTestId("notam-sidebar-header").should("be.visible");
        cy.findByTestId("notam-list-item-00e2f8f9-7bc8-4aaf-add2-705f4f76099e").should("be.visible");
        // Assert that markers are rendered
        cy.get("[data-testid=notam-marker-40965c2d-22a5-4ab3-905c-5453703dd254]").should("be.visible");
        // Assert that notam marker is not visible
        cy.findByTestId("notam-marker-00e2f8f9-7bc8-4aaf-add2-705f4f76099e").should("not.be.visible");
        // click button to focus notam
        cy.get('[data-testid="notam-list-item-00e2f8f9-7bc8-4aaf-add2-705f4f76099e-focus-button"]').click();
        // Assert that notam marker is visible
        cy.findByTestId("notam-marker-00e2f8f9-7bc8-4aaf-add2-705f4f76099e").should("be.visible");
    });
});
