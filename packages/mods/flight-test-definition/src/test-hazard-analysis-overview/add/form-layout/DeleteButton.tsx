import { Button, ButtonProps, Icon } from "@volocopter/design-library-react";
import { useRemoveFormControlGroup } from "@voloiq/form";
import { useBulkCreateTestHazardAssessmentTranslations } from "../translations/useBulkCreateTestHazardAssessmentTranslations";

export const DeleteButton = (props: Omit<ButtonProps, "aria-label" | "size" | "variant">) => {
    const { removeFormControlGroup } = useRemoveFormControlGroup();
    const { t } = useBulkCreateTestHazardAssessmentTranslations();

    return (
        <Button
            {...props}
            leftIcon={<Icon icon="trash" size={4} />}
            variant="secondary"
            size="sm"
            aria-label={t("form.delete")}
            onClick={removeFormControlGroup}
        >
            {t("form.delete")}
        </Button>
    );
};
