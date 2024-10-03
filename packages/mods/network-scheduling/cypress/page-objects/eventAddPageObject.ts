/* eslint-disable cypress/no-unnecessary-waiting */
import { dateTimePicker } from "./dateTimePickerPageObject";
import { select } from "./select";

export const eventAdd = {
    saveButton: () => cy.findByRole("button", { name: "Save" }),
    eventTextbox: () => cy.findByRole("textbox", { name: "Event:*" }),
    startDateTextbox: () => cy.findByRole("textbox", { name: "Start (UTC):*" }),
    endDateTextbox: () => cy.findByRole("textbox", { name: "End (UTC):*" }),
    descriptionTextbox: () => cy.findByLabelText("Description:"),
    blockedForMissionCheckBox: () => cy.findByLabelText("Blocked for Mission:"),
    add: (
        eventData: Partial<{
            event: string;
            startDate: Date;
            endDate: Date;
            description: string;
            aircraft: string;
            isBlockedForMission: boolean;
        }>
    ) => {
        const { event, startDate, endDate, description, aircraft, isBlockedForMission } = eventData;
        if (event) eventAdd.eventTextbox().type(event);

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
        if (isBlockedForMission) {
            eventAdd.blockedForMissionCheckBox().first().click();
        }
    },
};
