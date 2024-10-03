import type { AnyObjectSchema } from "yup";

export const createEmptyInitialValues = <Schema extends AnyObjectSchema>(schema: Schema) => {
    const emptyInitialValues: Record<string, undefined> = {};
    for (const key of Object.keys(schema.fields)) {
        emptyInitialValues[key] = undefined;
    }

    return emptyInitialValues;
};
