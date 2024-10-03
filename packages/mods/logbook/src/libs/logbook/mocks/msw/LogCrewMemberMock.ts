import { CrewMemberRoleEnum } from "@voloiq/logbook-api/v6";
import type { LogCrewMember, LogCrewMemberInsert } from "@voloiq/logbook-api/v6";

export const anyLogCrewMember = (overwrites?: Partial<LogCrewMember>): LogCrewMember => ({
    crewMemberId: "ertewrtrg4543456tv",
    email: "bob.peterson@mail.com",
    firstName: "Bob",
    lastName: "Peterson",
    createTime: new Date().toISOString(),
    id: "dewrg34f23f4df4",
    updateTime: new Date().toISOString(),
    role: CrewMemberRoleEnum.PILOT,
    ...overwrites,
});

export const anyLogCrewMemberInsert = (overwrites?: Partial<LogCrewMemberInsert>): LogCrewMemberInsert => ({
    crewMemberId: "ertewrtrg4543456tv",
    email: "bob.peterson@mail.com",
    firstName: "Bob",
    lastName: "Peterson",
    role: CrewMemberRoleEnum.PILOT,
    ...overwrites,
});
