import type { IconButtonProps } from "@volocopter/design-library-react";
import { Icon, IconButton } from "@volocopter/design-library-react";
import { useDetailsButtonTranslation } from "./translations/useDetailsButtonTranslation";

export type DetailsButtonProps = Omit<IconButtonProps, "aria-label">;

export const DetailsButton = (props: DetailsButtonProps) => {
    const { t } = useDetailsButtonTranslation();

    return (
        <IconButton {...props} aria-label={t("Details")} variant="ghost" size="md">
            <Icon icon="chevronRight" size={4} />
        </IconButton>
    );
};
