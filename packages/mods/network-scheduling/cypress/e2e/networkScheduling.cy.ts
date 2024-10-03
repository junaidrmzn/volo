import { add, format, sub } from "date-fns";
import { eventAdd } from "../page-objects/eventAddPageObject";
import { eventEdit } from "../page-objects/eventEditPageObject";
import { eventOverview } from "../page-objects/eventOverviewPageObject";
import { removeEventConfirmationModal } from "../page-objects/removeEventConfirmationModalPageObject";
import { successToast } from "../page-objects/successToast";

describe("When a user is on the Network Scheduling Management page", () => {
    before(() => {
        cy.resetNetworkSchedulingDatabase();
        cy.resetAircraftManagementDatabase();
        cy.createAircraftType({
            name: "VTE2E",
            productLine: "VOLOCITY",
            validFrom: new Date().toISOString(),
        })
            .its("body")
            .then((response) => {
                const aircraftType = response.data!;

                cy.createAircraft({
                    registration: "VE2E",
                    aircraftTypeId: aircraftType.id,
                    validFrom: new Date().toISOString(),
                    validTo: add(new Date(), { days: 1 }).toISOString(),
                    msn: "1",
                    service: "PASSENGER",
                    technicalStatus: "SERVICEABLE",
                    crewConfiguration: "CREWED",
                    homebaseVertiportId: "aabbccdd-1122-3344-5566-778899001001",
                });
            });
    });
    it("then they can create an event", () => {
        cy.visit("/network-scheduling/event");

        eventOverview.addButton().click();

        const startDate = new Date();
        const endDate = add(new Date(), { days: 1 });
        eventAdd.add({ event: "Reg-JJMMDDHH", startDate, endDate });
        successToast.closeToast();

        cy.visit("/network-scheduling/event");
        eventOverview.eventCard("Reg-JJMMDDHH").within(() => {
            eventOverview.event().contains("Reg-JJMMDDHH");
            eventOverview.startDate().contains(format(startDate, "M/d/yy, h:mm aa"));
            eventOverview.endDate().contains(format(endDate, "M/d/yy, h:mm aa"));
        });
    });

    it("then they can edit an event", () => {
        eventOverview.eventCard("Reg-JJMMDDHH").click();
        eventOverview.editButton().click();

        const endDate = sub(new Date(), { days: 1 });
        eventEdit.edit({ endDate });

        cy.findByRole("alert");
        cy.reload();
    });

    it("then they can assign an aircraft to an event", () => {
        eventEdit.edit({ description: "e2e test", aircraft: "VE2E" });

        cy.visit("/network-scheduling/event");
        eventOverview.eventCard("Reg-JJMMDDHH").within(() => {
            eventOverview.aircraft().contains("VE2E");
        });
    });

    it("then they can remove an aircraft assignment from an event", () => {
        eventOverview.eventCard("Reg-JJMMDDHH").click();
        eventOverview.editButton().click();
        eventEdit.edit({ aircraft: "---" });

        cy.visit("/network-scheduling/event");
        eventOverview.eventCard("Reg-JJMMDDHH").within(() => {
            eventOverview.aircraft().should("not.contain.text");
        });
    });

    it("then they cannot assign an aircraft that is not valid for the entire event duration", () => {
        eventOverview.eventCard("Reg-JJMMDDHH").click();
        eventOverview.editButton().click();

        const endDate = add(new Date(), { days: 2 });
        eventEdit.edit({ endDate });

        successToast.closeToast();

        eventOverview.eventCard("Reg-JJMMDDHH").click();
        eventOverview.editButton().click();
        eventEdit.edit({ aircraft: "VE2E" });
        // This should cause an error but does not at the moment
    });

    it("then they can delete an event", () => {
        cy.visit("/network-scheduling/event");
        eventOverview.eventCard("Reg-JJMMDDHH").click();
        eventOverview.deleteButton().click();
        removeEventConfirmationModal.modal().within(() => {
            removeEventConfirmationModal.deleteButton().click();
        });

        cy.reload();
        eventOverview.eventCard("Reg-JJMMDDHH").should("not.exist");
    });
});
