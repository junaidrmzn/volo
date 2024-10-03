import { match } from "ts-pattern";

const isKeyValuePair = (input: unknown): input is Record<string, string> => typeof input === "object" && input !== null;
const isString = (input: unknown): input is string => typeof input === "string";

const getJsonObjectOrString = (input: string): unknown | string => {
    try {
        return JSON.parse(input);
    } catch {
        return input;
    }
};

export const transformRemarks = (remarks: string | undefined): string | undefined => {
    if (!remarks) {
        return undefined;
    }

    return match(remarks)
        .when(
            (remarks) => isKeyValuePair(getJsonObjectOrString(remarks)),
            (remarks) => {
                const r = getJsonObjectOrString(remarks);
                if (!isKeyValuePair(r)) {
                    return remarks;
                }
                return Object.entries(r)
                    .map(([key, value]) => `${key}: ${value}`)
                    .join(", ");
            }
        )
        .when(
            (remarks) => isString(remarks),
            (remarks) => remarks
        )
        .otherwise((remarks) => remarks);
};
