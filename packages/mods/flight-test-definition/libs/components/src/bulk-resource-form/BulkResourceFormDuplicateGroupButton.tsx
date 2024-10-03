import type { IconButtonProps } from "@volocopter/design-library-react";
import { Icon, IconButton } from "@volocopter/design-library-react";
import { useAddFormControlGroup, useGetFormFieldValues } from "@voloiq/form";
import { useBulkResourceFormTranslation } from "./translations/useBulkResourceFormTranslation";

export type BulkResourceFormDuplicateGroupButtonProps = {
    index: number;
} & Omit<IconButtonProps, "aria-label" | "size" | "variant">;

export const BulkResourceFormDuplicateGroupButton = (props: BulkResourceFormDuplicateGroupButtonProps) => {
    const { index, ...buttonProps } = props;
    const { t } = useBulkResourceFormTranslation();
    const { getFormFieldValues } = useGetFormFieldValues();
    const { addFormControlGroup } = useAddFormControlGroup();

    const duplicateFormControlGroup = () => {
        const formFieldValues = getFormFieldValues();
        const valuesToCopy = formFieldValues?.[index];

        if (valuesToCopy) {
            const { id: _, ...valuesToCopyWithoutId } = valuesToCopy;
            addFormControlGroup({ index, value: valuesToCopyWithoutId });
        }
    };

    return (
        <IconButton
            {...buttonProps}
            icon={<Icon icon="copy" size={4} />}
            aria-label={t("Duplicate")}
            variant="ghost"
            size="md"
            onClick={duplicateFormControlGroup}
        />
    );
};
