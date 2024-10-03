// type definitions for custom commands like "createDefaultTodos"
// will resolve to "cypress/support/index.d.ts"
// <reference types="../support" />

describe("Flight Planning tests", () => {
    // before(() => {
    //     cy.exec("docker exec api_container python manage.py flush --no-input");
    //     cy.exec("docker exec api_container python manage.py loaddata testdata");
    // });
    beforeEach(() => {
        cy.visit("/flight-planning/route-options");
    });
    // afterEach(() => {
    //     cy.exec("docker exec api_container python manage.py flush --no-input");
    //     cy.exec("docker exec api_container python manage.py loaddata testdata");
    // });
    it("VFP-2", () => {
        cy.visit("/flight-planning/route-options/1/map");
        cy.get("canvas").should("exist");
    });
    it("VFP-3", () => {
        cy.visit("/flight-planning/route-options/1/map");
        cy.get("#map-control-btn-grp").should("exist").click();
    });
    it("VFP-336", () => {
        cy.visit("/flight-planning/route-options/1/map");
        cy.get("[data-testid=toggle-map-layer-panel]").should("exist").click();
        cy.get("[data-testid=radio-roadmap]").should("exist").click();
    });
    it("VFP-14", () => {
        cy.visit("/flight-planning/route-options/1/map?displayedRoutes=1&selectedRoute=1")
            .isInViewport("[data-testid=waypoint-marker-5]")
            .get("[data-testid=waypoint-marker-5]")
            .trigger("mousedown")
            .trigger("mousemove", 0, 20, { force: true })
            .trigger("mouseup", { force: true })
            .get("[data-testid=waypoint-marker-6]")
            .click()
            .get("[data-testid=waypoint-details-heading]")
            .contains("WP6")
            .get("[data-testid=waypoint-details-back-button]")
            // .get("[data-testid=waypoint-list-close-btn]")
            .click()
            .get("[data-testid=toggle-edit-mode-button]")
            .click()
            .trigger("mousemove", -50, -50, { force: true })
            .click()
            .get("[data-testid=waypoints-list-show-detail-5-btn]")
            .click()
            .get("[data-testid=waypoint-details-menu-button]")
            .click()
            .get("[data-testid=waypoint-details-menu-delete]")
            .click();
    });
    it("VFP-130 - Map FitBounds Zoom on Route Select", () => {
        cy.visit("/flight-planning/route-options/1/map?displayedRoutes=1&selectedRoute=1");
        cy.get('[data-testid^="waypoint-marker-"]', { timeout: 20_000 }).should("have.length.above", 1);
        cy.isInViewport('[data-testid^="waypoint-marker-"]');
    });
    it("VFP-130 - Select and Add RouteTemplate as Route to Flight", () => {
        // Select Flight and Route from FlightList and display on the map
        cy.visit("/flight-planning/route-options/1/map?displayedRoutes=1&selectedRoute=1");
        // Open the sidebar to show RouteTemplates
        cy.get('[aria-label="Toggle Route Template List"]').click();
        // Select and show RouteTemplate (make sure non draggable waypoint markers are displayed)
        cy.get('[data-testid="route-template-list-item-11"]').click();
        cy.get("[data-testid^=non-draggable-waypoint-marker-]", { timeout: 20_000 }).should("have.length.at.least", 2);
        // Add RouteTemplate as Casino Royale to flight
        cy.intercept("/v1/flight-planning/route-options/1/routes").as("fetchFlights");
        cy.get('[data-testid="add-route-template-to-flight-11"]').click();
        cy.wait("@fetchFlights");
        // Open the newly created Route
        cy.get('[data-testid="route-list-item-12"]').first().click();
        cy.get("[data-testid^=waypoint-marker-]").should("have.length.at.least", 2);
        cy.isInViewport("[data-testid^=waypoint-marker-1]");
        cy.visit("/flight-planning/route-options/1/map?displayedRoutes=12&selectedRoute=12");
        cy.get("[data-testid^=waypoint-marker-]").as("waypointCount");
        // Reselect the same RouteTemplate
        cy.get('[aria-label="Toggle Route Template List"]').click();
        cy.get('[data-testid="route-template-list-item-11"]').click();
        // Make sure the newly created Route has the same amount of waypoints like its Template
        cy.get("[data-testid^=non-draggable-waypoint-marker-]").then((waypointTemplateCount) => {
            waypointTemplateCount.first().position();
            cy.get("@waypointCount").then((waypointCount) => {
                assert.equal(waypointTemplateCount.length, waypointCount.length);
            });
        });
    });
    it("VFP-220 - Switch displayed route", () => {
        // Select Flight and Route from FlightList and display on the map
        cy.visit("/flight-planning/route-options/1/map?displayedRoutes=1&selectedRoute=1");
        // Assert that there are 8 waypoint markers displayed on the map
        cy.get("[data-testid^=waypoint-marker-]", { timeout: 20_000 }).should("have.length", 8);
        cy.isInViewport('[data-testid^="waypoint-marker-"]');
        // Select another route from the right panel to also be displayed on the map
        cy.get('[data-testid="route-details-back-button"]').click();
        cy.get('[data-testid="route-list-item-4"]').click();
        // Assert that there are now 2 waypoint markers displayed on the map
        cy.get("[data-testid^=waypoint-marker-]").should("have.length", 3);
        cy.isInViewport('[data-testid^="waypoint-marker-"]');
    });

    it("VFP-275 - Allow dragging of waypoints between vertiports", () => {
        // Select Flight and Route from FlightList and display on the map
        cy.visit("/flight-planning/route-options/1/map?displayedRoutes=1&selectedRoute=1");
        // Select Waypoint with rsi 1, check for heading value and then drag it around
        cy.get("[data-testid=waypoints-list-show-detail-1-btn]").click();
        cy.get('[name="heading"]').should("have.value", 142);

        // Activate Edit mode
        cy.get('[data-testid="toggle-edit-mode-button"]').click();

        cy.get("[data-testid=waypoint-marker-1]")
            .trigger("mousedown")
            .trigger("mousemove", -20, -20, { force: true })
            .trigger("mouseup", -20, -20, { force: true });

        // Assert that heading value has changed
        cy.get('[name="heading"]').should("not.have.value", 142);

        // Reopen WaypointOnRouteList
        cy.get("[data-testid=waypoint-details-back-button]").click();

        // Select first waypoint, check for heading value and then try to drag it around
        cy.get("[data-testid=waypoints-list-show-detail-0-btn]").click();
        cy.get('[name="heading"]').should("have.value", 68);

        cy.get("[data-testid=waypoint-marker-0]")
            .trigger("mousedown")
            .trigger("mousemove", -20, -20, { force: true })
            .trigger("mouseup", -20, -20, { force: true });

        // Make sure heading value did not change and thus dragging was not executed
        cy.get('[name="heading"]').should("have.value", 68);

        // Reopen Waypoint List
        cy.get("[data-testid=waypoint-details-back-button]").click();

        // Select last waypoint, check for heading value and then try to drag it around
        cy.get("[data-testid=waypoints-list-show-detail-6-btn]").click();
        cy.get('[name="heading"]').should("have.value", 264);

        cy.get("[data-testid=waypoint-marker-7]")
            .trigger("mousedown")
            .trigger("mousemove", -20, -20, { force: true })
            .trigger("mouseup", -20, -20, { force: true });

        // Make sure heading value did not change and thus dragging was not executed
        cy.get('[name="heading"]').should("have.value", 264);
    });
    it("VFP-273 - Unselect template when the template section is left/template is added to flight", () => {
        // Select Flight and Route from FlightList and display on the map
        cy.visit("/flight-planning/route-options/1/map?displayedRoutes=1&selectedRoute=1");
        // Assert that no waypoints of any template are visible
        cy.get("[data-testid^=non-draggable-waypoint-marker-]").should("have.length", 0);
        // Open template panel and select a route template
        cy.get('[data-testid="toggle-route-template-list-button"]').click();
        cy.get('[data-testid="route-template-list-item-11"]').click();
        // Assert that waypoints of the template are visible
        cy.get("[data-testid^=non-draggable-waypoint-marker-]").should("have.length.greaterThan", 0);
        // Add new route from route template
        cy.get('[data-testid="add-route-template-to-flight-11"]')
            .click()
            // Select another template
            .get('[data-testid="route-template-list-item-6"]')
            .click()
            // Assert that waypoints of the template are visible
            .get("[data-testid^=non-draggable-waypoint-marker-]")
            .should("have.length.greaterThan", 0)
            // Close the right panel
            .get("[data-testid=toggle-route-template-list-button]")
            .click();
    });
    it("VFP-274 - Lock Route Editing Mode", () => {
        cy.visit("/flight-planning/route-options/1/map?displayedRoutes=1&selectedRoute=1");
        cy.intercept("/v1/flight-planning/routes/1/waypoints/*", cy.spy().as("waypointRequest"));
        cy.get("[data-testid=waypoint-marker-5]")
            .trigger("mousedown")
            .trigger("mousemove", -50, -50, { force: true })
            .trigger("mouseup", { force: true });
        cy.get("@waypointRequest").should("not.have.been.called");
        cy.get("[data-testid=toggle-edit-mode-button]").click();
        cy.get("[data-testid=waypoint-marker-5]")
            .trigger("mousedown")
            .trigger("mousemove", -50, -50, { force: true })
            .trigger("mouseup", { force: true });
        cy.get("@waypointRequest").should("have.been.calledOnce");
    });
    it("VFP-277 Delete route templates", () => {
        // Select Flight and Route from FlightList and display on the map
        cy.visit("/flight-planning/route-options/1/map?displayedRoutes=1&selectedRoute=1");
        // Open the sidebar to show RouteTemplates
        cy.get('[data-testid="toggle-route-template-list-button"]').click();
        // Check and confirm that the waypoints of the selected template are displayed
        cy.get('[data-testid="route-template-list-item-5"]').click();
        cy.get('[data-testid="non-draggable-waypoint-marker-1"]').should("be.visible");

        // Count number of items, delete one and check that count is decreased by one
        cy.get('[data-testid^="route-template-list-item-"]').then((routeTemplates) => {
            const nRouteTemplates = routeTemplates.length;
            cy.get("[data-testid=toggle-route-template-item-menu5]").click();
            cy.get('[data-testid="route-template-item-menu-delete"]').first().click();
            cy.get('[data-testid^="route-template-list-item-"]').should("have.length", nRouteTemplates - 1);
        });
        // Check and confirm that the previewed template has disappeared
        cy.get('[data-testid="non-draggable-waypoint-marker-1"]').should("not.exist");
    });
    it("VFP-278 Delete routes", () => {
        // Select Flight and Route from FlightList and display on the map
        cy.visit("/flight-planning/route-options/1/map");
        // Count number of items, delete one and check that count is decreased by one
        cy.get('[data-testid^="route-list-item-"]').then((routes) => {
            const nRoutes = routes.length;
            cy.get("[data-testid=route-list-item-1]").click();
            cy.get("[data-testid=route-details-menu-button]").click();
            cy.get("[data-testid=menu-delete-route-button]").click();
            cy.get('[data-testid^="route-list-item-"]').should("have.length", nRoutes - 1);
            cy.get('[data-testid="route-list-item-1"]').should("not.exist");
        });
    });
    it("VFP-307 Disable Edit mode when previewing a template", () => {
        // Select Flight and Route from FlightList and display on the map
        cy.visit("/flight-planning/route-options/1/map?displayedRoutes=1&selectedRoute=1");
        // Open the sidebar to show RouteTemplates
        cy.get('[aria-label="Toggle Route Template List"]').click();
        cy.get('[data-testid="route-template-list-item-5"]').click();
        cy.get('[data-testid="toggle-edit-mode-button"]').should("be.disabled");
        cy.get('[data-testid="route-template-list-item-5"]').click();
        cy.get('[data-testid="toggle-edit-mode-button"]').should("be.enabled");
    });
    it("Create new Route", () => {
        cy.visit("/flight-planning/route-options/1/map");
        cy.get('[data-testid="route-list-add"]').click();
        cy.get('[data-testid="route-create-button"]').click();
        cy.findByText("New Route 3").should("be.visible").get("[data-testid=route-details-back-button]").click();
        cy.get('[data-testid^="route-list-item-"]').should("have.length", 3);
    });
    it("Edit Waypoint via Dialog", () => {
        cy.visit("/flight-planning/route-options/1/map?selectedRoute=1");
        cy.get("[data-testid=waypoints-list-show-detail-1-btn]").click();
        cy.findByText("Save").should("not.be.visible");
        cy.findByRole("spinbutton", { name: "Altitude:*" }).type("1", { force: true });
        cy.findByText("Save").should("be.visible").click();
        cy.get("[data-testid=waypoints-list-show-detail-1-btn]").click();
        cy.findByRole("spinbutton", { name: "Altitude:*" }).should("have.value", 3001);
    });

    it("Fix: Make sure WaypointMarker RSI Changes after switch in left sidebar", () => {
        cy.visit("/flight-planning/route-options/1/map?displayedRoutes=1&selectedRoute=1");
        cy.get("[data-testid^=waypoint-list-item-wp_]").then((waypointListItems) => {
            cy.wrap(waypointListItems[4]).contains("WP4").should("be.visible");
        });
        cy.intercept("PUT", "/v1/flight-planning/routes/1/waypoints/*").as("waypointPut");
        cy.get("[data-testid=waypoint-list-item-wp_4]").drag("[data-testid=waypoint-list-item-wp_3]");
        cy.wait("@waypointPut");
        cy.get("[data-testid=waypoint-marker-4]").move({ deltaX: 10, deltaY: 10 });
        cy.get("[data-testid^=waypoint-list-item-wp_]").then((waypointListItems) => {
            cy.wrap(waypointListItems[3]).contains("WP4").should("be.visible");
        });
    });

    it("VFP-429-multiple-routes branch off", () => {
        cy.visit("/flight-planning/route-options/1/map?displayedRoutes=1&displayedRoutes=4&selectedRoute=4");

        // drag waypoint to snap target
        cy.get('[data-testid="toggle-edit-mode-button"]').click();
        cy.get('[data-testid="waypoint-marker-1"]', { timeout: 10_000 }).click();
        cy.get('[data-testid="waypoint-marker-1"]', { timeout: 10_000 })
            .first()
            .should("be.visible")
            .trigger("mousedown")
            .trigger("mousemove", { clientX: 826, clientY: 582, force: true })
            .trigger("mouseup", { force: true });
        cy.get('[data-testid="snap-dialog-branchOff"]').click();

        // test result
        cy.get('[name="lat"]', { timeout: 5000 }).should("have.value", 48.974);
    });

    it("VFP-429-multiple-routes follow onwards", () => {
        cy.visit("/flight-planning/route-options/1/map?displayedRoutes=1&displayedRoutes=4&selectedRoute=4");

        // drag waypoint to snap target
        cy.get('[data-testid="toggle-edit-mode-button"]').click();
        cy.get('[data-testid="waypoint-marker-1"]', { timeout: 10_000 }).click();
        cy.get('[data-testid="waypoint-marker-1"]', { timeout: 10_000 })
            .first()
            .should("be.visible")
            .trigger("mousedown")
            .trigger("mousemove", { clientX: 826, clientY: 582, force: true })
            .trigger("mouseup", { force: true });
        cy.get('[data-testid="snap-dialog-branchOff"]').click();

        // test result
        cy.get('[name="lat"]', { timeout: 5000 }).should("have.value", 48.974);
    });
});
