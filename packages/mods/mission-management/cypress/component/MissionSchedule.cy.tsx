import { add, format } from "date-fns";
import { anyAircraftAssignment } from "@voloiq/network-schedule-management-api/v1";
import { Route } from "@voloiq/routing";
import { ScheduledMissionOverview } from "../../src/scheduled-missions/ScheduledMissionOverview";
import { MissionOverviewWrapper } from "../../src/testing/TestWrapper";
import {
    getAllAircraftTypesInterceptor,
    getAllAircraftsInterceptor,
    getAllRegionsInterceptor,
    getAllVertiportsInterceptor,
} from "../interceptor/missionInterceptor";
import { scheduledMissionListInterceptor } from "../interceptor/scheduledMissionInterceptor";
import { dateTimePicker } from "../pageObjects/dateTimePickerPageObject";
import { scheduledMissions } from "../pageObjects/scheduledMissionsPageObjects";

describe("MissionSchedule", () => {
    beforeEach(() => {
        getAllAircraftsInterceptor([]);
        getAllAircraftTypesInterceptor([]);
        getAllRegionsInterceptor([]);
        getAllVertiportsInterceptor([]);
    });

    it("User can apply quick filter on scheduled Missions", () => {
        const aircraftAssignment = anyAircraftAssignment();
        const scheduledDate = format(new Date(), "yyyy-MM-dd");
        scheduledMissionListInterceptor([aircraftAssignment], scheduledDate);
        cy.mount(
            <MissionOverviewWrapper initialEntries={["/overview"]}>
                <Route path="overview" element={<ScheduledMissionOverview />} />
            </MissionOverviewWrapper>
        );

        cy.wait("@getScheduledMissions");
        scheduledMissions.aircraftTYpeNameLabel(aircraftAssignment?.aircraftTypeName || "").should("be.visible");
        const tomorrowDate = format(add(new Date(scheduledDate), { days: 1 }), "yyyy-MM-dd");

        scheduledMissionListInterceptor([aircraftAssignment], tomorrowDate);

        scheduledMissions.tomorrowButton().click();
        scheduledMissions.aircraftTYpeNameLabel(aircraftAssignment?.aircraftTypeName || "").should("be.visible");

        const customDate = format(add(new Date(scheduledDate), { days: 10 }), "yyyy-MM-dd");

        scheduledMissionListInterceptor([aircraftAssignment], customDate);

        scheduledMissions.customButton().click();

        scheduledMissions.goToDateTextbox().click();
        dateTimePicker.selectDate(new Date(customDate));
        scheduledMissions.goButton().click();

        scheduledMissions.aircraftTYpeNameLabel(aircraftAssignment?.aircraftTypeName || "").should("be.visible");
    });
});
