import { isArray, mergeWith } from "lodash";

const customizer = <A extends {}, B extends {}>(objectValue: A, sourceValue: B) => {
    if (isArray(objectValue)) {
        return [...objectValue, ...(isArray(sourceValue) ? sourceValue : [sourceValue])];
    }
    return undefined;
};

export const mergeWithArrays = <A extends {}, B extends {}>(a: A, b: B) => mergeWith(a, b, customizer);
