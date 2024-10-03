import type { StringPair } from "@voloiq/vertiport-management-api/v1";

export const anyStringPair = (overwrites?: Partial<StringPair>): StringPair => ({
    key: "dsd",
    value: "dsadf",
    ...overwrites,
});
