import type { StringPair } from "@voloiq/vertiport-management-api/v1";

export const anyService = (overwrites?: Partial<StringPair>): Required<StringPair> => ({
    key: "PAX",
    value: "passenger-handling",
    ...overwrites,
});
