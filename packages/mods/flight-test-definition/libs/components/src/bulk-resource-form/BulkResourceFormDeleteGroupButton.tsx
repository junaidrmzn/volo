import type { IconButtonProps } from "@volocopter/design-library-react";
import { Icon, IconButton } from "@volocopter/design-library-react";
import { useRemoveFormControlGroup } from "@voloiq/form";
import { useBulkResourceFormTranslation } from "./translations/useBulkResourceFormTranslation";

export const BulkResourceFormDeleteGroupButton = (props: Omit<IconButtonProps, "aria-label" | "size" | "variant">) => {
    const { removeFormControlGroup } = useRemoveFormControlGroup();
    const { t } = useBulkResourceFormTranslation();
    return (
        <IconButton
            {...props}
            icon={<Icon icon="trash" size={4} />}
            aria-label={t("Delete")}
            variant="ghost"
            size="md"
            onClick={removeFormControlGroup}
        />
    );
};
