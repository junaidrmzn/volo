export type CrewMemberCalenderBlockingTimeAllOf = { id: string };
export type CrewMemberBlockingTimeBaseEventType =
    | "MISSION"
    | "BRIEFING"
    | "DEBRIEFING"
    | "VACATION"
    | "SICK"
    | "OTHER"
    | "ABSENT_IN_HR_SYSTEM"
    | "PILOT_MISSION";

export type CrewMemberCalenderBlockingTimeBase = {
    title: string;
    "event-type": CrewMemberBlockingTimeBaseEventType;
    mission?: string;
    role?: string;
    startTime: string;
    endTime: string;
    startLocation?: string;
    endLocation?: string;
    acTypeId?: string;
    pilotBriefingStart?: string;
    pilotBriefingEnd?: string;
    pilotDebriefingStart?: string;
    pilotDebriefingEnd?: string;
    force?: boolean;
    isBlockedForMission: boolean;
};

export type CrewMemberCalenderBlockingTime = CrewMemberCalenderBlockingTimeBase & CrewMemberCalenderBlockingTimeAllOf;

export type CrewMembersBlockingTimes = {
    id: string;
    name?: string;
    surname?: string;
    roles?: string[];
    homeBase?: string;
    homebaseName?: string;
    email?: string;
    calendar?: CrewMemberCalenderBlockingTime[];
};
