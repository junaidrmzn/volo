export type CrewMember = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    createTime: string;
    updateTime: string;
};

export type CrewMemberInsert = {
    email: string;
    firstName: string;
    lastName: string;
};

export const CrewMemberRoleEnum = {
    PILOT: "PILOT",
    SUPERVISOR: "SUPERVISOR",
} as const;

export type CrewMemberRole = typeof CrewMemberRoleEnum[keyof typeof CrewMemberRoleEnum];

export type LogCrewMember = {
    id: string;
    email?: string;
    crewMemberId: string;
    firstName?: string;
    lastName?: string;
    role: CrewMemberRole;
    createTime: string;
    updateTime: string;
};

export type LogCrewMemberInsert = {
    crewMemberId: string;
    role: CrewMemberRole;
    email?: string;
    firstName?: string;
    lastName?: string;
};
