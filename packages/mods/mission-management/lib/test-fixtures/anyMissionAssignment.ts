import type { MissionAssignment } from "@voloiq-typescript-api/network-scheduling-types";
import { AircraftTechnicalStatus, ReservationStatus } from "@voloiq-typescript-api/network-scheduling-types";

export const anyMissionAssignment = (overwrites?: Partial<MissionAssignment>): MissionAssignment => ({
    id: "d9381aa2-0955-47a2-ada8-5dcd49117d7d",
    aircraftId: "647101a1-3b79-452a-868b-2d15073285a6",
    pilotId: "3679f481-1517-4df6-a8e9-debe126fb5a0",
    createTime: "2023-04-06T09:42:29.991Z",
    updateTime: "2023-04-12T08:15:13.438Z",
    aircraftMSN: "1112",
    aircraftRegistration: "TEST",
    aircraftTypeName: "TEST",
    batteryId: "291627c0-27e8-4361-b5d4-4d7e79238a46",
    batteryName: "todo",
    aircraftReservationStatus: ReservationStatus.UNKNOWN,
    aircraftTechnicalStatus: AircraftTechnicalStatus.SERVICEABLE,
    pilotReservationStatus: ReservationStatus.ACCEPTED,
    pilotFirstName: "Simon",
    pilotMiddleName: "L",
    pilotSurName: "Bayer",
    routeOptionId: 472,
    crewMemberAssignments: [
        {
            crewMemberId: "2d351d5c6-4395-404a-8921-23678473299d",
            crewMemberRole: "FTE",
        },
    ],
    ...overwrites,
});
