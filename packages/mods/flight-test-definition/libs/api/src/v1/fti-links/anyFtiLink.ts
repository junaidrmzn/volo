import { v4 as uuidV4 } from "uuid";
import { anyFtiParameter } from "../fti-parameters/anyFtiParameter";
import type { FTILink, FTILinkInsertBulk, FTILinkPatchBulk } from "./apiModels";

export const anyFtiLink = (overwrites: Partial<FTILink> = {}): FTILink => ({
    id: uuidV4(),
    definitionId: uuidV4(),
    instrumentationId: uuidV4(),
    desirability: "DESIRABLE",
    instrumentationParameter: anyFtiParameter(),
    ...overwrites,
});

export const anyFTILinkPatchBulk = (overwrites: Partial<FTILinkPatchBulk> = {}): FTILinkPatchBulk => ({
    id: uuidV4(),
    desirability: "DESIRABLE",
    ...overwrites,
});

export const anyFTILinkInsertBulk = (overwrites: Partial<FTILinkInsertBulk> = {}): FTILinkInsertBulk => ({
    instrumentationId: uuidV4(),
    desirability: "DESIRABLE",
    ...overwrites,
});
