import { CancellationCode } from "./apiModels";

export const anyCancellationCode = (overwrites?: Partial<CancellationCode>): Required<CancellationCode> => ({
    key: "CREW",
    description: "Crew is not available",
    ...overwrites,
});
