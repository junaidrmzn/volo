import { LinkedDefinition } from "./apiModels";

export const anyLinkedDefinition = (overwrites: Partial<LinkedDefinition> = {}): LinkedDefinition => ({
    id: "845db7c6-fa54-429c-9cfb-ada8358ee1e7",
    ftdId: "FTD-VC2-01-001",
    title: "FTD-VC2-01-001",
    ...overwrites,
});
