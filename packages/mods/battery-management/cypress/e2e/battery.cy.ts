describe("Battery management: battery overview", () => {
    before(() => {
        cy.resetBatteryManagementDatabase();
        cy.addVtolTypes();
        cy.addEsuTypes();
        cy.addLocations();
        cy.addBatteries();
    });
    it("can visit the battery overview page. Successful load yields response status 200", () => {
        cy.intercept({
            method: "GET",
            url: "/battery-management/batteries",
        }).as("batteryOverview");
        cy.visit("/battery-management/batteries");
        cy.wait("@batteryOverview").its("response.statusCode").should("equal", 200);
    });
    it("clicks the add button and navigates to the battery creation page", () => {
        cy.contains("Add").click();
        cy.url().should("include", "batteries/create");
    });
    it("fills out the form and submits the battery create request", () => {
        const currentTimeSeed = Date.now().toString();
        cy.findByRole("textbox", { name: "Name:*" }).click({ force: true });
        cy.findByRole("textbox", { name: "Name:*" }).type(`11111-BATTERY-${currentTimeSeed}`, { force: true });
        cy.findByRole("combobox", { name: "Status:*" }).type("IN V", { force: true });
        cy.findByRole("combobox", { name: "Status:*" }).type("{enter}", { force: true });
        cy.findByRole("combobox", { name: "Flight permit:*" }).type("MA", { force: true });
        cy.findByRole("combobox", { name: "Flight permit:*" }).type("{enter}", { force: true });
        cy.findByRole("combobox", { name: "Location:*" }).type("some", { force: true });
        cy.findByRole("combobox", { name: "Location:*" }).type("{enter}", { force: true });
        cy.findByRole("combobox", { name: "Technical Status:*" }).type("Ser", { force: true });
        cy.findByRole("combobox", { name: "Technical Status:*" }).type("{enter}", { force: true });
        cy.findByRole("combobox", { name: "ID of the associated EsuType:*" }).type("001", { force: true });
        cy.findByRole("combobox", { name: "ID of the associated EsuType:*" }).type("{enter}", { force: true });
        cy.findByRole("spinbutton", { name: "Maximum voltage:*" }).type("250", { force: true });
        cy.findByRole("spinbutton", { name: "Minimum voltage:*" }).type("225", { force: true });
        cy.findByRole("spinbutton", { name: "ESU count:*" }).type("9", { force: true });
        cy.findByRole("spinbutton", { name: "Charging cycles:*" }).type("5250", { force: true });
        cy.findByRole("spinbutton", { name: "Usage Cycles:*" }).type("745", { force: true });
        cy.findByRole("spinbutton", { name: "Weight:*" }).type("188.5", { force: true });
        cy.findByRole("textbox", { name: "First used:*" }).click({ force: true });
        cy.get(
            ".open > .flatpickr-innerContainer > .flatpickr-rContainer > .flatpickr-days > .dayContainer > .today"
        ).click({ force: true });
        cy.findByRole("textbox", { name: "Last charged:*" }).click({ force: true });
        cy.get(
            ".open > .flatpickr-innerContainer > .flatpickr-rContainer > .flatpickr-days > .dayContainer > .today"
        ).click({ force: true });
        cy.findByRole("spinbutton", { name: "Maximum charging time:*" }).type("500", { force: true });
        cy.findByRole("button", { name: "Add" }).click({ force: true });
        cy.url().should("not.contain", "ebatteries/create");
        cy.findAllByRole("alert").should("be.visible");
    });
    it("navigates to battery preview after clicking an entry", () => {
        cy.contains("11111-").click();
    });
    it("ensures battery preview contains battery relevant data", () => {
        cy.contains("Valid from:").should("be.visible");
        cy.contains("Valid to:").should("be.visible");
        cy.contains("Status:").should("be.visible");
        cy.contains("Technical Status:").should("be.visible");
        cy.contains("First used:").should("be.visible");
        cy.contains("Flight permit:").should("be.visible");
        cy.contains("Battery ID:").should("be.visible");
        cy.contains("ID of the associated EsuType:").should("be.visible");
        cy.contains("Last charged:").should("be.visible");
        cy.contains("Location:").should("be.visible");
        cy.contains("Maximum charging time:").should("be.visible");
        cy.contains("Maximum voltage:").should("be.visible");
        cy.contains("Minimum voltage:").should("be.visible");
        cy.contains("Charging cycles:").should("be.visible");
        cy.contains("Usage Cycles:").should("be.visible");
        cy.contains("ESU count:").should("be.visible");
        cy.contains("Weight:").should("be.visible");
        cy.findAllByText("MANNED").should("be.visible");
    });
    it("ensures battery edit on entries is working. Successful edit yields response status 200", () => {
        cy.findAllByRole("button", { name: "Edit" }).click();
        cy.findByRole("combobox", { name: "Flight permit:*" }).click({ force: true });
        cy.findByRole("combobox", { name: "Flight permit:*" }).type("UNM", { force: true });
        cy.findByRole("combobox", { name: "Flight permit:*" }).type("{enter}", { force: true });
        cy.intercept({
            method: "PUT",
            url: "/battery-management/*/batteries/*",
        }).as("batteryUpdate");
        cy.findAllByRole("button", { name: "update" }).click();
        cy.wait("@batteryUpdate").its("response.statusCode").should("equal", 200);
        cy.url().should("not.contain", "batteries/edit/*");
        cy.findAllByRole("alert").should("be.visible");
    });
    it("ensures battery entry deletion is possible. Successful delete yields response status 204 ", () => {
        cy.visit("/battery-management/batteries");
        cy.contains("11111-").click();
        cy.findAllByRole("button", { name: "Delete" }).click();
        cy.intercept({
            method: "DELETE",
            url: "/battery-management/*/batteries/*",
        }).as("batteryDelete");
        cy.findByTestId("popupModalDeleteButton").click();
        cy.wait("@batteryDelete").its("response.statusCode").should("equal", 204);
    });
});
