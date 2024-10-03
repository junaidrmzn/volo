import { Icon, IconButton } from "@volocopter/design-library-react";
import type { InferType } from "@voloiq/form";
import { FormProvider, createFormControl, object, select } from "@voloiq/form";
import type { FileType } from "@voloiq/logbook-api/v6";
import { FileTypeEnum } from "@voloiq/logbook-api/v6";
import { getTypedKeys } from "@voloiq/utils/src";
import { useFileListItemTranslation } from "./translations/useFileListItemTranslation";

export type TypeSelectFormProps = {
    initialType: FileType;
    onUpdate: (newFileType: FileType) => void;
};

export const TypeSelectForm = (props: TypeSelectFormProps) => {
    const { initialType, onUpdate } = props;
    const { t } = useFileListItemTranslation();

    const schema = object({
        fileType: select<FileType>({
            placeholder: "Please choose",
            options: getTypedKeys(FileTypeEnum).map((fileType) => ({
                value: fileType,
                label: fileType,
            })),
            errorMessage: "",
        }).label("No visible"),
    });
    type Schema = typeof schema;

    const initialValues: InferType<Schema> = {
        fileType: { value: initialType },
    };

    const FormControl = createFormControl<Schema>();

    return (
        <FormProvider
            direction="row"
            schema={schema}
            formType="edit"
            initialValues={initialValues}
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
            onEdit={(data) => onUpdate(data.fileType?.value!)}
        >
            <FormControl fieldName="fileType" showLabel={false} />
            <IconButton
                // size="md" and size="lg" are too small or too big
                // raised already the concern that there is no common base line between the components
                height="10"
                width="10"
                aria-label={t("submitFileTypeButton")}
                icon={<Icon icon="check" />}
                type="submit"
            />
        </FormProvider>
    );
};
