import { Revision } from "./apiModels";

export const anyRevision = (overwrites?: Partial<Revision>): Required<Revision> => ({
    ftdId: "FTD-V21-05-236-A00",
    released: false,
    revision: "A00",
    revisionDescription: "This is released Revision",
    released_date: new Date(),
    ...overwrites,
});
