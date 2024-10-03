import type { FileUploadProps } from "@volocopter/design-library-react";
import { FileUpload } from "@volocopter/design-library-react";
import type { FieldPath, Path, PathValue, UnpackNestedValue } from "react-hook-form";
import { useController } from "react-hook-form";
import type { AnyObjectSchema } from "yup";
import { useForm } from "../form-context/useForm";
import { getAttachmentMeta } from "../yup/attachment";
import type { FieldName, FormValues } from "../yup/utils";

type FileInputProps<Schema extends AnyObjectSchema> = {
    controlId: string;
    fieldName: FieldName<Schema> & FieldPath<FormValues<Schema>>;
    isDisabled: boolean;
    isInvalid: boolean;
    onChange?: (data: unknown) => void;
};
export const FileInput = <Schema extends AnyObjectSchema>(props: FileInputProps<Schema>) => {
    const { controlId, fieldName, isDisabled, isInvalid, onChange } = props;
    const { control, schema } = useForm<Schema>();

    // @ts-ignore
    const defaultValue: UnpackNestedValue<PathValue<FormValues<Schema>, FieldName<Schema> & Path<FormValues<Schema>>>> =
        [];
    const {
        field: { name, ref, value, onChange: controllerOnChange },
    } = useController({ control, name: fieldName, defaultValue });
    const {
        accept,
        allowMultiple,
        deleteAriaLabel,
        rejectedFilesErrorMessage,
        selectFilesLabel,
        dropFilesLabel,
        orLabel,
        allowedFileTypesLabel,
        maxFileSizeLabel,
    } = getAttachmentMeta<Schema>(schema, fieldName);

    const handleAdd = (addedFiles: File[]) => {
        controllerOnChange([...value, ...addedFiles]);
        onChange?.([...value, ...addedFiles]);
    };

    const handleDelete = (index: number) => {
        const updatedFiles = [...value];
        updatedFiles.splice(index, 1);
        controllerOnChange(updatedFiles);
        onChange?.(updatedFiles);
    };

    let fileUploadProps: FileUploadProps = {
        allowMultiple,
        controlId,
        deleteAriaLabel,
        dropzoneRef: ref,
        files: value,
        inputName: name,
        isDisabled,
        isInvalid,
        selectFilesLabel,
        dropFilesLabel,
        orLabel,
        allowedFileTypesLabel,
        maxFileSizeLabel,
        onAdd: handleAdd,
        onDelete: handleDelete,
    };

    if (accept && rejectedFilesErrorMessage) {
        fileUploadProps = {
            ...fileUploadProps,
            accept,
            rejectedFilesErrorMessage,
        };
    }

    return <FileUpload {...fileUploadProps} />;
};
