import { CrewMemberCalenderBlockingTimeBase } from "./apiModels";

export const anyCrewMemberCalenderBlockingTime = (
    overwrites?: Partial<CrewMemberCalenderBlockingTimeBase>
): Required<CrewMemberCalenderBlockingTimeBase> => ({
    title: "iloveoranges",
    "event-type": "MISSION",
    mission: "3679f481-1517-4df6-a8e9-debe126fb5a0",
    role: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    startTime: "2024-06-27T04:54:25.739Z",
    endTime: "2024-06-27T04:54:25.739Z",
    startLocation: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    endLocation: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    acTypeId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    pilotBriefingStart: "2024-06-27T04:54:25.739Z",
    pilotBriefingEnd: "2024-06-27T04:54:25.739Z",
    pilotDebriefingStart: "2024-06-27T04:54:25.739Z",
    pilotDebriefingEnd: "2024-06-27T04:54:25.739Z",
    force: false,
    isBlockedForMission: false,
    ...overwrites,
});
