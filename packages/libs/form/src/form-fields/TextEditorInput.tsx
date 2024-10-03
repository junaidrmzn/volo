import { TextEditor, TextEditorProvider } from "@volocopter/text-editor-react";
import type { FieldPath } from "react-hook-form";
import { useController } from "react-hook-form";
import type { AnyObjectSchema } from "yup";
import { useForm } from "../form-context/useForm";
import { buildTranslationObject, useTextEditorTranslation } from "../translations/useTextEditorTranslation";
import { getTextEditorMeta } from "../yup/textEditor";
import type { FieldName, FormValues } from "../yup/utils";

type TextEditorInputProps<Schema extends AnyObjectSchema> = {
    fieldName: FieldName<Schema> & FieldPath<FormValues<Schema>>;
    onChange?: (data: unknown) => void;
};

export const TextEditorInput = <Schema extends AnyObjectSchema>(props: TextEditorInputProps<Schema>) => {
    const { fieldName, onChange } = props;
    const { control, schema } = useForm<Schema>();
    const {
        field: { onChange: controllerOnChange, onBlur, value },
    } = useController({ control, name: fieldName });
    const { placeholder, createImageSource } = getTextEditorMeta<Schema>(schema, fieldName);

    const { t } = useTextEditorTranslation();
    const translation = buildTranslationObject(t);

    return (
        <TextEditorProvider value={translation}>
            <TextEditor
                createImageSource={createImageSource}
                onChange={(event) => {
                    controllerOnChange(event);
                    onChange?.(event);
                }}
                content={value}
                onBlur={onBlur}
                placeholder={placeholder}
            />
        </TextEditorProvider>
    );
};
