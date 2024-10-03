import { IconButton, Tooltip } from "@volocopter/design-library-react";
import type { ReactNode } from "react";

type IconButtonWithTooltipProps = {
    icon: ReactNode;
    tooltipText?: ReactNode;
    buttonLabel: string;
};

export const IconButtonWithTooltip = (props: IconButtonWithTooltipProps) => {
    const { icon, tooltipText, buttonLabel } = props;
    return (
        <Tooltip label={tooltipText} withArrow placement="top">
            <IconButton aria-label={buttonLabel} variant="ghost" size="sm">
                {icon}
            </IconButton>
        </Tooltip>
    );
};
