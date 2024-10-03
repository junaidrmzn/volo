import { Aircraft } from "@voloiq-typescript-api/aircraft-management-types/dist";
import { anyAvailableAircraft, anyFlightTimeLimitation, anyMission } from "@voloiq/network-schedule-management-api/v1";
import { Route } from "@voloiq/routing";
import { anyAircraft } from "../../lib/test-fixtures/anyAircraft";
import { anyAvailableCrewMember } from "../../lib/test-fixtures/anyAvailableCrewMember";
import { anyCrewRole } from "../../lib/test-fixtures/anyCrewRole";
import { anyDelayCode } from "../../lib/test-fixtures/anyDelayCode";
import { anyMissionResource } from "../../lib/test-fixtures/anyMissionResources";
import { anyVertiport } from "../../lib/test-fixtures/anyVertiport";
import { MissionOverview } from "../../src/missions/MissionOverview";
import { MissionDetail } from "../../src/missions/mission-detail/MissionDetail";
import { MissionOverviewWrapper } from "../../src/testing/TestWrapper";
import {
    availableCrewMembersListInterceptor,
    availablePilotsListInterceptor,
    getAllCrewRolesInterceptor,
} from "../interceptor/crewInterceptor";
import {
    aircraftAssignmentInterceptor,
    availableAircraftsListInterceptor,
    crewMemberAssignmentInterceptor,
    getAircraftAssignmentsInterceptor,
    getAircraftInterceptor,
    getAllAircraftTypesInterceptor,
    getAllAircraftsInterceptor,
    getAllDelayCodesInterceptor,
    getAllGroundEventsInterceptor,
    getAllRegionsInterceptor,
    getAllVertiportsInterceptor,
    getMissionInterceptor,
    getMissionResourcesInterceptor,
    getVertiportInterceptor,
    missionFlightTimeLimitationInterceptor,
    missionsListWithEntriesInterceptor,
    pilotAssignmentInterceptor,
} from "../interceptor/missionInterceptor";
import { aircraftAssignment } from "../pageObjects/aircraftAssignmentModalFragment";
import { crewMemberAssignment } from "../pageObjects/crewMemberAssignmentModalFragment";
import { missionActions } from "../pageObjects/missionActionsFragment";
import { missionDetail } from "../pageObjects/missionDetailPageObject";
import { missionOverview } from "../pageObjects/missionOverviewPageObject";
import { pilotAssignment } from "../pageObjects/pilotAssignmentModalFragment";

describe("MissionDetails", () => {
    const aircraftId = "647101a1-3b79-452a-868b-2d15073285a6";
    const aircraft: Partial<Aircraft> = { id: aircraftId };

    const aircraftData = anyAircraft(aircraft);
    const vertiport = anyVertiport();
    const delayCode = anyDelayCode();

    beforeEach(() => {
        getAllAircraftsInterceptor([]);
        getAllAircraftTypesInterceptor([]);
        getAllRegionsInterceptor([]);
        getAllGroundEventsInterceptor([]);
        getAircraftAssignmentsInterceptor([]);
        getAllVertiportsInterceptor([vertiport]);
        getAllDelayCodesInterceptor([delayCode]);
        getAircraftInterceptor(aircraftData);
    });

    // this will be activated again with new crew tab
    it.skip("User can see the flight time limitations table for assigned pilot", () => {
        const flightTimeLimitations = anyFlightTimeLimitation();
        const mission = anyMission({
            id: "d9381aa2-0955-47a2-ada8-5dcd49117d7f",
            flightNumber: "VC123",
            assignments: {
                id: "d9381aa2-0955-47a2-ada8-5dcd49117d7d",
                aircraftId: "647101a1-3b79-452a-868b-2d15073285a6",
                pilotId: "d9381aa2-0955-47a2-ada8-5dcd49117d7f",
                createTime: "2023-04-06T09:42:29.991Z",
                updateTime: "2023-04-12T08:15:13.438Z",
                aircraftMSN: "1112",
                aircraftRegistration: "TEST",
                aircraftTypeName: "TEST",
                batteryId: "291627c0-27e8-4361-b5d4-4d7e79238a46",
                batteryName: "todo",
                aircraftReservationStatus: "UNKNOWN",
                aircraftTechnicalStatus: "SERVICEABLE",
                pilotReservationStatus: "ACCEPTED",
                pilotFirstName: "Simon",
                pilotMiddleName: "L",
                pilotSurName: "Bayer",
            },
            estimatedDepartureDateTime: "2023-06-05T06:00:00.000Z",
        });

        missionsListWithEntriesInterceptor([mission]);
        getMissionInterceptor(mission);
        getVertiportInterceptor();
        getMissionResourcesInterceptor();
        const estimatedDepartureDate = mission?.estimatedDepartureDateTime
            ? mission?.estimatedDepartureDateTime
            : new Date().toISOString().slice(0, 10);
        missionFlightTimeLimitationInterceptor(flightTimeLimitations, estimatedDepartureDate);
        cy.mount(
            <MissionOverviewWrapper initialEntries={["/overview"]}>
                <Route path="overview" element={<MissionOverview />} />
                <Route path="overview/:missionId" element={<MissionDetail />} />
            </MissionOverviewWrapper>
        );

        missionOverview.detailsButton().click({ force: true });
        cy.findByText("Pilot").click({ force: true });
        cy.wait("@missionFlightTimeLimitationInterceptor").then(() => {
            cy.findByRole("button", { name: "Go To Resource" }).should("be.visible");
            cy.findByText("Report On").should("be.visible");
            cy.findByText("Report Off").should("be.visible");
            cy.findByText("Schedule").should("be.visible");
        });
    });

    it("User can see assignments cards and assign aircraft on details page", () => {
        const flightTimeLimitations = anyFlightTimeLimitation();
        const mission = anyMission({
            id: "3679f481-1517-4df6-a8e9-debe126fb5a0",
            flightNumber: "VC123",
            aircraftReservationStartDateTime: "2022-11-06T12:00:00Z",
            aircraftReservationEndDateTime: "2022-11-06T13:00:00Z",
        });
        const missionResource = anyMissionResource();
        const availableAircraft = anyAvailableAircraft();

        availableAircraftsListInterceptor([availableAircraft]);
        missionsListWithEntriesInterceptor([mission]);
        getAllAircraftsInterceptor([anyAircraft(availableAircraft)]);
        getMissionInterceptor(mission);
        getVertiportInterceptor();
        getMissionResourcesInterceptor(missionResource);

        const estimatedDepartureDate = mission?.estimatedDepartureDateTime
            ? mission?.estimatedDepartureDateTime.slice(0, 10)
            : new Date().toISOString().slice(0, 10);
        missionFlightTimeLimitationInterceptor(flightTimeLimitations, estimatedDepartureDate);

        cy.mount(
            <MissionOverviewWrapper initialEntries={["/overview"]}>
                <Route path="overview" element={<MissionOverview />} />
                <Route path="overview/:missionId" element={<MissionDetail />} />
            </MissionOverviewWrapper>
        );

        missionOverview.detailsButton().click();

        missionDetail.popover("Aircraft Popover");
        missionDetail.assignResourceButton("Assign Aircraft");
        aircraftAssignment.aircraftCard(availableAircraft.aircraftId).click();
        const updatedMission = anyMission();
        updatedMission.assignments = {
            id: "d9381aa2-0955-47a2-ada8-5dcd49117d7d",
            aircraftId: "647101a1-3b79-452a-868b-2d15073285a6",
            pilotId: "d9381aa2-0955-47a2-ada8-5dcd49117d7f",
            createTime: "2023-04-06T09:42:29.991Z",
            updateTime: "2023-04-12T08:15:13.438Z",
            aircraftMSN: "1112",
            aircraftRegistration: "TEST",
            aircraftTypeName: "TEST",
            batteryId: "291627c0-27e8-4361-b5d4-4d7e79238a46",
            batteryName: "todo",
            aircraftReservationStatus: "UNKNOWN",
            aircraftTechnicalStatus: "SERVICEABLE",
            pilotReservationStatus: "ACCEPTED",
            pilotFirstName: "",
            pilotMiddleName: "",
            pilotSurName: "",
        };
        aircraftAssignmentInterceptor(updatedMission?.assignments);
        aircraftAssignment.assignButton().click();
    });

    it("User can see assignments cards and assign pilot on details page", () => {
        const flightTimeLimitations = anyFlightTimeLimitation();
        const mission = anyMission({
            id: "3679f481-1517-4df6-a8e9-debe126fb5a0",
            flightNumber: "VC123",
            assignments: {
                id: "d9381aa2-0955-47a2-ada8-5dcd49117d7d",
                pilotId: "d9381aa2-0955-47a2-ada8-5dcd49117d7f",
                createTime: "2023-04-06T09:42:29.991Z",
                updateTime: "2023-04-12T08:15:13.438Z",
            },
        });
        mission.assignments = {
            id: "d9381aa2-0955-47a2-ada8-5dcd49117d7d",
            aircraftId: "647101a1-3b79-452a-868b-2d15073285a6",
            pilotId: "d9381aa2-0955-47a2-ada8-5dcd49117d7f",
            createTime: "2023-04-06T09:42:29.991Z",
            updateTime: "2023-04-12T08:15:13.438Z",
            aircraftMSN: "1112",
            aircraftRegistration: "TEST",
            aircraftTypeName: "TEST",
            batteryId: "291627c0-27e8-4361-b5d4-4d7e79238a46",
            batteryName: "todo",
            aircraftReservationStatus: "UNKNOWN",
            aircraftTechnicalStatus: "SERVICEABLE",
            pilotReservationStatus: "ACCEPTED",
            pilotFirstName: "",
            pilotMiddleName: "",
            pilotSurName: "",
        };

        const missionResource = anyMissionResource();
        const aircraft: Partial<Aircraft> = { id: aircraftId };
        getAircraftInterceptor(anyAircraft(aircraft));
        missionsListWithEntriesInterceptor([mission]);
        getMissionInterceptor(mission);
        getVertiportInterceptor();
        getMissionResourcesInterceptor(missionResource);
        const estimatedDepartureDate = mission?.estimatedDepartureDateTime
            ? mission?.estimatedDepartureDateTime.slice(0, 10)
            : new Date().toISOString().slice(0, 10);
        missionFlightTimeLimitationInterceptor(flightTimeLimitations, estimatedDepartureDate);
        cy.mount(
            <MissionOverviewWrapper initialEntries={["/overview"]}>
                <Route path="overview" element={<MissionOverview />} />
                <Route path="overview/:missionId" element={<MissionDetail />} />
            </MissionOverviewWrapper>
        );

        missionOverview.detailsButton().click();
        const crewRole = anyCrewRole();
        getAllCrewRolesInterceptor([crewRole]);
        const availablePilot = anyAvailableCrewMember();
        availablePilotsListInterceptor([availablePilot]);

        missionDetail.popover("Pilot Popover");
        missionDetail.assignResourceButton("Assign Pilot");
        pilotAssignment.pilotCard(availablePilot.id).click();
        pilotAssignmentInterceptor(mission.assignments);
        pilotAssignment.assignButton().click();
        missionActions.assignPilotButton().should("not.be.exist");
    });

    it("User can see assignments cards and assign crew member on details page", () => {
        const flightTimeLimitations = anyFlightTimeLimitation();
        const mission = anyMission({
            id: "3679f481-1517-4df6-a8e9-debe126fb5a0",
            flightNumber: "VC123",
        });
        const vertiport = anyVertiport();
        const missionResource = anyMissionResource();

        getAircraftInterceptor();
        getAllVertiportsInterceptor([vertiport]);
        missionsListWithEntriesInterceptor([mission]);
        getMissionInterceptor(mission);
        getVertiportInterceptor(vertiport);
        getMissionResourcesInterceptor(missionResource);
        const estimatedDepartureDate = mission?.estimatedDepartureDateTime
            ? mission?.estimatedDepartureDateTime.slice(0, 10)
            : new Date().toISOString().slice(0, 10);
        missionFlightTimeLimitationInterceptor(flightTimeLimitations, estimatedDepartureDate);
        cy.mount(
            <MissionOverviewWrapper initialEntries={["/overview"]}>
                <Route path="overview" element={<MissionOverview />} />
                <Route path="overview/:missionId" element={<MissionDetail />} />
            </MissionOverviewWrapper>
        );

        missionOverview.detailsButton().click();
        const crewRole = anyCrewRole();
        getAllCrewRolesInterceptor([crewRole]);
        const availableCrewMember = anyAvailableCrewMember();
        availableCrewMembersListInterceptor([availableCrewMember]);

        missionDetail.popover("Crew Member Popover");
        missionDetail.assignResourceButton("Assign Crew");
        crewMemberAssignment.crewMemberCard(availableCrewMember.id).click({ force: true });
        crewMemberAssignment.selectRole("FTE");
        crewMemberAssignmentInterceptor();
        crewMemberAssignment.assignButton().click({ force: true });
        missionActions.assignCrewMemberButton().should("not.be.exist");
    });

    it("should fetch mission data through polling", () => {
        const mission = anyMission();

        missionsListWithEntriesInterceptor([mission]);
        getMissionInterceptor(mission);
        getMissionResourcesInterceptor();

        cy.mount(
            <MissionOverviewWrapper initialEntries={["/overview"]}>
                <Route path="overview" element={<MissionOverview />} />
                <Route path="overview/:missionId" element={<MissionDetail pollingInterval={2000} />} />
            </MissionOverviewWrapper>
        );

        missionOverview.detailsButton().click();

        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(2000);
        cy.get("@getMissionInterceptor.all").should("have.length", 2);
    });
});
