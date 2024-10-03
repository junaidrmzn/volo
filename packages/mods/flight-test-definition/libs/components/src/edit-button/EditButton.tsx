import type { IconButtonProps, IconProps } from "@volocopter/design-library-react";
import { Icon, IconButton } from "@volocopter/design-library-react";
import { useEditButtonTranslation } from "./translations/useEditButtonTranslation";

export type EditButtonProps = Omit<IconButtonProps, "aria-label" | "icon"> & {
    icon?: IconProps["icon"];
    resourceName: string;
};

export const EditButton = (props: EditButtonProps) => {
    const { resourceName, icon = "penWithBox", children, ...rest } = props;
    const { t } = useEditButtonTranslation();

    return (
        <IconButton {...rest} aria-label={t("Edit {resource}", { resource: resourceName })} variant="ghost" size="md">
            <Icon icon={icon} size={4} />
        </IconButton>
    );
};
