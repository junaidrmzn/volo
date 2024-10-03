import { add, format, startOfToday } from "date-fns";
import { aircraftAdd } from "../page-objects/aircraftAddPageObject";
import { aircraftEdit } from "../page-objects/aircraftEditPageObject";
import { aircraftOverview } from "../page-objects/aircraftOverviewPageObject";
import { aircraftTypeAdd } from "../page-objects/aircraftTypeAddPageObject";
import { aircraftTypeEdit } from "../page-objects/aircraftTypeEditPageObject";
import { aircraftTypeOverview } from "../page-objects/aircraftTypeOverviewPageObject";

describe("When a user is on the Aircraft Management page", () => {
    before(() => {
        cy.resetAircraftManagementDatabase();
    });

    it("then they can create an aircraft type", () => {
        cy.visit("/aircraft-type");
        aircraftTypeOverview.addButton().click();

        aircraftTypeAdd.add({ type: "VTE2E", productLine: "VOLOCITY" });
        cy.findByText("Operation successful");

        cy.visit("/aircraft-type");

        aircraftTypeOverview.aircraftTypeCard("VTE2E").within(() => {
            aircraftTypeOverview.aircraftType().contains("VTE2E");
            cy.findByTitle("Product line").contains("VOLOCITY");
        });
    });
    it("then they can edit an aircraft type", () => {
        cy.visit("/aircraft-type");
        aircraftTypeOverview.aircraftTypeCard("VTE2E").click();
        aircraftTypeOverview.editButton().click();
        cy.findByRole("textbox", { name: "Type:*" }).should("not.exist");
        aircraftTypeEdit.edit({ validTo: add(startOfToday(), { days: 7 }) });
        cy.findByText("Operation successful");
    });
    it("then they can create two aircrafts for the same aircraft type", () => {
        cy.visit("/aircraft");
        aircraftOverview.addButton().click();
        aircraftAdd.add({
            aircraftRegistration: "E2E_000",
            msn: "000",
            service: "PASSENGER",
            aircraftType: "VTE2E",
            validTo: add(startOfToday(), { days: 6 }),
            homebase: "Hamburg",
            crewConfiguration: "CREWED",
        });
        cy.findByText("Operation successful");

        cy.visit("/aircraft");
        aircraftOverview.addButton().click();
        aircraftAdd.add({
            aircraftRegistration: "E2E_001",
            msn: "001",
            service: "PASSENGER",
            aircraftType: "VTE2E",
            validTo: add(startOfToday(), { days: 6 }),
            homebase: "Hamburg",
            crewConfiguration: "CREWED",
        });
        cy.findByText("Operation successful");

        cy.visit("/aircraft");
        aircraftOverview.aircraftCard("E2E_000").within(() => {
            aircraftOverview.aircraftRegistration().contains("E2E_000");
            aircraftOverview.aircraftType().contains("VTE2E");
            aircraftOverview.msn().contains("000");
            aircraftOverview.technicalStatus().contains("SERVICEABLE");
            aircraftOverview.service().contains("PASSENGER");
            aircraftOverview.crewConfiguration().contains("CREWED");
        });

        aircraftOverview.aircraftCard("E2E_001").within(() => {
            aircraftOverview.aircraftRegistration().contains("E2E_001");
            aircraftOverview.aircraftType().contains("VTE2E");
            aircraftOverview.msn().contains("001");
            aircraftOverview.technicalStatus().contains("SERVICEABLE");
            aircraftOverview.service().contains("PASSENGER");
            aircraftOverview.crewConfiguration().contains("CREWED");
        });
    });
    it("then they can edit an aircraft", () => {
        cy.visit("/aircraft");
        aircraftOverview.aircraftCard("E2E_000").click();
        aircraftOverview.editButton().click();
        cy.findByRole("textbox", { name: "Aircraft type:" }).should("be.disabled");
        aircraftEdit.edit({
            msn: "001",
        });
        cy.findByText("This value is already taken");

        cy.visit("/aircraft");
        aircraftOverview.aircraftCard("E2E_000").click();
        aircraftOverview.editButton().click();
        aircraftEdit.edit({
            service: "TEST",
        });
    });
    it("then they cannot set an aircraft's 'Valid To' date later than its aircraft type's 'Valid To' date", () => {
        cy.visit("/aircraft");
        aircraftOverview.aircraftCard("E2E_000").click();
        aircraftOverview.editButton().click();
        aircraftEdit.edit({
            validTo: add(startOfToday(), { days: 8 }),
        });
        cy.findByText(/this value must be less than/i);

        cy.visit("/aircraft");
        aircraftOverview.aircraftCard("E2E_000").click();
        aircraftOverview.editButton().click();
        aircraftEdit.edit({
            validTo: add(startOfToday(), { days: 2 }),
        });
        cy.findByText("Operation successful");
    });
    it("then they can set an aircraft type's 'Valid To' date later than its aircraft's 'Valid To' date", () => {
        cy.visit("/aircraft-type");
        aircraftTypeOverview.aircraftTypeCard("VTE2E").click();
        aircraftTypeOverview.editButton().click();
        aircraftTypeEdit.edit({ validTo: add(startOfToday(), { days: 1 }) });

        aircraftTypeEdit.confirmUpdateModal.confirmButton().click();

        cy.visit("/aircraft");
        aircraftOverview.aircraftCard("E2E_000").click();
        aircraftOverview.editButton().click();
        aircraftEdit.validToTextbox().should("contain.value", format(add(startOfToday(), { days: 1 }), "y-MM-dd"));
        cy.visit("/aircraft");
        aircraftOverview.aircraftCard("E2E_001").click();
        aircraftOverview.editButton().click();
        aircraftEdit.validToTextbox().should("contain.value", format(add(startOfToday(), { days: 1 }), "y-MM-dd"));
    });
});
