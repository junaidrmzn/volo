import { Button, ButtonProps, Icon } from "@volocopter/design-library-react";
import { useGetFormFieldValues, useRemoveFormControlGroup } from "@voloiq/form";
import { useFtiParameterFormTranslation } from "../translations/useFtiTranslation";

export const DeleteButton = (props: Omit<ButtonProps, "aria-label" | "size" | "variant">) => {
    const { removeFormControlGroup } = useRemoveFormControlGroup();
    const { getFormFieldValues } = useGetFormFieldValues();

    const { t } = useFtiParameterFormTranslation();
    const formFieldValues = getFormFieldValues();
    const isDisabled = formFieldValues && formFieldValues?.length < 2;

    return (
        <Button
            {...props}
            leftIcon={<Icon icon="trash" size={4} />}
            variant="secondary"
            size="sm"
            aria-label={t("delete")}
            onClick={removeFormControlGroup}
            isDisabled={isDisabled}
        >
            {t("delete")}
        </Button>
    );
};
