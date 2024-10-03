describe("Battery management: esu overview", () => {
    before(() => {
        cy.resetBatteryManagementDatabase();
        cy.addVtolTypes();
        cy.addEsuTypes();
        cy.addLocations();
        cy.addBatteries();
    });
    it("can visit the esu overview page. Successful load yields response status 200", () => {
        cy.intercept({
            method: "GET",
            url: "/battery-management/esu",
        }).as("esuOverview");
        cy.visit("/battery-management/esu");
        cy.wait("@esuOverview").its("response.statusCode").should("equal", 200);
    });
    it("clicks the add button and navigates to the esu creation page", () => {
        cy.contains("Add").click();
        cy.url().should("include", "esu/create");
    });
    it("fills out the form and submits the esu create request", () => {
        const currentTimeSeed = Date.now().toString();
        cy.findByRole("textbox", { name: "Name:*" }).click({ force: true });
        cy.findByRole("textbox", { name: "Name:*" }).type(`11111-ESU-${currentTimeSeed}`, { force: true });
        cy.findByRole("combobox", { name: "Esu Type:*" }).type("003", { force: true });
        cy.findByRole("combobox", { name: "Esu Type:*" }).type("{enter}", { force: true });
        cy.findByRole("textbox", { name: "Batch:*" }).type("BATCH-00001111222", { force: true });
        cy.findByRole("textbox", { name: "Manufacturer:*" }).type("Stark Industries", { force: true });
        cy.findByRole("textbox", { name: "Serial Number:*" }).type("SE-12345678987654321", { force: true });
        cy.findByRole("combobox", { name: "Status:*" }).type("READY", { force: true });
        cy.findByRole("combobox", { name: "Status:*" }).type("{enter}", { force: true });
        cy.findByRole("combobox", { name: "Technical Status:*" }).type("SERV", { force: true });
        cy.findByRole("combobox", { name: "Technical Status:*" }).type("{enter}", { force: true });
        cy.findByRole("combobox", { name: "Battery:*" }).type("01", { force: true });
        cy.findByRole("combobox", { name: "Battery:*" }).type("{enter}", { force: true });
        cy.findByRole("spinbutton", { name: "Charging Cycles:*" }).type("5250");
        cy.findByRole("combobox", { name: "Charging Profile:*" }).type("11", { force: true });
        cy.findByRole("combobox", { name: "Charging Profile:*" }).type("{enter}", { force: true });
        cy.findByRole("combobox", { name: "Flight Permit:*" }).type("MA", { force: true });
        cy.findByRole("combobox", { name: "Flight Permit:*" }).type("{enter}", { force: true });
        cy.findByRole("combobox", { name: "Location:*" }).type("somew", { force: true });
        cy.findByRole("combobox", { name: "Location:*" }).type("{enter}", { force: true });
        cy.findByRole("textbox", { name: "Position:*" }).type("BERLIN AIRPORT", { force: true });
        cy.findByRole("spinbutton", { name: "Usage Cycles:*" }).type("773");
        cy.findByRole("spinbutton", { name: "Weight:*" }).type("125.5");
        cy.findByRole("button", { name: "Add" }).click();
        cy.url().should("not.contain", "esu/create");
        cy.findAllByRole("alert").should("be.visible");
    });
    it("navigates to esu preview after clicking an entry", () => {
        cy.contains("11111-").click();
    });
    it("ensures esu preview contains esu relevant data", () => {
        cy.contains("Valid from:").should("be.visible");
        cy.contains("Valid to:").should("be.visible");
        cy.contains("Status:").should("be.visible");
        cy.contains("Technical Status:").should("be.visible");
        cy.contains("Manufacturer:").should("be.visible");
        cy.contains("Batch:").should("be.visible");
        cy.contains("Serial Number:").should("be.visible");
        cy.contains("Weight:").should("be.visible");
        cy.contains("Charging Cycles:").should("be.visible");
        cy.contains("Usage Cycles:").should("be.visible");
        cy.contains("Position:").should("be.visible");
        cy.contains("Flight Permit:").should("be.visible");
        cy.contains("Battery:").should("be.visible");
        cy.contains("Esu Type:").should("be.visible");
        cy.contains("Location:").should("be.visible");
        cy.contains("Charging Profile:").should("be.visible");
        cy.findAllByText("SE-12345678987654321").should("be.visible");
    });
    it("ensures esu edit on entries is working. Successful edit yields response status 200", () => {
        cy.findAllByRole("button", { name: "Edit" }).click();
        cy.findByRole("combobox", { name: "Esu Type:*" }).type("008", { force: true });
        cy.findByRole("combobox", { name: "Esu Type:*" }).type("{enter}", { force: true });
        cy.findByRole("combobox", { name: "Status:*" }).type("DEA", { force: true });
        cy.findByRole("combobox", { name: "Status:*" }).type("{enter}", { force: true });
        cy.findByRole("spinbutton", { name: "Weight:*" }).type("999");
        cy.intercept({
            method: "PUT",
            url: "/battery-management/*/esus/*",
        }).as("esuUpdate");
        cy.findAllByRole("button", { name: "Update" }).click();
        cy.wait("@esuUpdate").its("response.statusCode").should("equal", 200);
        cy.url().should("not.contain", "esu/edit/*");
        cy.findAllByRole("alert").should("be.visible");
    });
    it("ensures esu entry deletion is possible. Successful delete yields response status 204 ", () => {
        cy.contains("11111-").click();
        cy.findAllByRole("button", { name: "Delete" }).click();
        cy.intercept({
            method: "DELETE",
            url: "/battery-management/*/esus/*",
        }).as("esuDelete");
        cy.findByTestId("popupModalDeleteButton").click();
        cy.wait("@esuDelete").its("response.statusCode").should("equal", 204);
    });
});
