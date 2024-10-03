import { CrewMemberCalenderBlockingTimeBase } from "@voloiq/crew-management-api/v1";
import { DateTimePicker } from "../datepicker";

export const CrewCalendarOverviewPage = {
    buttonByText: (buttonText: string) => cy.findByRole("button", { name: buttonText }),
    searchTextbox: () => cy.get('input[placeholder*="email, full name or surname"]'),
    searchResultBox: (surName: string) => cy.findByLabelText(surName),
    searchHomebaseBox: (homebaseName: string) => cy.findByText(homebaseName),
    eventTitleTextbox: () => cy.findByRole("textbox", { name: "Event:*" }),
    eventStartTime: () => cy.findByLabelText("Start (UTC):*"),
    eventEndTime: () => cy.findByLabelText("End (UTC):*"),
    eventBlockedForMissionCheckbox: () => cy.findByRole("checkbox", { name: "Blocked for Mission:" }),
    fillCrewMemberCalenderBlockingTimeForm: (
        crewMemberCalenderBlockingTime: Partial<CrewMemberCalenderBlockingTimeBase>
    ) => {
        const { title, startTime, endTime, isBlockedForMission } = crewMemberCalenderBlockingTime;

        if (title)
            CrewCalendarOverviewPage.eventTitleTextbox().click().clear({ force: true }).type(title, { force: true });
        if (startTime) {
            CrewCalendarOverviewPage.eventStartTime().click({ force: true });
            DateTimePicker.selectDate(new Date(startTime));
        }
        if (endTime) {
            CrewCalendarOverviewPage.eventEndTime().click({ force: true });
            DateTimePicker.selectDate(new Date(endTime));
        }
        if (isBlockedForMission) CrewCalendarOverviewPage.eventBlockedForMissionCheckbox().click();
        CrewCalendarOverviewPage.buttonByText("Save").click();
    },
};
