import type { Requirement, RequirementInsert, RequirementPatchBulk } from "./apiModels";

export const anyRequirement = (overwrites?: Partial<Requirement>): Requirement => ({
    id: "b2118b6e-d8e1-11e8-9a46-cec278b6b509",
    title: "#1181- #42371",
    description: "The Flight Control System shall provide control for Altitude",
    passOrFailCriteria:
        "This is some Pass and Fail Criteria that are super important to follow or else it has dramatic consequences.",
    ...overwrites,
});

export const anyRequirementInsert = (overwrites?: Partial<RequirementInsert>): RequirementInsert => ({
    title: "#1181- #42371",
    description: "The Flight Control System shall provide control for Altitude",
    passOrFailCriteria:
        "This is some Pass and Fail Criteria that are super important to follow or else it has dramatic consequences.",
    ...overwrites,
});

export const anyRequirementPatchBulk = (overwrites?: Partial<RequirementPatchBulk>): RequirementPatchBulk => ({
    id: "b2118b6e-d8e1-11e8-9a46-cec278b6b509",
    title: "#1181- #42371",
    ...overwrites,
});
