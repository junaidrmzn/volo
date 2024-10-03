import { Icon, IconButton } from "@volocopter/design-library-react";

type ToggleVfrListButtonProps = {
    handleClick: () => void;
    isActive: boolean;
    disabled: boolean;
};

export const ToggleVfrListButton = (props: ToggleVfrListButtonProps) => {
    const { handleClick, isActive, disabled } = props;

    return (
        <IconButton
            aria-label="toggle vfr-list"
            variant="secondary"
            size="lg"
            isActive={isActive}
            onClick={handleClick}
            data-testid="toggle-vfr-list-button"
            disabled={disabled}
        >
            <Icon icon="mapPin" />
        </IconButton>
    );
};
