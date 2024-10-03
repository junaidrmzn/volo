describe("Battery management: esu-type overview", () => {
    before(() => {
        cy.resetBatteryManagementDatabase();
        cy.addVtolTypes();
    });
    it("can visit the esu-type overview page. Successful load yields response status 200", () => {
        cy.intercept({
            method: "GET",
            url: "/battery-management/esu-type",
        }).as("esuTypeOverview");
        cy.visit("/battery-management/esu-type");
        cy.wait("@esuTypeOverview").its("response.statusCode").should("equal", 200);
    });
    it("clicks the add button and navigates to the esu-type creation page", () => {
        cy.contains("Add").click();
        cy.url().should("include", "esu-type/create");
    });
    it("fills out the form and submits the esu-type create request", () => {
        const currentTimeSeed = Date.now().toString();
        cy.findByRole("textbox", { name: "Name:*" }).click({ force: true });
        cy.findByRole("textbox", { name: "Name:*" }).type(`11111-ESU-TYPE-${currentTimeSeed}`, { force: true });
        cy.findByRole("combobox", { name: "Charging mode:*" }).type("M", { force: true });
        cy.findByRole("combobox", { name: "Charging mode:*" }).type("{enter}", { force: true });
        cy.findByRole("combobox", { name: "VTOL Types:*" }).type("VC", { force: true });
        cy.findByRole("combobox", { name: "VTOL Types:*" }).type("{enter}", { force: true });
        cy.findByRole("combobox", { name: "VTOL Types:*" }).type("VD", { force: true });
        cy.findByRole("combobox", { name: "VTOL Types:*" }).type("{enter}", { force: true });
        cy.findByRole("button", { name: "Add" }).click();
        cy.url().should("not.contain", "esu-type/create");
        cy.findAllByRole("alert").should("be.visible");
    });
    it("navigates to esu-type preview after clicking an entry", () => {
        cy.contains("11111-").click();
    });
    it("ensures esu-type preview contains esu-type relevant data", () => {
        cy.contains("Charging mode:").should("be.visible");
        cy.contains("VTOL Types:").should("be.visible");
        cy.contains("Valid from:").should("be.visible");
        cy.contains("Valid to:").should("be.visible");
    });
    it("ensures language switch is possible ", () => {
        cy.get('[aria-label="Language"]').click();
        cy.contains("Lade-Modus:").should("be.visible");
        cy.contains("VTOL Typen:").should("be.visible");
        cy.contains("Gültig von:").should("be.visible");
        cy.contains("Gültig bis:").should("be.visible");
        cy.get('[aria-label="Sprache"]').click();
    });
    it("ensures esu-type edit on entries is working. Successful edit yields response status 200", () => {
        cy.findAllByRole("button", { name: "Edit" }).click();
        cy.findByRole("combobox", { name: "Charging mode:*" }).type("Aut", { force: true });
        cy.findByRole("combobox", { name: "Charging mode:*" }).type("{enter}", { force: true });
        cy.findByRole("combobox", { name: "VTOL Types:*" })
            .type("{backspace}", { force: true })
            .type("{backspace}", { force: true });
        cy.findByRole("combobox", { name: "VTOL Types:*" }).type("VC", { force: true });
        cy.findByRole("combobox", { name: "VTOL Types:*" }).type("{enter}", { force: true });
        cy.intercept({
            method: "PUT",
            url: "/battery-management/*/esu-types/*",
        }).as("esuTypeUpdate");
        cy.findAllByRole("button", { name: "Update" }).click();
        cy.wait("@esuTypeUpdate").its("response.statusCode").should("equal", 200);
        cy.url().should("not.contain", "esu-type/edit/*");
        cy.findAllByRole("alert").should("be.visible");
    });
    it("ensures esu-type entry deletion is possible. Successful delete yields response status 204 ", () => {
        cy.contains("11111-").click();
        cy.findAllByRole("button", { name: "Delete" }).click();
        cy.intercept({
            method: "DELETE",
            url: "/battery-management/*/esu-types/*",
        }).as("esuTypeDelete");
        cy.findByTestId("popupModalDeleteButton").click();
        cy.wait("@esuTypeDelete").its("response.statusCode").should("equal", 204);
    });
});
