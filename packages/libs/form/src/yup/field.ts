import { match } from "ts-pattern";
import type { AnyObjectSchema } from "yup";
import { isAttachmentMeta } from "./attachment";
import { isCoordinateField } from "./coordinate";
import { isDateMeta } from "./date";
import { isDatetimeMeta } from "./datetime";
import { isMultiselectField } from "./multiselect";
import { isRadioGroupField } from "./radioButtonGroup";
import { getSchemaDescriptionOfField } from "./schemaDescription";
import { isSelectField } from "./select";
import { isTextEditorMeta } from "./textEditor";
import { isTextareaMeta } from "./textarea";
import { isUnitField } from "./unit";
import type { FieldName } from "./utils";

export const getFieldType = <Schema extends AnyObjectSchema>(schema: Schema, fieldName: FieldName<Schema>) => {
    const { type, meta } = getSchemaDescriptionOfField(schema, fieldName);

    return match({ schema, fieldName, meta })
        .when(
            () => isSelectField(schema, fieldName),
            () => "select" as const
        )
        .when(
            () => isTextareaMeta(meta),
            () => "textarea" as const
        )
        .when(
            () => isTextEditorMeta(meta),
            () => "textEditor" as const
        )
        .when(
            () => isAttachmentMeta(meta),
            () => "attachment" as const
        )
        .when(
            () => isMultiselectField(schema, fieldName),
            () => "multiselect" as const
        )
        .when(
            () => isCoordinateField(schema, fieldName),
            () => "coordinate" as const
        )
        .when(
            () => isRadioGroupField(schema, fieldName),
            () => "radioGroup" as const
        )
        .when(
            () => isUnitField(schema, fieldName),
            () => "unit" as const
        )
        .when(
            () => type === "string",
            () => "text" as const
        )
        .when(
            () => type === "number",
            () => "number" as const
        )
        .when(
            () => type === "boolean",
            () => "boolean" as const
        )
        .when(
            () => isDatetimeMeta(meta),
            () => "datetime" as const
        )
        .when(
            () => isDateMeta(meta),
            () => "date" as const
        )
        .otherwise(() => {
            throw new Error(`Field type for ${fieldName} is not specified`);
        });
};

export const isFieldRequired = <Schema extends AnyObjectSchema>(schema: Schema, fieldName: FieldName<Schema>) => {
    const { tests } = getSchemaDescriptionOfField(schema, fieldName);
    return tests.some((test) => test.name === "required");
};

export const getFieldLabel = <Schema extends AnyObjectSchema>(schema: Schema, fieldName: FieldName<Schema>) => {
    const { label } = getSchemaDescriptionOfField(schema, fieldName);
    if (!label) {
        throw new Error(`Please specify a label for ${fieldName}`);
    }
    return label;
};
