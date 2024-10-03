import type { CrewMembersBlockingTimes } from "@voloiq-typescript-api/crew-api-types";

export const anyCrewMembersBlockingTimes = (
    overwrites?: Partial<CrewMembersBlockingTimes>
): CrewMembersBlockingTimes => ({
    id: "2679f481-1517-4df6-a8e9-debe126fb5a0",
    name: "Simon",
    surname: "Bayer",
    roles: [""],
    homeBase: "2679f481-1517-4df6-a8e9-debe126fb5a0",
    homebaseName: "Germany",
    email: "Simon.Bayer@mail.com",
    calendar: [],
    ...overwrites,
});
