import type { ApplicableRequirement } from "./apiModels";

export const anyApplicableRequirement = (overwrites?: Partial<ApplicableRequirement>): ApplicableRequirement => ({
    id: "ce118b6e-d8e1-11e7-9296-cec278b6b50b",
    applicable: true,
    content: "Foo",
    procedureId: "b2118b6e-d8e1-11e8-9a46-cec278b6b509",
    source: "MANUAL",
    passOrFailCriteria: "Foo",
    title: "The Flight Control System shall provide control for Altitude",
    ...overwrites,
});
