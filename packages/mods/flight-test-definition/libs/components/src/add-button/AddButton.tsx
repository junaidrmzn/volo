import type { IconButtonProps } from "@volocopter/design-library-react";
import { Icon, IconButton } from "@volocopter/design-library-react";
import { useAddButtonTranslation } from "./translations/useAddButtonTranslation";

export type AddButtonProps = { resourceName: string } & Omit<IconButtonProps, "aria-label">;

export const AddButton = (props: AddButtonProps) => {
    const { resourceName, ...rest } = props;
    const { t } = useAddButtonTranslation();

    return (
        <IconButton {...rest} aria-label={t("Add {resource}", { resource: resourceName })} variant="ghost" size="md">
            <Icon icon="add" size={4} />
        </IconButton>
    );
};
