import { v4 as uuidV4 } from "uuid";
import type { WindchillRequirement, WindchillRequirementPatch } from "./apiModels";

export const anyWindchillRequirement = (overwrites?: Partial<WindchillRequirement>): WindchillRequirement => ({
    windchillId: uuidV4(),
    documentId: uuidV4(),
    id: uuidV4(),
    text: "",
    ...overwrites,
});

export const anyWindchillRequirementPatch = (
    overwrites?: Partial<WindchillRequirementPatch>
): WindchillRequirementPatch => ({
    id: uuidV4(),
    passOrFailCriteria: "",
    ...overwrites,
});
