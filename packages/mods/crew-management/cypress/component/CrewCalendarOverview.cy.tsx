import { CrewMemberCalenderBlockingTime } from "@voloiq/crew-management-api/v1";
import { anyCrewMember } from "../../libs/test-fixtures/anyCrewMember";
import { anyCrewMemberCalenderBlockingTime } from "../../libs/test-fixtures/anyCrewMemberCalenderBlockingTime";
import { anyCrewMembersBlockingTimes } from "../../libs/test-fixtures/anyCrewMembersBlockingTimes";
import { CrewTimeScheduler } from "../../src/crewCalendar/CrewTimeScheduler";
import {
    addCrewMemberBlockingTimeInterceptor,
    deleteCrewMemberBlockingTimeInterceptor,
    getAllCrewMembersBlockingTimesInterceptor,
    getCrewMemberByNameRequestInterceptor,
    updateCrewMemberBlockingTimeInterceptor,
} from "../interceptors/crewCalendarInterceptors";
import { CrewCalendarOverviewPage } from "../page-objects/crew-calendar/crewCalendarOverviewPageObject";

describe("CrewCalendarOverview", () => {
    it("User can search member and view crew members blocking times", () => {
        getAllCrewMembersBlockingTimesInterceptor([]);
        getCrewMemberByNameRequestInterceptor("");
        cy.mount(<CrewTimeScheduler />);
        const crewMember = anyCrewMember({ surName: "Simon" });
        const crewMemberBlockingTimes = anyCrewMembersBlockingTimes({ surname: "Simon" });
        if (crewMember.surName) CrewCalendarOverviewPage.searchTextbox().clear().type(crewMember.surName);

        getCrewMemberByNameRequestInterceptor(crewMember.surName, crewMember);
        getAllCrewMembersBlockingTimesInterceptor([crewMemberBlockingTimes]);
        CrewCalendarOverviewPage.buttonByText("Search").click();
        if (crewMemberBlockingTimes.surname) {
            CrewCalendarOverviewPage.searchResultBox(crewMemberBlockingTimes.surname).should("be.visible");
            if (crewMemberBlockingTimes.homebaseName)
                CrewCalendarOverviewPage.searchHomebaseBox(crewMemberBlockingTimes?.homebaseName).should("be.visible");
        }
    });

    it("can add a new blocking time event", () => {
        const blockingTimeId = "3b75e25a-6062-4970-a61b-20ad2cf5e310";
        const calenderEvent: CrewMemberCalenderBlockingTime = {
            id: blockingTimeId,
            title: "Debriefing: Mission",
            "event-type": "DEBRIEFING",
            startTime: new Date().toLocaleString(),
            endTime: new Date(new Date().setHours(new Date().getHours() + 6)).toLocaleString(),
            isBlockedForMission: false,
        };

        getAllCrewMembersBlockingTimesInterceptor([]);
        getCrewMemberByNameRequestInterceptor("");
        cy.mount(<CrewTimeScheduler />);
        const crewMember = anyCrewMember({ surName: "Simon" });
        const crewMemberBlockingTimes = anyCrewMembersBlockingTimes({ surname: "Simon", calendar: [calenderEvent] });
        if (crewMember.surName) CrewCalendarOverviewPage.searchTextbox().clear().type(crewMember.surName);

        getCrewMemberByNameRequestInterceptor(crewMember.surName, crewMember);
        getAllCrewMembersBlockingTimesInterceptor([crewMemberBlockingTimes]);
        addCrewMemberBlockingTimeInterceptor();

        CrewCalendarOverviewPage.buttonByText("Search").click();

        CrewCalendarOverviewPage.buttonByText("Add event").click();
        cy.findByLabelText("Add - Event").should("be.visible");

        const crewMemberCalenderBlockingTime = anyCrewMemberCalenderBlockingTime({ title: "Dummy Event" });
        CrewCalendarOverviewPage.fillCrewMemberCalenderBlockingTimeForm(crewMemberCalenderBlockingTime);

        cy.findByText("Add - Event").should("not.be.exist");
    });

    it("can edit an existing blocking time event", () => {
        const blockingTimeId = "3b75e25a-6062-4970-a61b-20ad2cf5e310";
        const calenderEvent: CrewMemberCalenderBlockingTime = {
            id: blockingTimeId,
            title: "Debriefing: Mission",
            "event-type": "DEBRIEFING",
            startTime: new Date().toLocaleString(),
            endTime: new Date(new Date().setHours(new Date().getHours() + 6)).toLocaleString(),
            isBlockedForMission: false,
        };

        getAllCrewMembersBlockingTimesInterceptor([]);
        getCrewMemberByNameRequestInterceptor("");
        cy.mount(<CrewTimeScheduler />);
        const crewMember = anyCrewMember({ surName: "Simon" });
        const crewMemberBlockingTimes = anyCrewMembersBlockingTimes({ surname: "Simon", calendar: [calenderEvent] });
        if (crewMember.surName) CrewCalendarOverviewPage.searchTextbox().clear().type(crewMember.surName);

        getCrewMemberByNameRequestInterceptor(crewMember.surName, crewMember);
        getAllCrewMembersBlockingTimesInterceptor([crewMemberBlockingTimes]);
        updateCrewMemberBlockingTimeInterceptor();

        CrewCalendarOverviewPage.buttonByText("Search").click();

        CrewCalendarOverviewPage.buttonByText("actionButton").click();
        CrewCalendarOverviewPage.buttonByText("Edit event").click();
        cy.findByLabelText("Edit - Event").should("be.visible");

        const crewMemberCalenderBlockingTime = anyCrewMemberCalenderBlockingTime({ title: "Dummy Event" });
        CrewCalendarOverviewPage.fillCrewMemberCalenderBlockingTimeForm(crewMemberCalenderBlockingTime);

        cy.findByText("Edit - Event").should("not.be.exist");
    });

    it("can delete an existing blocking time event", () => {
        const blockingTimeId = "3b75e25a-6062-4970-a61b-20ad2cf5e310";
        const calenderEvent: CrewMemberCalenderBlockingTime = {
            id: blockingTimeId,
            title: "Debriefing: Mission",
            "event-type": "DEBRIEFING",
            startTime: new Date().toLocaleString(),
            endTime: new Date(new Date().setHours(new Date().getHours() + 6)).toLocaleString(),
            isBlockedForMission: false,
        };

        getAllCrewMembersBlockingTimesInterceptor([]);
        getCrewMemberByNameRequestInterceptor("");
        cy.mount(<CrewTimeScheduler />);
        const crewMember = anyCrewMember({ surName: "Simon" });
        const crewMemberBlockingTimes = anyCrewMembersBlockingTimes({ surname: "Simon", calendar: [calenderEvent] });
        if (crewMember.surName) CrewCalendarOverviewPage.searchTextbox().clear().type(crewMember.surName);

        getCrewMemberByNameRequestInterceptor(crewMember.surName, crewMember);
        getAllCrewMembersBlockingTimesInterceptor([crewMemberBlockingTimes]);
        deleteCrewMemberBlockingTimeInterceptor();

        CrewCalendarOverviewPage.buttonByText("Search").click();

        CrewCalendarOverviewPage.buttonByText("actionButton").click();
        CrewCalendarOverviewPage.buttonByText("Delete event").click();
        cy.findByLabelText("Delete - Event").should("be.visible");

        CrewCalendarOverviewPage.buttonByText("Confirm").click();

        cy.findByText("Delete - Event").should("not.be.exist");

        getAllCrewMembersBlockingTimesInterceptor([]);
        cy.findAllByLabelText("Debriefing: Mission").should("not.be.exist");
    });
});
