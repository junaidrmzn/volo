import { Service, TypeOfOperation } from "@voloiq-typescript-api/network-scheduling-types/dist";
import { add, startOfToday } from "date-fns";
import { useFormatDateTime } from "@voloiq/dates";
import { anyAvailableAircraft, anyAvailablePad } from "@voloiq/network-schedule-management-api/v1";
import { Route } from "@voloiq/routing";
import { anyAircraft } from "../../lib/test-fixtures/anyAircraft";
import { anyAircraftType } from "../../lib/test-fixtures/anyAircraftType";
import { anyAvailableCrewMember } from "../../lib/test-fixtures/anyAvailableCrewMember";
import { anyCrewRole } from "../../lib/test-fixtures/anyCrewRole";
import { anyDelayCode } from "../../lib/test-fixtures/anyDelayCode";
import { anyMission } from "../../lib/test-fixtures/anyMission";
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
    acceptMissionInterceptor,
    addMissionInterceptor,
    aircraftAssignmentInterceptor,
    availableAircraftsListInterceptor,
    cancelMissionInterceptor,
    createMessageInterceptor,
    crewMemberAssignmentInterceptor,
    divertMissionInterceptor,
    getAircraftInterceptor,
    getAllAircraftTypesInterceptor,
    getAllAircraftsInterceptor,
    getAllCancellationCodesInterceptor,
    getAllDelayCodesInterceptor,
    getAllGroundEventsInterceptor,
    getAllRegionsInterceptor,
    getAllVertiportsInterceptor,
    getMissionInterceptor,
    getMissionResourcesInterceptor,
    getVertiportInterceptor,
    missionUpdateInterceptor,
    missionsListWithEntriesInterceptor,
    padsAssignmentInterceptor,
    pilotAssignmentInterceptor,
    updateDelayInterceptor,
} from "../interceptor/missionInterceptor";
import { availablePadsListInterceptor } from "../interceptor/vertiportInterceptor";
import { acceptMission } from "../pageObjects/acceptMissionModalFragment";
import { aircraftAssignment } from "../pageObjects/aircraftAssignmentModalFragment";
import { cancelMission } from "../pageObjects/cancelMissionPopoverFragment";
import { crewMemberAssignment } from "../pageObjects/crewMemberAssignmentModalFragment";
import { diversionConfirmation } from "../pageObjects/diversionConfirmationModalFragment";
import { divertMission } from "../pageObjects/divertMissionModalFragment";
import { FilterBarMissionPageFragment } from "../pageObjects/filterBarMissionPageFragment";
import { generalTab } from "../pageObjects/mission-details/GeneralTabFragment";
import { groundOpsTab } from "../pageObjects/mission-details/GroundOpsTabFragment";
import { missionActions } from "../pageObjects/missionActionsFragment";
import { missionAdd } from "../pageObjects/missionAddPageObject";
import { missionDetail } from "../pageObjects/missionDetailPageObject";
import { missionOverview } from "../pageObjects/missionOverviewPageObject";
import { padAssignment } from "../pageObjects/padAssignmentModalFragments";
import { pilotAssignment } from "../pageObjects/pilotAssignmentModalFragment";
import { updateSchedule } from "../pageObjects/updateSchedulePopoverFragment";

describe("MissionOverview", () => {
    beforeEach(() => {
        getAircraftInterceptor();
        getAllAircraftsInterceptor([]);
        getAllAircraftTypesInterceptor([]);
        getAllRegionsInterceptor([]);
        getAllVertiportsInterceptor([anyVertiport()]);
        getAllDelayCodesInterceptor([anyDelayCode({ code: "01" }), anyDelayCode({ code: "02" })]);
        getAllCancellationCodesInterceptor([]);
        getAllGroundEventsInterceptor([]);
        missionsListWithEntriesInterceptor([]);
        getVertiportInterceptor();
        getMissionResourcesInterceptor();
        getAllCrewRolesInterceptor([]);
        updateDelayInterceptor();
        crewMemberAssignmentInterceptor();
        pilotAssignmentInterceptor();
    });

    it.skip("User can view mission time grid in mission details", () => {
        const mission = anyMission();
        const missionResource = anyMissionResource();
        missionsListWithEntriesInterceptor([mission]);
        getMissionInterceptor(mission);
        getVertiportInterceptor();
        getMissionResourcesInterceptor(missionResource);
        cy.mount(
            <MissionOverviewWrapper initialEntries={["/overview"]}>
                <Route path="overview" element={<MissionOverview />} />
                <Route path="overview/:missionId" element={<MissionDetail />} />
            </MissionOverviewWrapper>
        );

        missionOverview.detailsButton().click();
        missionDetail.assignmentsTab().click();

        cy.get("@missionResourcesInterceptor").then(() => {
            cy.findAllByLabelText("Aircraft").last().should("be.visible");
            cy.findByLabelText("Pilot").should("be.visible");
            cy.findAllByLabelText("Crew Member").should("be.visible");

            cy.findByRole("button", { name: "Now" }).click();
            cy.findByLabelText("Scroll right").click().click();
            cy.findByText(`${missionResource.aircraft.registration} - ${missionResource.aircraft.msn}`).should(
                "be.visible"
            );
        });
    });

    it("will add a new mission", () => {
        const missions = anyMission();
        const vertiports = anyVertiport();
        const aircrafts = anyAircraft();
        const aircraftTypes = anyAircraftType();

        missionsListWithEntriesInterceptor([missions]);
        getAllVertiportsInterceptor([vertiports]);
        getAllAircraftsInterceptor([aircrafts]);
        getAllAircraftTypesInterceptor([aircraftTypes]);

        cy.mount(
            <MissionOverviewWrapper initialEntries={["/overview"]}>
                <Route path="overview/*" element={<MissionOverview />} />
            </MissionOverviewWrapper>
        );

        missionOverview.addButton().click();

        missionAdd.add({
            flightNumber: "VC123",
            departureTime: new Date(),
            arrivalTime: add(startOfToday(), { days: 6 }),
            departureVertiport: "iloveorange, XVE",
            arrivalVertiport: "iloveorange, XVE",
            operations: TypeOfOperation.PILOTED,
            service: Service.TRAINING,
        });

        addMissionInterceptor(missions);
        missionAdd.saveButton().click();
        cy.get("@addMissionInterceptor");
    });

    it("can not add a new mission with previous dates", () => {
        const missions = anyMission();
        const vertiports = anyVertiport();
        missionsListWithEntriesInterceptor([missions]);

        cy.mount(
            <MissionOverviewWrapper initialEntries={["/overview"]}>
                <Route path="overview/*" element={<MissionOverview />} />
            </MissionOverviewWrapper>
        );

        getAllVertiportsInterceptor([vertiports]);
        missionOverview.addButton().click();

        missionAdd.add({
            flightNumber: "VC123",
            departureTime: new Date("2022-02-02"),
            arrivalTime: add(new Date("2022-02-02"), { hours: 3 }),
            departureVertiport: "iloveorange, XVE",
            arrivalVertiport: "iloveorange, XVE",
            operations: TypeOfOperation.PILOTED,
            service: Service.TRAINING,
        });

        addMissionInterceptor(missions);
        missionAdd.saveButton().click();
        cy.get("@addMissionInterceptor");

        const formattedDate = new Date().toISOString().slice(0, 10);
        const formattedTime = new Date()
            .toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit" })
            .slice(0, 5);
        cy.findByText(`Please select a date after ${formattedDate} ${formattedTime}`).should("be.visible");
    });

    it("will close mission actions popover on outside Click", () => {
        const mission = anyMission();

        missionsListWithEntriesInterceptor([mission]);

        cy.mount(
            <MissionOverviewWrapper initialEntries={["/overview"]}>
                <Route path="overview/*" element={<MissionOverview />} />
            </MissionOverviewWrapper>
        );
        missionOverview.actionsButton().click();
        missionOverview.actionsButton().should("be.visible");
        missionActions.popover().within(() => {
            missionActions.closeButton().should("be.visible");
        });

        missionOverview.actionsButton().click({ force: true });
        missionOverview.missionCardButton(mission.flightNumber ?? "").click();
        missionActions.popover().should("not.exist");
    });

    it("User can visit detail page", () => {
        const mission = anyMission();
        const vertiports = anyVertiport();
        getAllVertiportsInterceptor([vertiports]);
        missionsListWithEntriesInterceptor([mission]);
        getMissionInterceptor(mission);
        cy.mount(
            <MissionOverviewWrapper initialEntries={["/overview"]}>
                <Route path="overview" element={<MissionOverview />} />
                <Route path="overview/:missionId" element={<MissionDetail />} />
            </MissionOverviewWrapper>
        );
        missionOverview.detailsButton().click();
        missionDetail.assignmentsTab().click();
        missionDetail.generalTab().click();
        missionDetail.weatherTab().click();
    });

    it("User can add dispatcher notes", () => {
        const mission = anyMission();
        missionsListWithEntriesInterceptor([mission]);
        getMissionInterceptor(mission);
        cy.mount(
            <MissionOverviewWrapper initialEntries={["/overview"]}>
                <Route path="overview" element={<MissionOverview />} />
                <Route path="overview/:missionId" element={<MissionDetail />} />
            </MissionOverviewWrapper>
        );
        missionOverview.detailsButton().click();
        missionDetail.messageTextbox().type("test message");
        createMessageInterceptor();
        missionDetail.addMessageButton().click({ force: true });
    });

    it("User can assign aircraft", () => {
        const mission = anyMission({ assignments: undefined });
        missionsListWithEntriesInterceptor([mission]);
        getMissionInterceptor(mission);
        cy.mount(
            <MissionOverviewWrapper initialEntries={["/overview"]}>
                <Route path="overview" element={<MissionOverview />} />
            </MissionOverviewWrapper>
        );
        missionOverview.actionsButton().click();

        const availableAircraft = anyAvailableAircraft();
        availableAircraftsListInterceptor([availableAircraft]);
        missionActions.assignAircraftButton().click();
        aircraftAssignment.aircraftCard(availableAircraft.aircraftId).click();
        const updatedMission = anyMission();
        aircraftAssignmentInterceptor(updatedMission.assignments);
        aircraftAssignment.assignButton().click();
    });

    it("User can assign pilot", () => {
        const mission = anyMission({ assignments: undefined });
        const currentYear = new Date().getFullYear();
        mission.assignments = {
            id: "d9381aa2-0955-47a2-ada8-5dcd49117d7d",
            aircraftId: "647101a1-3b79-452a-868b-2d15073285a6",
            pilotId: "",
            createTime: `${currentYear}-04-06T09:42:29.991Z`,
            updateTime: `${currentYear}-04-12T08:15:13.438Z`,
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
        missionsListWithEntriesInterceptor([mission]);
        getMissionInterceptor(mission);
        cy.mount(
            <MissionOverviewWrapper initialEntries={["/overview"]}>
                <Route path="overview" element={<MissionOverview />} />
            </MissionOverviewWrapper>
        );
        missionOverview.actionsButton().click();
        const crewRole = anyCrewRole();
        getAllCrewRolesInterceptor([crewRole]);
        const availablePilot = anyAvailableCrewMember();
        availablePilotsListInterceptor([availablePilot]);
        missionActions.assignPilotButton().click();
        pilotAssignment.pilotCard(availablePilot.id).click();
        pilotAssignmentInterceptor(mission.assignments);
        pilotAssignment.assignButton().click();
        missionActions.assignPilotButton().should("not.be.exist");
    });

    it("User can assign crewMembers", () => {
        const mission = anyMission();
        missionsListWithEntriesInterceptor([mission]);
        getMissionInterceptor(mission);
        cy.mount(
            <MissionOverviewWrapper initialEntries={["/overview"]}>
                <Route path="overview" element={<MissionOverview />} />
            </MissionOverviewWrapper>
        );
        missionOverview.actionsButton().click();
        const crewRole = anyCrewRole();
        getAllCrewRolesInterceptor([crewRole]);
        const availableCrewMember = anyAvailableCrewMember();
        availableCrewMembersListInterceptor([availableCrewMember]);
        missionActions.assignCrewMemberButton().click();
        crewMemberAssignment.crewMemberCard(availableCrewMember.id).click({ force: true });
        crewMemberAssignment.selectRole("FTE");
        crewMemberAssignmentInterceptor();
        crewMemberAssignment.assignButton().click({ force: true });
        missionActions.assignCrewMemberButton().should("not.be.exist");
    });

    it("User can update schedule", () => {
        const mission = anyMission();
        const currentYear = new Date().getFullYear();
        missionsListWithEntriesInterceptor([mission]);
        getMissionInterceptor(mission);
        cy.mount(
            <MissionOverviewWrapper initialEntries={["/overview"]}>
                <Route path="overview" element={<MissionOverview />} />
            </MissionOverviewWrapper>
        );
        missionOverview.actionsButton().click();
        missionActions.updateScheduleButton().click();
        cy.wait("@getAllDelayCodes");
        updateSchedule.updateMissionSchedule({
            estimatedDepartureDate: new Date(currentYear, 3, 12),
            estimatedArrivalDate: new Date(currentYear, 3, 12),
            delayReasonIndex: 0,
        });
        missionUpdateInterceptor();
        updateSchedule.doneButton().click({ force: true });
        missionActions.updateScheduleButton().should("not.be.exist");
    });

    it("User can cancel mission", () => {
        const mission = anyMission();
        missionsListWithEntriesInterceptor([mission]);
        getMissionInterceptor(mission);
        cy.mount(
            <MissionOverviewWrapper initialEntries={["/overview"]}>
                <Route path="overview" element={<MissionOverview />} />
            </MissionOverviewWrapper>
        );
        missionOverview.actionsButton().click();
        missionActions.cancelButton().click();
        cancelMissionInterceptor(mission);
        cancelMission.yesButton().click();
        missionActions.cancelButton().should("not.be.exist");
    });

    it("User can divert mission", () => {
        const mission = anyMission({ statusOfMission: "FLYING" });
        const vertiports = anyVertiport();
        const currentYear = new Date().getFullYear();
        missionsListWithEntriesInterceptor([mission]);
        getMissionInterceptor(mission);
        cy.mount(
            <MissionOverviewWrapper initialEntries={["/overview"]}>
                <Route path="overview" element={<MissionOverview />} />
            </MissionOverviewWrapper>
        );
        missionOverview.actionsButton().click();
        getAllVertiportsInterceptor([vertiports]);
        missionActions.divertMissionButton().click();
        divertMission.divert("iloveorange, XVE", new Date());
        divertMission.saveButton().click();
        diversionConfirmation.confirmButton().should("exist");
        divertMissionInterceptor({
            estimatedArrivalDateTime: `${currentYear}-07-15T07:00:00.000Z`,
            arrivalVertiportId: "ce118b6e-d8e1-11e7-9296-cec278b6b50a",
        });
        diversionConfirmation.confirmButton().click();
        diversionConfirmation.confirmButton().should("not.exist");
    });

    it("User cannot divert mission in previous date", () => {
        const updatedActualDepartureDateTime = add(new Date(), { days: 1 }).toString();
        const mission = anyMission({
            statusOfMission: "FLYING",
            actualDepartureDateTime: updatedActualDepartureDateTime,
        });
        const vertiports = anyVertiport();
        missionsListWithEntriesInterceptor([mission]);
        getMissionInterceptor(mission);
        const currentYear = new Date().getFullYear();
        cy.mount(
            <MissionOverviewWrapper initialEntries={["/overview"]}>
                <Route path="overview" element={<MissionOverview />} />
            </MissionOverviewWrapper>
        );
        missionOverview.actionsButton().click();
        getAllVertiportsInterceptor([vertiports]);
        missionActions.divertMissionButton().click();
        divertMission.divert("iloveorange, XVE", new Date());
        divertMission.saveButton().click();
        diversionConfirmation.confirmButton().should("exist");
        divertMissionInterceptor({
            estimatedArrivalDateTime: `${currentYear}-07-15T07:00:00.000Z`,
            arrivalVertiportId: "ce118b6e-d8e1-11e7-9296-cec278b6b50a",
        });
        diversionConfirmation.confirmButton().click();
        const { formatDateTime } = useFormatDateTime();
        divertMission.dateErrorText(formatDateTime(updatedActualDepartureDateTime)).should("be.exist");
    });

    it("User can assign FATO to a mission", () => {
        const mission = anyMission();
        missionsListWithEntriesInterceptor([mission]);
        getMissionInterceptor(mission);
        cy.mount(
            <MissionOverviewWrapper initialEntries={["/overview"]}>
                <Route path="overview" element={<MissionOverview />} />
            </MissionOverviewWrapper>
        );
        missionOverview.actionsButton().click();

        const availablePad = anyAvailablePad();
        availablePadsListInterceptor([availablePad]).as("apiRequest");
        missionActions.assignArrivalFatoButton().click();
        cy.wait("@apiRequest").then(() => {
            padAssignment.padCard(availablePad.id).should("be.visible");
            padAssignment.padCard(availablePad.id).click();
            padsAssignmentInterceptor();
            padAssignment.assignButton().click({ force: true });
            missionActions.assignArrivalFatoButton().should("not.be.exist");
        });
    });

    it("User can assign Stand to a mission", () => {
        const mission = anyMission();
        missionsListWithEntriesInterceptor([mission]);
        getMissionInterceptor(mission);
        cy.mount(
            <MissionOverviewWrapper initialEntries={["/overview"]}>
                <Route path="overview" element={<MissionOverview />} />
            </MissionOverviewWrapper>
        );
        missionOverview.actionsButton().click();

        const availablePad = anyAvailablePad();
        availablePadsListInterceptor([availablePad]).as("apiRequest");
        missionActions.assignArrivalStandButton().click();
        cy.wait("@apiRequest").then(() => {
            padAssignment.padCard(availablePad.id).should("be.visible");
            padAssignment.padCard(availablePad.id).click();
            padsAssignmentInterceptor();
            padAssignment.assignButton().click({ force: true });
            missionActions.assignArrivalStandButton().should("not.be.exist");
        });
    });

    it("User can assign aircraft from general tab", () => {
        const mission = anyMission({ assignments: undefined });
        const vertiports = anyVertiport();
        getAllVertiportsInterceptor([vertiports]);
        missionsListWithEntriesInterceptor([mission]);
        getMissionInterceptor(mission);
        cy.mount(
            <MissionOverviewWrapper initialEntries={["/overview"]}>
                <Route path="overview" element={<MissionOverview />} />
                <Route path="overview/:missionId" element={<MissionDetail />} />
            </MissionOverviewWrapper>
        );
        missionOverview.detailsButton().click();
        missionDetail.generalTab().click();
        generalTab.aircraftAssignmentActionButton().click();
        const availableAircraft = anyAvailableAircraft();
        availableAircraftsListInterceptor([availableAircraft]);
        generalTab.assignAircraftButton().click();
        aircraftAssignment.aircraftCard(availableAircraft.aircraftId).click();
        const updatedMission = anyMission();
        aircraftAssignmentInterceptor(updatedMission.assignments);
        aircraftAssignment.assignButton().click();
        aircraftAssignment.assignButton().should("not.exist");
    });

    it("User can assign pilot from general tab", () => {
        const mission = anyMission({ assignments: undefined });
        const currentYear = new Date().getFullYear();
        mission.assignments = {
            id: "d9381aa2-0955-47a2-ada8-5dcd49117d7d",
            aircraftId: "647101a1-3b79-452a-868b-2d15073285a6",
            pilotId: "",
            createTime: `${currentYear}-04-06T09:42:29.991Z`,
            updateTime: `${currentYear}-04-12T08:15:13.438Z`,
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
        const vertiports = anyVertiport();
        getAllVertiportsInterceptor([vertiports]);
        missionsListWithEntriesInterceptor([mission]);
        getMissionInterceptor(mission);
        cy.mount(
            <MissionOverviewWrapper initialEntries={["/overview"]}>
                <Route path="overview" element={<MissionOverview />} />
                <Route path="overview/:missionId" element={<MissionDetail />} />
            </MissionOverviewWrapper>
        );
        missionOverview.detailsButton().click();
        missionDetail.generalTab().click();
        generalTab.pilotAssignmentActionButton().click();
        const crewRole = anyCrewRole();
        getAllCrewRolesInterceptor([crewRole]);
        const availablePilot = anyAvailableCrewMember();
        availablePilotsListInterceptor([availablePilot]);
        generalTab.assignPilotButton().click({ force: true });
        pilotAssignment.pilotCard(availablePilot.id).click();
        pilotAssignmentInterceptor(mission.assignments);
        pilotAssignment.assignButton().click();
    });

    it("User can assign crew members from general tab", () => {
        const mission = anyMission();
        const vertiports = anyVertiport();
        getAllVertiportsInterceptor([vertiports]);
        missionsListWithEntriesInterceptor([mission]);
        getMissionInterceptor(mission);
        cy.mount(
            <MissionOverviewWrapper initialEntries={["/overview"]}>
                <Route path="overview" element={<MissionOverview />} />
                <Route path="overview/:missionId" element={<MissionDetail />} />
            </MissionOverviewWrapper>
        );
        missionOverview.detailsButton().click();
        missionDetail.generalTab().click();
        generalTab.crewMemberAssignmentActionButton().click();
        const availableCrewMember = anyAvailableCrewMember();
        availableCrewMembersListInterceptor([availableCrewMember]);
        generalTab.assignCrewMemberButton().click({ force: true });
        crewMemberAssignment.crewMemberCard(availableCrewMember.id).click({ force: true });
        crewMemberAssignment.selectRole("FTE");
        crewMemberAssignmentInterceptor();
        crewMemberAssignment.assignButton().click({ force: true });
    });

    it("User can update schedule from general tab", () => {
        const mission = anyMission();
        const vertiports = anyVertiport();
        const currentYear = new Date().getFullYear();
        getAllVertiportsInterceptor([vertiports]);
        missionsListWithEntriesInterceptor([mission]);
        getMissionInterceptor(mission);
        cy.mount(
            <MissionOverviewWrapper initialEntries={["/overview"]}>
                <Route path="overview" element={<MissionOverview />} />
                <Route path="overview/:missionId" element={<MissionDetail />} />
            </MissionOverviewWrapper>
        );
        missionOverview.detailsButton().click();
        missionDetail.generalTab().click();
        generalTab.generalActionButton().click();
        generalTab.updateScheduleButton().click();
        cy.wait("@getAllDelayCodes");
        updateSchedule.updateMissionSchedule({
            estimatedDepartureDate: new Date(currentYear, 3, 12),
            estimatedArrivalDate: new Date(currentYear, 3, 12),
            delayReasonIndex: 0,
        });
        missionUpdateInterceptor();
        updateSchedule.doneButton().click({ force: true });
    });

    it("User can filter missions based on service", () => {
        const missionsList = [
            {
                flightNumber: "LM123",
                service: Service.FERRY_FLIGHT,
            },
            {
                flightNumber: "LM124",
                service: Service.TEST,
            },
            {
                flightNumber: "LM125",
                service: Service.TRAINING,
            },
        ].map((mission) => anyMission(mission));
        missionsListWithEntriesInterceptor(missionsList);
        const vertiports = anyVertiport();
        getAllVertiportsInterceptor([vertiports]);
        cy.mount(
            <MissionOverviewWrapper initialEntries={["/overview"]}>
                <Route path="overview" element={<MissionOverview />} />
                <Route path="overview/:missionId" element={<MissionDetail />} />
            </MissionOverviewWrapper>
        );
        missionsListWithEntriesInterceptor(missionsList.slice(0, 1));
        FilterBarMissionPageFragment.filter({ service: "Ferry flight", flightNumber: "LM123" });
        missionOverview.missionCard("LM123").should("be.visible");
    });

    it("User can assign departure FATO from ground Ops tab", () => {
        const mission = anyMission();
        const vertiports = anyVertiport();
        getAllVertiportsInterceptor([vertiports]);
        missionsListWithEntriesInterceptor([mission]);
        getMissionInterceptor(mission);
        cy.mount(
            <MissionOverviewWrapper initialEntries={["/overview"]}>
                <Route path="overview" element={<MissionOverview />} />
                <Route path="overview/:missionId" element={<MissionDetail />} />
            </MissionOverviewWrapper>
        );
        missionOverview.detailsButton().click();
        missionDetail.groundOperationsTab().click();
        groundOpsTab.generalActionButton().first().click();

        const availablePad = anyAvailablePad();
        availablePadsListInterceptor([availablePad]);
        groundOpsTab.assignDepartureFatoButton().click();
        padAssignment.padCard(availablePad.id).click({ force: true });
        padsAssignmentInterceptor();
        padAssignment.assignButton().click({ force: true });
        groundOpsTab.assignDepartureFatoButton().should("not.be.exist");
    });

    it("User can assign departure STAND from ground Ops tab", () => {
        const mission = anyMission();
        const vertiports = anyVertiport();
        getAllVertiportsInterceptor([vertiports]);
        missionsListWithEntriesInterceptor([mission]);
        getMissionInterceptor(mission);
        cy.mount(
            <MissionOverviewWrapper initialEntries={["/overview"]}>
                <Route path="overview" element={<MissionOverview />} />
                <Route path="overview/:missionId" element={<MissionDetail />} />
            </MissionOverviewWrapper>
        );
        missionOverview.detailsButton().click();
        missionDetail.groundOperationsTab().click();
        groundOpsTab.generalActionButton().first().click();

        const availablePad = anyAvailablePad();
        availablePadsListInterceptor([availablePad]);
        groundOpsTab.assignDepartureStandButton().click();
        padAssignment.padCard(availablePad.id).click({ force: true });
        padsAssignmentInterceptor();
        padAssignment.assignButton().click({ force: true });
        groundOpsTab.assignDepartureStandButton().should("not.be.exist");
    });

    it("User can assign arrival FATO from ground Ops tab", () => {
        const mission = anyMission();
        const vertiports = anyVertiport();
        getAllVertiportsInterceptor([vertiports]);
        missionsListWithEntriesInterceptor([mission]);
        getMissionInterceptor(mission);
        cy.mount(
            <MissionOverviewWrapper initialEntries={["/overview"]}>
                <Route path="overview" element={<MissionOverview />} />
                <Route path="overview/:missionId" element={<MissionDetail />} />
            </MissionOverviewWrapper>
        );
        missionOverview.detailsButton().click();
        missionDetail.groundOperationsTab().click();
        groundOpsTab.generalActionButton().last().click();

        const availablePad = anyAvailablePad();
        availablePadsListInterceptor([availablePad]);
        groundOpsTab.assignArrivalFatoButton().click();
        padAssignment.padCard(availablePad.id).click({ force: true });
        padsAssignmentInterceptor();
        padAssignment.assignButton().click({ force: true });
        groundOpsTab.assignArrivalFatoButton().should("not.be.exist");
    });

    it("User can assign arrival STAND from ground Ops tab", () => {
        const mission = anyMission();
        const vertiports = anyVertiport();
        getAllVertiportsInterceptor([vertiports]);
        missionsListWithEntriesInterceptor([mission]);
        getMissionInterceptor(mission);
        cy.mount(
            <MissionOverviewWrapper initialEntries={["/overview"]}>
                <Route path="overview" element={<MissionOverview />} />
                <Route path="overview/:missionId" element={<MissionDetail />} />
            </MissionOverviewWrapper>
        );
        missionOverview.detailsButton().click();
        missionDetail.groundOperationsTab().click();
        groundOpsTab.generalActionButton().last().click();

        const availablePad = anyAvailablePad();
        availablePadsListInterceptor([availablePad]);
        groundOpsTab.assignArrivalStandButton().click();
        padAssignment.padCard(availablePad.id).click({ force: true });
        padsAssignmentInterceptor();
        padAssignment.assignButton().click({ force: true });
        groundOpsTab.assignArrivalStandButton().should("not.be.exist");
    });

    it("User can accept mission", () => {
        const mission = anyMission({
            service: "PASSENGER",
            source: "COMMERCIAL_SCHEDULE",
        });
        missionsListWithEntriesInterceptor([mission]);
        getMissionInterceptor(mission);
        cy.mount(
            <MissionOverviewWrapper initialEntries={["/overview"]}>
                <Route path="overview" element={<MissionOverview />} />
            </MissionOverviewWrapper>
        );
        missionOverview.actionsButton().click();
        missionActions.acceptButton().click();
        acceptMissionInterceptor(mission);
        acceptMission.confirmButton().click();
        missionActions.acceptButton().should("not.be.exist");
    });

    it("will not display airline acceptance badge in mission if service is not PASSENGER", () => {
        const mission = anyMission({ service: "FERRY_FLIGHT" });
        missionsListWithEntriesInterceptor([mission]);

        cy.mount(
            <MissionOverviewWrapper initialEntries={["/overview"]}>
                <Route path="overview/*" element={<MissionOverview />} />
            </MissionOverviewWrapper>
        );

        missionOverview.missionCardButton(mission.flightNumber ?? "").click();
        cy.findByLabelText("Airline Acceptance").should("not.be.exist");
    });

    it("should fetch mission listing through polling", () => {
        const mission = anyMission();

        missionsListWithEntriesInterceptor([mission]);

        cy.mount(
            <MissionOverviewWrapper initialEntries={["/overview"]}>
                <Route path="overview" element={<MissionOverview pollingInterval={2000} />} />
            </MissionOverviewWrapper>
        );

        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(2000);
        cy.get("@missionsListWithEntriesInterceptor.all").should("have.length", 2);
    });

    it("should display pre-select delay reasons", () => {
        const mission = anyMission({ delayCodes: ["01"] });
        missionsListWithEntriesInterceptor([mission]);
        getMissionInterceptor(mission);
        cy.mount(
            <MissionOverviewWrapper initialEntries={["/overview"]}>
                <Route path="overview" element={<MissionOverview />} />
            </MissionOverviewWrapper>
        );
        missionOverview.actionsButton().click();
        missionActions.updateScheduleButton().click();
        cy.wait("@getAllDelayCodes");

        cy.findByText("01 - Baggage processing, sorting, etc. (PASSENGER AND BAGGAGE)");
    });
});
