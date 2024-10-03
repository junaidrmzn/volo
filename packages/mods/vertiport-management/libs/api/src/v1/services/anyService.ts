import { StringPair } from "../common/apiModels";

export const anyService = (overwrites?: Partial<StringPair>): Required<StringPair> => ({
    key: "PAX",
    value: "passenger-handling",
    ...overwrites,
});
