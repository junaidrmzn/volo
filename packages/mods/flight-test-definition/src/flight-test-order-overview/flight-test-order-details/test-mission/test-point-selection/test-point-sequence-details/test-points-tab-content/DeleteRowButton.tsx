import type { IconButtonProps } from "@volocopter/design-library-react";
import { Icon, IconButton } from "@volocopter/design-library-react";
import { useRemoveFormControlGroup } from "@voloiq/form";
import { useTestPointsTabContentTranslation } from "./translations/useTestPointsTabContentTranslation";

export const DeleteRowButton = (props: Omit<IconButtonProps, "aria-label" | "size" | "variant">) => {
    const { removeFormControlGroup } = useRemoveFormControlGroup();
    const { t } = useTestPointsTabContentTranslation();

    return (
        <IconButton
            {...props}
            icon={<Icon icon="trash" size={4} />}
            aria-label={t("Delete")}
            variant="ghost"
            size="lg"
            onClick={removeFormControlGroup}
        />
    );
};
