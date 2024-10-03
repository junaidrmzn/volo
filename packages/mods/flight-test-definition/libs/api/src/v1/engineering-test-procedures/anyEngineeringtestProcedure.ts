import { v4 as uuidV4 } from "uuid";
import { EngineeringTestProcedure } from "./apiModels";

export const anyEngineeringTestProcedure = (
    overwrites?: Partial<EngineeringTestProcedure>
): Required<EngineeringTestProcedure> => ({
    id: uuidV4(),
    title: "This is a test Engineering Test Procedure Title",
    details: "This is a test Engineering Test Procedure Details",
    ...overwrites,
});
