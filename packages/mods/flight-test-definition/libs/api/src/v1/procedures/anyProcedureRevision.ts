import { ProcedureRevision } from "./apiModels";

export const anyProcedureRevision = (overwrites?: Partial<ProcedureRevision>): Required<ProcedureRevision> => ({
    ftdId: "FTD-V21-05-236-A00",
    released: false,
    revision: "A00",
    available: true,
    ...overwrites,
});
