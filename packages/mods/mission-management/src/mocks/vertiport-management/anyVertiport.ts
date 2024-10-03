import type { VertiportInMissionCreation } from "../../missions/mission-creation/useVertiportOptions";

export const anyVertiport = (overwrites?: Partial<VertiportInMissionCreation>): VertiportInMissionCreation => ({
    id: Math.round(Math.random() * 100).toString(),
    code: "HAM",
    name: "",
    icaoCode: "",
    iataCode: "",
    ...overwrites,
});
