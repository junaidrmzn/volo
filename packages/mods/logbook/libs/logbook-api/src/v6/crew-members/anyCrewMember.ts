import { CrewMember, CrewMemberInsert } from "./apiModels";

export const anyCrewMember = (overwrites?: Partial<CrewMember>): CrewMember => ({
    createTime: new Date().toISOString(),
    id: "fewg34wferv4e",
    updateTime: new Date().toISOString(),
    email: "bob.peterson@mail.com",
    firstName: "Bob",
    lastName: "Peterson",
    ...overwrites,
});

export const anyCrewMemberInsert = (overwrites?: Partial<CrewMemberInsert>): CrewMemberInsert => ({
    email: "bob.peterson@mail.com",
    firstName: "Bob",
    lastName: "Peterson",
    ...overwrites,
});
