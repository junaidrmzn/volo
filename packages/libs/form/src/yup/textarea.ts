import type { TextareaProps as DSTextareaProps } from "@volocopter/design-library-react";
import type { Path } from "react-hook-form";
import type { AnyObjectSchema, Asserts, TypeOf } from "yup";
import { string } from "yup";
import { getSchemaDescriptionOfField } from "./schemaDescription";

const textareaMeta = {
    isTextarea: true,
};

type TextareaMeta = typeof textareaMeta & Pick<DSTextareaProps, "placeholder">;

export const isTextareaMeta = (meta: object): meta is TextareaMeta =>
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    typeof meta === "object" && (meta as TextareaMeta).isTextarea === true;

type TextareaProps = Pick<DSTextareaProps, "placeholder">;

export const getTextareaPlaceholder = <Schema extends AnyObjectSchema>(
    schema: Schema,
    fieldName: keyof TypeOf<Schema> & string & Path<Asserts<Schema>>
) => {
    const { meta } = getSchemaDescriptionOfField(schema, fieldName);
    if (!isTextareaMeta(meta)) {
        throw new Error(`Metas for ${fieldName} are not valid textarea metas.`);
    }

    return meta.placeholder;
};

export const textarea = (props?: TextareaProps) => {
    const { placeholder } = props || {};

    return string().meta({
        ...textareaMeta,
        placeholder,
    });
};
