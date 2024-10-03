import type { TextEditorProps as TextEditorLibraryProps } from "@volocopter/text-editor-react";
import type { Path } from "react-hook-form";
import type { AnyObjectSchema, Asserts, TypeOf } from "yup";
import { string } from "yup";
import { getSchemaDescriptionOfField } from "./schemaDescription";

const textEditorMeta = {
    isTextEditor: true,
};

type TextEditorMeta = typeof textEditorMeta & Pick<TextEditorLibraryProps, "placeholder" | "createImageSource">;

export const isTextEditorMeta = (meta: Object): meta is TextEditorMeta =>
    typeof meta === "object" && (meta as TextEditorMeta).isTextEditor === true;

type TextEditorProps = Pick<TextEditorLibraryProps, "placeholder" | "createImageSource">;

export const getTextEditorMeta = <Schema extends AnyObjectSchema>(
    schema: Schema,
    fieldName: keyof TypeOf<Schema> & string & Path<Asserts<Schema>>
) => {
    const { meta } = getSchemaDescriptionOfField(schema, fieldName);
    if (!isTextEditorMeta(meta)) {
        throw new Error(`Metas for ${fieldName} are not valid textEditor metas.`);
    }

    return meta;
};

export const textEditor = (props?: TextEditorProps) => {
    const { placeholder, createImageSource } = props || {};

    return string().meta({ ...textEditorMeta, placeholder, createImageSource });
};
