import { add, startOfToday } from "date-fns";
import { anyAircraft } from "../../lib/test-fixtures/anyAircraft";
import { anyEvent } from "../../lib/test-fixtures/anyEvent";
import { EventOverview } from "../../src/event/EventOverview";
import {
    addEventInterceptor,
    bulkEditEventInterceptors,
    deleteEventInterceptor,
    editEventInterceptor,
    getAllAircraftsInterceptor,
    getAllEventsInterceptor,
    getEventInterceptor,
} from "../interceptors/EventInterceptors";
import { eventAdd } from "../page-objects/eventAddPageObject";
import { eventBulkEdit } from "../page-objects/eventBulkEditPageObject";
import { eventEdit } from "../page-objects/eventEditPageObject";
import { eventOverview } from "../page-objects/eventOverviewPageObject";
import { FilterBarEventPageFragment } from "../page-objects/filterBarEventPageFragment";
import { removeEventConfirmationModal } from "../page-objects/removeEventConfirmationModalPageObject";
import { select } from "../page-objects/select";

describe("EventOverview", () => {
    it("User can add a new event", () => {
        getAllEventsInterceptor([anyEvent()]);
        const aircraft = anyAircraft();
        getAllAircraftsInterceptor([aircraft]);
        cy.mountWithWrappers(<EventOverview />);

        eventOverview.addButton().click();

        addEventInterceptor(anyEvent());
        eventAdd.add({
            event: "Test 2",
            startDate: add(startOfToday(), { days: 1 }),
            description: "This is a new event",
            endDate: add(startOfToday(), { days: 6 }),
        });

        eventAdd.saveButton().click();
    });

    it("User can edit an existing", () => {
        const event = anyEvent();
        getAllEventsInterceptor([anyEvent()]);
        const aircraft = anyAircraft();
        getAllAircraftsInterceptor([aircraft]);
        cy.mountWithWrappers(<EventOverview />);
        getEventInterceptor(event);
        eventOverview.eventCard(event.name).click();
        eventOverview.editButton().click();

        editEventInterceptor(event);
        eventEdit.edit({
            event: "Updated Event",
            startDate: add(startOfToday(), { days: 1 }),
            description: "This is an updated event",
            endDate: add(startOfToday(), { days: 6 }),
        });
    });

    it("User can delete an existing event", () => {
        const event = anyEvent();
        getAllEventsInterceptor([anyEvent()]);
        const aircraft = anyAircraft();
        getAllAircraftsInterceptor([aircraft]);
        cy.mountWithWrappers(<EventOverview />);
        getEventInterceptor(event);
        eventOverview.eventCard(event.name).click();

        eventOverview.deleteButton().click();

        removeEventConfirmationModal.modal().should("be.visible");
        deleteEventInterceptor(event);
        removeEventConfirmationModal.deleteButton().click();
    });

    it("User can apply filters to existing events", () => {
        const eventList = [{ name: "Event 1" }, { name: "Event 2" }].map((event) => anyEvent(event));
        getAllEventsInterceptor(eventList);
        const aircraft = anyAircraft();
        getAllAircraftsInterceptor([aircraft]);
        cy.mountWithWrappers(<EventOverview />);
        getAllEventsInterceptor(eventList.slice(0, 1));
        FilterBarEventPageFragment.filter({ aircraft: "12345 - D-VOLO" });
        eventOverview.eventCard("Event 1").should("be.visible");
    });

    it("User can apply sorting to existing events", () => {
        const eventList = [{ name: "Pressure Altitude" }, { name: "alpha-no-ac" }, { name: "Foo" }].map((event) =>
            anyEvent(event)
        );
        getAllEventsInterceptor(eventList);
        cy.mountWithWrappers(<EventOverview />);

        FilterBarEventPageFragment.sorting({ sortingOption: "Event name" });
        getAllEventsInterceptor(
            eventList.sort((a, b) => {
                if (a.name > b.name) return -1;
                return a.name < b.name ? 1 : 0;
            })
        );
        FilterBarEventPageFragment.sorting({ sortingOption: "Event name", comparisonOperatorLabel: "Descending" });
        getAllEventsInterceptor(
            eventList.sort((a, b) => {
                if (a.name > b.name) return -1;
                return a.name < b.name ? 1 : 0;
            })
        );
    });

    it("should not display bulk edit button when no filters are applied", () => {
        const eventList = [{ name: "Event 1" }, { name: "Event 2" }].map((event) => anyEvent(event));
        getAllEventsInterceptor(eventList);
        const aircraftWithOldDate = anyAircraft();
        const aircraftWithCurrentDate = anyAircraft({
            reservations: aircraftWithOldDate.reservations?.map((reservation) => ({
                ...reservation,
                startDateTime: new Date().toISOString(),
                endDateTime: add(new Date(), { minutes: 30 }).toISOString(),
                reservationModel: {
                    ...reservation.reservationModel,
                    scheduledDepartureDateTime: new Date().toISOString(),
                    scheduledArrivalDateTime: add(new Date(), { minutes: 30 }).toISOString(),
                },
            })),
        });
        getAllAircraftsInterceptor([aircraftWithCurrentDate]);
        cy.mountWithWrappers(<EventOverview />);
        getAllEventsInterceptor(eventList.slice(0, 1));

        eventBulkEdit.bulkEditButton().should("not.exist");
    });

    it("renders bulk edit modal and select edit properties", () => {
        const eventList = [{ name: "Event 1" }, { name: "Event 2" }].map((event) => anyEvent(event));
        getAllEventsInterceptor(eventList);
        const aircraft = anyAircraft();
        getAllAircraftsInterceptor([aircraft]);
        cy.mountWithWrappers(<EventOverview />);
        getAllEventsInterceptor(eventList.slice(0, 1));

        const date = "2024-01-01 12:00";

        FilterBarEventPageFragment.filter({ aircraft: "12345 - D-VOLO" });
        eventBulkEdit.bulkEditButton().click({ force: true });

        eventBulkEdit.selectLabelText("Bulk Edit - Events").should("be.visible");
        eventBulkEdit.selectLabelText("Edit Properties").should("be.checked");
        eventBulkEdit.selectLabelText("Archive").should("not.be.checked");

        select.selectByOptionName("Property:", "Start \\(UTC\\)");
        eventBulkEdit.selectLabelText("Change to:").click();
        eventBulkEdit.selectDate(new Date(date));
        eventBulkEdit.doneButton().click();

        eventBulkEdit.selectLabelText("Confirm - Multi Edit").should("be.visible");
        cy.findAllByText(/start/i).should("be.visible");
        eventBulkEdit.selectText("to").should("be.visible");
        eventBulkEdit.selectAllText(date).should("be.visible");
        eventBulkEdit.selectText("Are you sure? You can’t undo this action afterwards.").should("be.visible");

        bulkEditEventInterceptors(eventList);
        eventBulkEdit.confirmButton().click();
        cy.get("@bulkEditEventInterceptors");

        eventBulkEdit.selectLabelText("Confirm - Multi Edit").should("not.exist");
        eventBulkEdit.selectLabelText("Bulk Edit - Events").should("not.exist");
    });
});
