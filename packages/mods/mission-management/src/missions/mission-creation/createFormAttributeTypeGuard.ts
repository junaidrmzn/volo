import type { AnyObjectSchema, FieldName } from "@voloiq/form";

export const createFormAttributeTypeGuard =
    <Schema extends AnyObjectSchema>(schema: Schema) =>
    (attribute: unknown): attribute is FieldName<Schema> =>
        Object.keys(schema.describe().fields).includes(attribute as FieldName<Schema>);
