import { match } from "ts-pattern";
import type { AnyObjectSchema } from "yup";
import type {
    SchemaDescription,
    SchemaFieldDescription,
    SchemaInnerTypeDescription,
    SchemaObjectDescription,
} from "yup/lib/schema";
import { FIELD_ARRAY_PREFIX } from "./fieldArrayPrefix";
import type { FieldName } from "./utils";

const isSchemaDescription = (
    schemaFieldDescription: SchemaFieldDescription
): schemaFieldDescription is SchemaDescription => schemaFieldDescription.type !== "ref";

const isSchemaInnerTypeDescription = (
    schemaFieldDescription: SchemaFieldDescription
): schemaFieldDescription is SchemaInnerTypeDescription =>
    (schemaFieldDescription as SchemaInnerTypeDescription).innerType !== undefined;

const isSchemaObjectDescription = (
    schemaFieldDescription: SchemaFieldDescription
): schemaFieldDescription is SchemaObjectDescription =>
    (schemaFieldDescription as SchemaObjectDescription).fields !== undefined;

export const getSchemaDescriptionOfField = <Schema extends AnyObjectSchema>(
    schema: Schema,
    fieldName: FieldName<Schema>
) => {
    const up = new Error(`Schema description for ${fieldName} is invalid`);
    const { fields } = schema.describe();
    const field = match(fields)
        .when(
            (fields) => fields[FIELD_ARRAY_PREFIX] === undefined,
            () => fields[fieldName]
        )
        .otherwise(() => {
            const actualFieldName = fieldName.split(".").pop();
            const { formFields } = fields;
            if (!formFields || !isSchemaInnerTypeDescription(formFields) || actualFieldName === undefined) {
                throw up;
            }
            const { innerType } = formFields;
            if (!innerType || !isSchemaObjectDescription(innerType)) {
                throw up;
            }
            return innerType.fields[actualFieldName];
        });
    if (!field || !isSchemaDescription(field)) {
        throw up;
    }
    return field;
};
