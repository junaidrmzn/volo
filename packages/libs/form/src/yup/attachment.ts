import type { FileUploadProps } from "@volocopter/design-library-react";
import type { Path } from "react-hook-form";
import type { AnyObjectSchema, Asserts, TypeOf } from "yup";
import { array } from "yup";
import { getSchemaDescriptionOfField } from "./schemaDescription";

const attachmentMeta = {
    isAttachment: true,
};

type BaseAttachmentMeta = Pick<
    FileUploadProps,
    | "allowMultiple"
    | "deleteAriaLabel"
    | "selectFilesLabel"
    | "dropFilesLabel"
    | "orLabel"
    | "allowedFileTypesLabel"
    | "maxFileSizeLabel"
> &
    (
        | {
              accept?: undefined;
              rejectedFilesErrorMessage?: undefined;
          }
        | {
              accept: string[];
              rejectedFilesErrorMessage: string;
          }
    );
type AttachmentMeta = typeof attachmentMeta & BaseAttachmentMeta;

export const isAttachmentMeta = (meta: object): meta is AttachmentMeta => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    const attachmentMeta = meta as AttachmentMeta;
    return (
        typeof meta === "object" &&
        attachmentMeta.isAttachment === true &&
        (attachmentMeta.accept === undefined || Array.isArray(attachmentMeta.accept)) &&
        (attachmentMeta.allowMultiple === undefined || typeof attachmentMeta.allowMultiple === "boolean") &&
        typeof attachmentMeta.deleteAriaLabel === "string" &&
        (attachmentMeta.rejectedFilesErrorMessage === undefined ||
            typeof attachmentMeta.rejectedFilesErrorMessage === "string") &&
        typeof attachmentMeta.selectFilesLabel === "string" &&
        typeof attachmentMeta.dropFilesLabel === "string" &&
        typeof attachmentMeta.orLabel === "string" &&
        (attachmentMeta.allowedFileTypesLabel === undefined ||
            typeof attachmentMeta.allowedFileTypesLabel === "string") &&
        (attachmentMeta.maxFileSizeLabel === undefined || typeof attachmentMeta.maxFileSizeLabel === "string")
    );
};

export const getAttachmentMeta = <Schema extends AnyObjectSchema>(
    schema: Schema,
    fieldName: keyof TypeOf<Schema> & string & Path<Asserts<Schema>>
) => {
    const { meta } = getSchemaDescriptionOfField(schema, fieldName);
    if (!isAttachmentMeta(meta)) {
        throw new Error(`Metas for ${fieldName} are not valid attachment metas.`);
    }
    return meta;
};

type AttachmentProps = BaseAttachmentMeta;

export const attachment = (props: AttachmentProps) => {
    const {
        accept,
        allowMultiple = false,
        deleteAriaLabel,
        rejectedFilesErrorMessage,
        selectFilesLabel,
        dropFilesLabel,
        orLabel,
        allowedFileTypesLabel,
        maxFileSizeLabel,
    } = props;

    return array<File>().meta({
        ...attachmentMeta,
        accept,
        allowMultiple,
        deleteAriaLabel,
        rejectedFilesErrorMessage,
        selectFilesLabel,
        dropFilesLabel,
        orLabel,
        allowedFileTypesLabel,
        maxFileSizeLabel,
    });
};
