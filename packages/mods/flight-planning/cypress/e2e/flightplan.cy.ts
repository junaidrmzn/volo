describe("File Flight Plan tests", () => {
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
    it("VFP-133 File Flight Plan", () => {
        cy.intercept("/v1/aircraft-management/aircraft", { fixture: "aircraft.json" }).as("matchedUrl");
        cy.visit("/flight-planning/route-options/1/plan");
        // Aircraft Parameters
        cy.findByText("Select AIRCRAFT...");
        cy.findByText("Next").click();
        cy.findByText("Please fill out this field").should("be.visible");
        cy.findByRole("combobox", { name: "Select AIRCRAFT:*" }).type("D", { force: true });
        cy.findByRole("combobox", { name: "Select AIRCRAFT:*" })
            .type("{enter}", { force: true })
            .then(() => {
                cy.findByText("Next").click();
            });
        cy.findByText("Please fill out this field").should("not.exist");
        // Flight Information
        cy.findByText("Next").click();
        // Flight Parameters
        cy.findByRole("textbox", { name: "Scheduled Departure Time (UTC):*" }).click();
        cy.get(
            ".open > .flatpickr-innerContainer > .flatpickr-rContainer > .flatpickr-days > .dayContainer > .today"
        ).click();
        cy.findByRole("textbox", { name: "Scheduled Arrival Time (UTC):*" }).click();
        cy.get(".open > .flatpickr-months > .flatpickr-next-month > svg").click();
        cy.get(".open > .flatpickr-innerContainer > .flatpickr-rContainer > .flatpickr-days > .dayContainer")
            .first()
            .click();
        cy.findByRole("combobox", { name: "Type:*" }).type("S", { force: true });
        cy.findByRole("combobox", { name: "Type:*" }).type("{enter}", { force: true });
        cy.findByRole("combobox", { name: "Flight Rules:*" }).type("I", { force: true });
        cy.findByRole("combobox", { name: "Flight Rules:*" }).type("{enter}", { force: true });
        cy.findByRole("spinbutton", { name: "Number of PAX:*" }).type("2");
        cy.findByText("Next").click();
        // Select Routes
        cy.findByRole("combobox", { name: "Select Routes:*" }).type("P", { force: true });
        cy.findByRole("combobox", { name: "Select Routes:*" })
            .type("{enter}", { force: true })
            .then(() => {
                cy.findByText("Submit Flight Plan").click();
            });
        cy.findByText("Submit Flight Plan").click();
    });
});
