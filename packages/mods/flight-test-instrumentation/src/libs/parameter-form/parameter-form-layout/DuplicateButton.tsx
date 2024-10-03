import { Button, Icon, IconButtonProps } from "@volocopter/design-library-react";
import { useAddFormControlGroup, useGetFormFieldValues } from "@voloiq/form";
import { useFtiParameterFormTranslation } from "../translations/useFtiTranslation";

export type DuplicateButtonProps = {
    index: number;
    canDuplicate?: boolean;
} & Omit<IconButtonProps, "aria-label" | "size" | "variant">;

export const DuplicateButton = (props: DuplicateButtonProps) => {
    const { index, canDuplicate = true, ...buttonProps } = props;
    const { t } = useFtiParameterFormTranslation();
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
        <Button
            {...buttonProps}
            leftIcon={<Icon icon="copy" size={4} />}
            variant="secondary"
            size="sm"
            aria-label={t("duplicate")}
            onClick={duplicateFormControlGroup}
            isDisabled={!canDuplicate}
        >
            {t("duplicate")}
        </Button>
    );
};
