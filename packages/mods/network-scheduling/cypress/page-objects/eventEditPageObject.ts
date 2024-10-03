/* eslint-disable cypress/no-unnecessary-waiting */
import { dateTimePicker } from "./dateTimePickerPageObject";
import { eventAdd } from "./eventAddPageObject";
import { select } from "./select";

const { saveButton, eventTextbox, startDateTextbox, endDateTextbox, descriptionTextbox } = eventAdd;

export const eventEdit = {
    saveButton,
    eventTextbox,
    startDateTextbox,
    endDateTextbox,
    descriptionTextbox,
    edit: (
        eventData: Partial<{ event: string; startDate: Date; endDate: Date; description: string; aircraft: string }>
    ) => {
        const { event, startDate, endDate, description, aircraft } = eventData;
        cy.wait(1000);
        if (event) {
            eventAdd.eventTextbox().clear().type(event);
        }
        if (startDate) {
            eventAdd.startDateTextbox().click();
            dateTimePicker.selectDateWithoutTime(startDate);
        }
        if (endDate) {
            eventAdd.eventTextbox().click({ force: true });
            eventAdd.endDateTextbox().click({ force: true });
            dateTimePicker.selectDateWithoutTime(endDate);
        }
        if (description) {
            eventAdd.eventTextbox().click({ force: true });
            eventAdd.descriptionTextbox().type(description, { force: true });
        }
        if (aircraft) select.selectByOptionName("Aircraft:", aircraft);
        eventAdd.saveButton().click();
    },
};
